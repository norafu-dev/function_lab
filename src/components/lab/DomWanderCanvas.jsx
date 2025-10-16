"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useViewport from "@/hooks/useViewport";
import { getImageInfo } from "@/lib/utils";

const colsFromSize = (size) => (size === "sm" ? 4 : size === "lg" ? 12 : 6);

const WanderItem = ({
  coverRef,
  size,
  ratio,
  screenW,
  screenH,
  dragEnabled,
  bringToFront,
  initialY,
  canvasHeight,
  isMobile,
}) => {
  const elRef = useRef(null);
  const state = useRef({
    x: 0,
    y: 0,
    angle: Math.random() * Math.PI * 2, // 当前朝向（弧度）
    speed: 40, // px/s，会在初始化时随机化
    targetX: 0,
    targetY: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });
  const initializedRef = useRef(false);
  const prevInitialYRef = useRef(initialY);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const widthPx = (screenW / 12) * colsFromSize(size);
    const heightPx = widthPx / ratio;

    // 初始随机位置（允许超出视窗一定边距）
    const marginX = screenW * 0.25;
    const effectiveCanvasHeight = canvasHeight ?? screenH;
    const minY = 0;
    const maxY = Math.max(0, effectiveCanvasHeight - heightPx);
    const s = state.current;
    s.minY = minY;
    s.maxY = maxY;
    s.heightPx = heightPx;

    const initialYChanged = prevInitialYRef.current !== initialY;
    if (!initializedRef.current || initialYChanged) {
      s.x = Math.random() * (screenW + marginX * 2) - marginX;
      if (typeof initialY === "number") {
        const clampedY = Math.min(Math.max(initialY, minY), maxY);
        s.y = clampedY;
      } else {
        s.y = maxY > minY ? minY + Math.random() * (maxY - minY) : minY;
      }
      prevInitialYRef.current = initialY;
    } else {
      s.x = Math.max(Math.min(s.x, screenW + marginX), -marginX);
      s.y = Math.min(Math.max(s.y, minY), maxY);
    }

    // 速度范围与最大转向速率（越小弧线越柔）
    const slowFactor = isMobile ? 0.5 : 1;
    const speedMin = 14 * slowFactor; // px/s
    const speedMax = 24 * slowFactor; // px/s
    const maxTurnRate = 1.8; // rad/s
    const arriveDist = 80; // 接近该距离后切换新目标

    function pickTarget() {
      // 目标点可在视窗外一定边距，路径更自然
      const tx = Math.random() * (screenW + marginX * 2) - marginX;
      const ty = maxY > minY ? minY + Math.random() * (maxY - minY) : minY;
      s.targetX = tx;
      s.targetY = ty;
    }

    // 初始化速度与目标
    if (!initializedRef.current || initialYChanged) {
      s.speed = speedMin + Math.random() * (speedMax - speedMin);
      pickTarget();
      initializedRef.current = true;
    } else {
      if (s.speed < speedMin) s.speed = speedMin;
      if (s.speed > speedMax) s.speed = speedMax;
      if (s.targetY < minY || s.targetY > maxY) {
        s.targetY = Math.min(Math.max(s.targetY, minY), maxY);
      }
    }

    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const s = state.current;
      if (!s.dragging) {
        // 目标导向 + 最大转向速率（流畅弧线）
        const dx = s.targetX - s.x;
        const dy = s.targetY - s.y;
        const targetAngle = Math.atan2(dy, dx);
        let angleDiff = targetAngle - s.angle;
        // 归一化到 [-PI, PI]
        angleDiff = ((angleDiff + Math.PI) % (Math.PI * 2)) - Math.PI;
        const maxDelta = maxTurnRate * dt;
        if (angleDiff > maxDelta) angleDiff = maxDelta;
        if (angleDiff < -maxDelta) angleDiff = -maxDelta;
        s.angle += angleDiff;

        // 均速前进（也可在范围内缓慢波动速度）
        s.x += Math.cos(s.angle) * s.speed * dt;
        s.y += Math.sin(s.angle) * s.speed * dt;
        if (s.y < minY) s.y = minY;
        if (s.y > maxY) s.y = maxY;

        // 接近目标则切换新目标
        const dist2 = dx * dx + dy * dy;
        if (dist2 < arriveDist * arriveDist) {
          s.speed = speedMin + Math.random() * (speedMax - speedMin);
          pickTarget();
        }
      }

      el.style.width = `${widthPx}px`;
      el.style.height = `${heightPx}px`;
      el.style.transform = `translate(${s.x}px, ${s.y}px)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [size, ratio, screenW, screenH, initialY, canvasHeight]);

  // 事件：逐张拖拽（桌面端）
  const onPointerDown = (e) => {
    if (!dragEnabled) return;
    const el = elRef.current;
    if (!el) return;
    e.preventDefault();
    state.current.dragging = true;
    state.current.startX = e.clientX;
    state.current.startY = e.clientY;
    state.current.baseX = state.current.x;
    state.current.baseY = state.current.y;
    el.setPointerCapture?.(e.pointerId);
    el.style.cursor = "grabbing";
    if (bringToFront) bringToFront(el);
  };

  const onPointerMove = (e) => {
    if (!dragEnabled) return;
    const el = elRef.current;
    if (!el || !state.current.dragging) return;
    const dx = e.clientX - state.current.startX;
    const dy = e.clientY - state.current.startY;
    state.current.x = state.current.baseX + dx;
    const minY = state.current.minY ?? 0;
    const maxY =
      state.current.maxY ??
      Math.max(0, (canvasHeight ?? screenH) - (state.current.heightPx ?? 0));
    const nextY = state.current.baseY + dy;
    state.current.y = Math.min(Math.max(nextY, minY), maxY);
    el.style.transform = `translate(${state.current.x}px, ${state.current.y}px)`;
  };

  const endDrag = (e) => {
    if (!dragEnabled) return;
    const el = elRef.current;
    if (!el || !state.current.dragging) return;
    state.current.dragging = false;
    el.releasePointerCapture?.(e.pointerId);
    el.style.cursor = "grab";
  };

  return (
    <img
      ref={(n) => {
        elRef.current = n;
        if (coverRef) coverRef.current = n;
      }}
      alt=""
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        willChange: "transform,width,height",
        userSelect: "none",
        pointerEvents: dragEnabled ? "auto" : "none",
        cursor: dragEnabled ? "grab" : "default",
      }}
    />
  );
};

const DomWanderCanvas = ({ lab }) => {
  const { width: screenW, height: screenH, isMobile } = useViewport();
  const MOBILE_BASE_HEIGHT = 812; // 近似常见手机视窗高度（iPhone 11）
  const zCounterRef = useRef(1);

  // 防抖处理：延迟更新尺寸，避免快速调整时频繁重算
  const [debouncedScreenW, setDebouncedScreenW] = useState(screenW);
  const [debouncedScreenH, setDebouncedScreenH] = useState(screenH);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedScreenW(screenW);
      setDebouncedScreenH(screenH);
    }, 300);

    return () => clearTimeout(timer);
  }, [screenW, screenH]);

  const [itemsWithLayout, canvasHeight] = useMemo(() => {
    const safeScreenH = debouncedScreenH || MOBILE_BASE_HEIGHT;

    if (!lab?.length) {
      return [[], isMobile ? MOBILE_BASE_HEIGHT * 2.5 : safeScreenH];
    }

    const safeScreenW = debouncedScreenW || 1;

    const baseItems = lab.map((it, index) => {
      const { imgUrl, ratio } = getImageInfo(it.cover);
      const cols = colsFromSize(it.size);
      const widthPx = (safeScreenW / 12) * cols;
      const heightPx = ratio ? widthPx / ratio : widthPx;
      return {
        title: it.title,
        size: it.size,
        imgUrl,
        ratio: ratio || 1,
        widthPx,
        heightPx,
        index,
      };
    });

    const count = baseItems.length;
    const avgHeight =
      count > 0
        ? baseItems.reduce((sum, item) => sum + item.heightPx, 0) / count
        : safeScreenH * 0.2;
    const baselineSpacing = avgHeight * 0.9;
    const padding = avgHeight * 0.5;
    const rawHeight = baselineSpacing * count + padding * 2;
    const shrinkFactor = 0.79;
    const desktopHeight = Math.max(safeScreenH, rawHeight * shrinkFactor);
    const mobileHeight = MOBILE_BASE_HEIGHT * 2.5;
    const computedHeight = isMobile ? mobileHeight : desktopHeight;

    const step = computedHeight / (count + 1);

    const items = baseItems.map((item) => {
      const centerY = step * (item.index + 1);
      const jitter = item.heightPx * 0.15;
      const normalized =
        count > 1 ? ((item.index * 137) % 1000) / 1000 - 0.5 : 0;
      const offset = normalized * jitter;
      return {
        ...item,
        initialY: centerY - item.heightPx / 2 + offset,
      };
    });

    return [items, computedHeight];
  }, [lab, debouncedScreenW, debouncedScreenH, isMobile]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${canvasHeight}px`,
        overflow: "hidden",
      }}
    >
      {itemsWithLayout.map((it, index) => {
        const imgRef = useRef(null);
        useEffect(() => {
          if (imgRef.current) imgRef.current.src = it.imgUrl;
        }, [it.imgUrl]);
        return (
          <WanderItem
            key={index}
            coverRef={imgRef}
            size={it.size}
            ratio={it.ratio}
            screenW={debouncedScreenW}
            screenH={debouncedScreenH}
            initialY={it.initialY}
            canvasHeight={canvasHeight}
            dragEnabled={!isMobile}
            bringToFront={(el) => {
              el.style.zIndex = String(zCounterRef.current++);
            }}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
};

export default DomWanderCanvas;

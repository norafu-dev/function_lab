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

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const widthPx = (screenW / 12) * colsFromSize(size);
    const heightPx = widthPx / ratio;

    // 初始随机位置（允许超出视窗一定边距）
    const marginX = screenW * 0.25;
    const effectiveCanvasHeight = canvasHeight ?? screenH;
    const marginY = effectiveCanvasHeight * 0.25;
    state.current.x = Math.random() * (screenW + marginX * 2) - marginX;
    if (typeof initialY === "number") {
      const minY = -marginY;
      const maxY = effectiveCanvasHeight + marginY - heightPx;
      const clampedY = Math.min(
        Math.max(initialY, minY),
        Number.isFinite(maxY) ? maxY : initialY
      );
      state.current.y = clampedY;
    } else {
      state.current.y =
        Math.random() * (effectiveCanvasHeight + marginY * 2) - marginY;
    }

    // 速度范围与最大转向速率（越小弧线越柔）
    const speedMin = 14; // px/s
    const speedMax = 24; // px/s
    const maxTurnRate = 1.8; // rad/s
    const arriveDist = 80; // 接近该距离后切换新目标

    function pickTarget() {
      // 目标点可在视窗外一定边距，路径更自然
      const tx = Math.random() * (screenW + marginX * 2) - marginX;
      const ty =
        Math.random() * (effectiveCanvasHeight + marginY * 2) - marginY;
      state.current.targetX = tx;
      state.current.targetY = ty;
    }

    // 初始化速度与目标
    state.current.speed = speedMin + Math.random() * (speedMax - speedMin);
    pickTarget();

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
    state.current.y = state.current.baseY + dy;
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
  const zCounterRef = useRef(1);

  const [itemsWithLayout, canvasHeight] = useMemo(() => {
    if (!lab?.length) {
      return [[], screenH];
    }

    const safeScreenW = screenW || 1;

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
        : screenH * 0.2;
    const baselineSpacing = avgHeight * 0.9;
    const padding = avgHeight * 0.5;
    const rawHeight = baselineSpacing * count + padding * 2;
    const shrinkFactor = 0.79;
    const computedHeight = Math.max(screenH, rawHeight * shrinkFactor);

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
  }, [lab, screenW, screenH]);

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
            screenW={screenW}
            screenH={screenH}
            initialY={it.initialY}
            canvasHeight={canvasHeight}
            dragEnabled={!isMobile}
            bringToFront={(el) => {
              el.style.zIndex = String(zCounterRef.current++);
            }}
          />
        );
      })}
    </div>
  );
};

export default DomWanderCanvas;

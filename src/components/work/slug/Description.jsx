"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const Description = ({ title, description, tags, year }) => {
  const [isShow, setIsShow] = useState(false);
  const contentRef = useRef(null);
  const textRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsShow(false);
  }, [pathname]);

  const handleToggle = () => {
    if (!contentRef.current || !textRef.current) return;

    if (!isShow) {
      setIsShow(true);

      // 使用 requestAnimationFrame 确保 DOM 已渲染
      requestAnimationFrame(() => {
        if (!contentRef.current || !textRef.current) return;

        // 获取文本的实际高度
        const textHeight = textRef.current.scrollHeight;

        // 展开动画
        gsap.fromTo(
          contentRef.current,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: textHeight,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              // 动画完成后设置为 auto，以便内容可以适应窗口调整
              if (contentRef.current) {
                gsap.set(contentRef.current, { height: "auto" });
              }
            },
          }
        );
      });
    }
  };

  return (
    <section className="work-description w-full padding-x mt-[15px] mb-[60px] md:mt-[30px] md:mb-[200px]">
      <h1 className="text-md mb-[30px] md:mb-[90px]">{title}</h1>

      <div className="grid-layout text-base">
        <div className="col-span-3 flex flex-col justify-between h-[72px] lg:h-[112px]">
          {tags.length > 0 && (
            <div className="">
              {tags.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
            </div>
          )}
          {year && <div className="">{year}</div>}
        </div>

        <div className="hidden md:block col-span-9 text-base whitespace-pre-line">
          <ClampWithReadMore text={description} lines={4} />
        </div>

        <div className="md:hidden col-span-6 mt-[18px]">
          {!isShow && (
            <button onClick={handleToggle}>
              <div className="text-secondary cursor-pointer">
                +Read about the project
              </div>
            </button>
          )}
          <div
            ref={contentRef}
            style={{
              height: 0,
              opacity: 0,
              overflow: "hidden",
            }}
          >
            <p ref={textRef} className="text-sm whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

function ClampWithReadMore({ text, lines = 4, color }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const expandedContentRef = useRef(null);
  const fullTextRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [display, setDisplay] = useState(text);
  const [clamped, setClamped] = useState(false);
  const [remainingText, setRemainingText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // 在容器宽度或文本变化时，计算能容纳 4 行并在词边界裁剪的文本
  useEffect(() => {
    if (!containerRef.current || !measureRef.current) return;
    if (expanded) return; // 展开时无需裁剪

    const container = containerRef.current;
    const measurer = measureRef.current;

    const compute = () => {
      // 同步测量宽度与样式
      const rect = container.getBoundingClientRect();
      measurer.style.width = rect.width + "px";

      // 计算单行高
      const s = window.getComputedStyle(container);
      let lineHeight = parseFloat(s.lineHeight);
      if (Number.isNaN(lineHeight)) {
        // 回退：用单个字符测高
        measurer.textContent = "A";
        lineHeight = measurer.scrollHeight || 24;
      }
      const maxHeight = lineHeight * lines;

      // 二分查找最大可容纳文本长度（把后缀也考虑进去）
      const suffix = "... +Read more";
      let lo = 0;
      let hi = text.length;
      const fits = (len) => {
        const raw = text.slice(0, len);
        measurer.textContent = raw + suffix;
        return measurer.scrollHeight <= maxHeight + 0.5;
      };

      // 若整段文字也能放下，则不裁剪
      measurer.textContent = text;
      if (measurer.scrollHeight <= maxHeight + 0.5) {
        setDisplay(text);
        setRemainingText("");
        setClamped(false);
        setIsInitialized(true);
        return;
      }

      // 二分
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        if (fits(mid)) lo = mid;
        else hi = mid - 1;
      }

      // 在词边界回退，避免半个单词
      let cut = lo;
      const head = text.slice(0, cut);
      const lastSpace = Math.max(
        head.lastIndexOf(" "),
        head.lastIndexOf("\n"),
        head.lastIndexOf("\t")
      );
      if (lastSpace > 0) cut = lastSpace;

      const finalText = text.slice(0, cut).replace(/[ \t\n]+$/g, "");
      const remaining = text.slice(cut);
      setDisplay(finalText);
      setRemainingText(remaining);
      setClamped(true);
      setIsInitialized(true);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [text, lines, expanded]);

  const handleExpand = () => {
    setExpanded(true);

    // 使用 requestAnimationFrame 确保 DOM 已渲染
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!expandedContentRef.current || !fullTextRef.current) return;

        // 获取完整文本的实际高度
        const contentHeight = fullTextRef.current.scrollHeight;

        // 展开动画
        gsap.fromTo(
          expandedContentRef.current,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: contentHeight,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              // 动画完成后设置为 auto，以便内容可以适应窗口调整
              if (expandedContentRef.current) {
                gsap.set(expandedContentRef.current, { height: "auto" });
              }
            },
          }
        );
      });
    });
  };

  return (
    <div ref={containerRef} className={`relative ${color}`}>
      {!expanded ? (
        <div
          className="whitespace-pre-line"
          style={{ visibility: isInitialized ? "visible" : "hidden" }}
        >
          {display}
          {clamped && (
            <>
              ...{" "}
              <button
                type="button"
                onClick={handleExpand}
                className="text-[#373737] cursor-pointer inline"
                aria-expanded={expanded}
              >
                +Read more
              </button>
            </>
          )}
        </div>
      ) : (
        <div
          ref={expandedContentRef}
          className="whitespace-pre-line"
          style={{
            height: 0,
            opacity: 0,
            overflow: "hidden",
          }}
        >
          <div ref={fullTextRef}>{text}</div>
        </div>
      )}
      {/* 隐藏测量元素：与正文相同的换行/宽度规则，用于精确测量高度 */}
      <div
        ref={measureRef}
        className="invisible absolute top-0 left-0 pointer-events-none whitespace-pre-line"
        aria-hidden="true"
      />
    </div>
  );
}

export default Description;

"use client";
import React, { useEffect, useRef, useState } from "react";

const Description = ({ title, description, tags, year }) => {
  return (
    <section className="w-full padding-x mt-[15px] mb-[60px] md:mt-[30px] md:mb-[200px]">
      <h1 className="text-md mb-[30px] md:mb-[90px]">{title}</h1>

      <div className="grid-layout text-base">
        <div className="col-span-3 flex flex-col justify-between">
          {tags.length > 0 && (
            <div className="">
              {tags.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
            </div>
          )}
          {year && <div className="">{year}</div>}
        </div>

        <div className="col-span-9 text-base whitespace-pre-line">
          <ClampWithReadMore text={description} lines={4} />
        </div>
      </div>
    </section>
  );
};

function ClampWithReadMore({ text, lines = 4, color }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [display, setDisplay] = useState(text);
  const [clamped, setClamped] = useState(false);

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
        setClamped(false);
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
      setDisplay(finalText);
      setClamped(true);
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

  return (
    <div ref={containerRef} className={`relative ${color}`}>
      {!expanded ? (
        <p className={`whitespace-pre-line`}>
          <span>{display}</span>
          {clamped && (
            <>
              <span>... </span>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-[#373737] cursor-pointer"
                aria-expanded={expanded}
              >
                +Read more
              </button>
            </>
          )}
        </p>
      ) : (
        <p className="whitespace-pre-line">{text}</p>
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
export { ClampWithReadMore };

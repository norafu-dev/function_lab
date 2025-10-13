"use client";

import { useState, useEffect, useRef } from "react";
import NewsList from "./NewsList";
import { cn } from "@/lib/cn";

const NewsShowMore = ({ news }) => {
  const [expanded, setExpanded] = useState(false);
  const animateFromRef = useRef(12);

  useEffect(() => {
    // 在客户端检测屏幕尺寸，设置动画起始索引
    if (typeof window !== "undefined") {
      animateFromRef.current = window.innerWidth < 768 ? 8 : 12;
    }
  }, []);

  return (
    <>
      <div className="mb-[30px] md:mb-[75px] lg:mb-[100px]">
        {expanded ? (
          <NewsList
            news={news}
            total={Infinity}
            mobileCount={Infinity}
            animateFrom={animateFromRef.current}
          />
        ) : (
          <NewsList news={news} total={12} mobileCount={8} />
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "w-full text-left text-md redirect-link inline-flex items-center gap-2 transition-colors duration-300",
          expanded && "hidden"
        )}
      >
        <h2 className="redirect-text transition-colors duration-300">
          Keep reading
        </h2>
        <span className="redirect-arrow inline-flex transition-transform duration-300 translate-x-0">
          →
        </span>
      </button>
    </>
  );
};

export default NewsShowMore;

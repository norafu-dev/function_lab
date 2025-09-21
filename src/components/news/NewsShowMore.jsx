"use client";

import { useState } from "react";
import NewsList from "./NewsList";
import { cn } from "@/lib/cn";

const NewsShowMore = ({ news }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="mb-[30px] md:mb-[75px] lg:mb-[100px]">
        {expanded ? (
          <NewsList news={news} total={Infinity} mobileCount={Infinity} />
        ) : (
          <NewsList news={news} total={12} mobileCount={8} />
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={cn("w-full text-left text-md", expanded && "hidden")}
      >
        <h2>Keep reading →</h2>
      </button>
    </>
  );
};

export default NewsShowMore;

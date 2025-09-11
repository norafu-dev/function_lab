"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/cn";

const Categories = ({ categories }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  return (
    <ul className="flex items-center gap-2 px-[15px] mb-[30px] text-[12px] leading-[20px] font-chivo select-none">
      {categories.map((category, index) => {
        const { label, href } = category;
        const normalized = label.toLowerCase();
        const isActive =
          (categoryParam === null && normalized === "all") ||
          categoryParam === normalized;
        return (
          <li
            key={index}
            className={cn(
              "px-[15px] py-[5px] rounded-full border border-white transition-all duration-100",
              isActive && "bg-white text-black",
              !isActive && "hover:bg-white/15 "
            )}
          >
            <Link href={href}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;

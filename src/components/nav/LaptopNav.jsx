"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import LinearBlur from "./LinearBlur";

const ROUTES = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Lab",
    href: "/lab",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "News",
    href: "/news",
  },
];

export default function LaptopNav() {
  const pathname = usePathname();
  const isActive = (href) => pathname.includes(href);
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between h-[89px] px-[30px] text-[12px] leading-[20px] font-chivo z-100 select-none">
      {/* 背景颜色渐变（透明 -> 20% 黑） */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_100%)]" />

      {/* 渐变模糊（从顶部 20px 逐渐衰减到 0） */}
      <LinearBlur
        side="top"
        steps={8}
        strength={20}
        falloffPercentage={100}
        tint="transparent"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Link href="/" className="relative z-20">
        <Image src="/logo.svg" alt="Function Lab" width={109} height={14} />
      </Link>
      <ul className="relative z-20 flex items-center gap-2">
        {ROUTES.map((route) => (
          <li
            key={route.href}
            className={cn(
              "px-[15px] py-[5px] rounded-full hover:bg-white/15 hover:backdrop-blur-[50px] transition-all duration-300",
              isActive(route.href) && "bg-white/15 backdrop-blur-[50px]"
            )}
          >
            <Link href={route.href}>{route.label}</Link>
          </li>
        ))}
        <li className="px-[15px] py-[5px] rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300">
          <Link href="mailto:hi@functionlab.design">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

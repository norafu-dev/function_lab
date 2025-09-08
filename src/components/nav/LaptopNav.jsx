"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

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
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between h-[89px] px-[30px] font-chivo z-100">
      <Link href="/">
        <Image src="/logo.svg" alt="Function Lab" width={109} height={14} />
      </Link>
      <ul className="flex items-center gap-2">
        {ROUTES.map((route) => (
          <li
            key={route.href}
            className={cn(
              "px-[15px] py-[5px] rounded-full hover:bg-white/15 transition-all duration-300",
              isActive(route.href) && "bg-white/15"
            )}
          >
            <Link href={route.href}>{route.label}</Link>
          </li>
        ))}
        <li className="px-[15px] py-[5px] rounded-full border border-white hover:bg-white/15 transition-all duration-300">
          <Link href="mailto:hi@functionlab.design">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

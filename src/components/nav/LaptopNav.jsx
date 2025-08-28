"use client";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <nav className="flex items-center justify-between h-[89px] px-[30px]">
      <Image src="/logo.svg" alt="Function Lab" width={109} height={14} />
      <ul className="flex items-center gap-2">
        {ROUTES.map((route) => (
          <li key={route.href} className="px-[15px] py-[5px]">
            <Link href={route.href}>{route.label}</Link>
          </li>
        ))}
        <div className="px-[15px] py-[5px] rounded-full border border-white">
          <Link href="mailto:hi@functionlab.design">Contact</Link>
        </div>
      </ul>
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import LinearBlur from "./LinearBlur";
import Menu from "./Menu";

export default function LaptopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuMounted, setMenuMounted] = useState(false);
  const pathname = usePathname();
  const closeTimeoutRef = useRef(null);

  const clearCloseTimeout = () => {
    if (!closeTimeoutRef.current) return;
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    if (!isOpen) {
      clearCloseTimeout();
      setMenuMounted(true);
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  };

  const handleCloseComplete = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setMenuMounted(false);
      closeTimeoutRef.current = null;
    }, 950);
  };

  useEffect(() => {
    if (!isOpen) return;
    setMenuMounted(true);
    clearCloseTimeout();
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-end justify-between h-[45px] px-[15px] text-[12px] leading-[20px] font-chivo z-100 select-none">
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

      <Link href="/" className="relative mb-[9px] z-20">
        <Image src="/sml-logo.svg" alt="Function Lab" width={39} height={15} />
      </Link>

      <div
        className={cn(
          "px-[15px] py-[5px] mt-[15px] text-[12px] leading-[20px] tracking-[0.01em] font-chivo border rounded-full border-white bg-black/1 backdrop-blur-[50px] z-20 cursor-pointer"
        )}
        onClick={toggleMenu}
      >
        {isOpen ? "Back" : "Menu"}
      </div>

      {isMenuMounted && (
        <Menu isOpen={isOpen} onCloseComplete={handleCloseComplete} />
      )}
    </nav>
  );
}

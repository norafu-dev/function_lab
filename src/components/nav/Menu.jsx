"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP);

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

export default function Menu({ isOpen, onCloseComplete }) {
  const containerRef = useRef(null);
  const hasOpenedRef = useRef(false);
  const [isClicked, setIsClicked] = useState(false);

  useGSAP(
    () => {
      const overlay = containerRef.current?.querySelector(".menu-overlay");
      if (!overlay) return;

      const collapsedTop = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
      const collapsedBottom = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
      const expanded = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      gsap.killTweensOf(overlay);

      if (isOpen) {
        hasOpenedRef.current = true;
        gsap.set(overlay, { clipPath: collapsedTop });
        gsap.to(overlay, {
          clipPath: expanded,
          duration: 0.6,
          ease: "circ.inOut",
        });
      } else {
        if (!hasOpenedRef.current) return;
        gsap.to(overlay, {
          clipPath: collapsedTop,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => {
            gsap.set(overlay, { clipPath: collapsedTop });
            onCloseComplete?.();
          },
        });
      }
    },
    { scope: containerRef, dependencies: [isOpen] }
  );

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10]">
      <div
        className="menu-overlay h-full w-full bg-black/12"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(50px)",
        }}
      >
        <div className="container absolute top-0 left-0 flex flex-col justify-center w-screen h-screen pl-[15px] tracking-[-0.01em] font-twk">
          <div className="flex flex-col text-[56px] leading-[60px]">
            {ROUTES.map((route) => {
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group relative flex items-center w-fit"
                  onClick={() => setIsClicked(true)}
                >
                  <span className="absolute opacity-0 translate-x-[15px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    →
                  </span>
                  <span
                    className={cn(
                      "transition-transform duration-300 group-hover:translate-x-[48px]",
                      isClicked && "translate-x-[0px]"
                    )}
                  >
                    {route.label}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="text-[24px] leading-[26px] mt-[60px]">
            <div>Contact→</div>
            <div className="underline underline-offset-4">
              <Link href="mailto:hi@functionlab.design">
                hi@functionlab.design
              </Link>
            </div>
            <div className="mt-[26px] underline underline-offset-4">
              <Link href="https://www.instagram.com/function_lab_design/">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

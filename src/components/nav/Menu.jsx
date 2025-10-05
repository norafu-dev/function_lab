"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [activeHref, setActiveHref] = useState(null);
  const arrowRefs = useRef({});
  const labelRefs = useRef({});
  const resetTweenRef = useRef(null);
  const activeHrefRef = useRef(activeHref);
  const navigationTimeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    activeHrefRef.current = activeHref;
  }, [activeHref]);

  const animateToActive = useCallback((href) => {
    const arrow = arrowRefs.current[href];
    const label = labelRefs.current[href];
    if (!arrow || !label) return;

    gsap.killTweensOf([arrow, label]);

    gsap.fromTo(
      arrow,
      { opacity: 0, x: 15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.in",
        overwrite: "auto",
      }
    );

    gsap.fromTo(
      label,
      { x: 0 },
      {
        x: 48,
        duration: 0.5,
        ease: "power2.in",
        overwrite: "auto",
      }
    );
  }, []);

  const animateToRest = useCallback((href) => {
    const arrow = arrowRefs.current[href];
    const label = labelRefs.current[href];
    if (!arrow || !label) return;

    gsap.killTweensOf([arrow, label]);

    gsap.to(arrow, {
      opacity: 0,
      x: 15,
      duration: 0.3,
      ease: "power2.inOut",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(arrow, { clearProps: "all" });
      },
    });

    gsap.to(label, {
      x: 0,
      duration: 0.3,
      ease: "power2.inOut",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(label, { clearProps: "all" });
      },
    });
  }, []);

  useEffect(() => {
    if (!activeHref) return;

    const href = activeHref;

    if (resetTweenRef.current) {
      resetTweenRef.current.kill();
      resetTweenRef.current = null;
    }

    animateToActive(href);

    resetTweenRef.current = gsap.delayedCall(0.9, () => {
      if (activeHrefRef.current !== href) return;
      animateToRest(href);
      setActiveHref(null);
      resetTweenRef.current = null;
    });
  }, [activeHref, animateToActive, animateToRest]);

  useEffect(() => {
    if (!isOpen) return;

    if (resetTweenRef.current) {
      resetTweenRef.current.kill();
      resetTweenRef.current = null;
    }

    Object.values(arrowRefs.current).forEach((arrow) => {
      gsap.killTweensOf(arrow);
      gsap.set(arrow, { clearProps: "all" });
    });

    Object.values(labelRefs.current).forEach((label) => {
      gsap.killTweensOf(label);
      gsap.set(label, { clearProps: "all" });
    });

    setActiveHref(null);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (resetTweenRef.current) {
        resetTweenRef.current.kill();
        resetTweenRef.current = null;
      }

      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };
  }, []);

  const getArrowRef = useCallback(
    (href) => (el) => {
      if (el) {
        arrowRefs.current[href] = el;
      } else {
        delete arrowRefs.current[href];
      }
    },
    []
  );

  const getLabelRef = useCallback(
    (href) => (el) => {
      if (el) {
        labelRefs.current[href] = el;
      } else {
        delete labelRefs.current[href];
      }
    },
    []
  );

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
              const isActive = activeHref === route.href;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group relative flex items-center w-fit"
                  onClick={(event) => {
                    if (
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey ||
                      event.button !== 0
                    ) {
                      return;
                    }

                    event.preventDefault();

                    if (navigationTimeoutRef.current) {
                      clearTimeout(navigationTimeoutRef.current);
                      navigationTimeoutRef.current = null;
                    }

                    setActiveHref(route.href);

                    navigationTimeoutRef.current = setTimeout(() => {
                      router.push(route.href);
                      navigationTimeoutRef.current = null;
                    }, 550);
                  }}
                >
                  <span
                    ref={getArrowRef(route.href)}
                    className={cn(
                      "absolute opacity-0 translate-x-[15px] transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-x-0",
                      isActive && "opacity-100 translate-x-0"
                    )}
                  >
                    →
                  </span>
                  <span
                    ref={getLabelRef(route.href)}
                    className={cn(
                      "transition-transform duration-300 md:group-hover:translate-x-[48px]",
                      isActive && "translate-x-[48px]"
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

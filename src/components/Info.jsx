"use client";

import { cn } from "@/lib/cn";
import { renderStarEmphasis } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

const Info = ({ info, className }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const split = new SplitText(containerRef.current, {
        type: "words",
        wordsClass: "word-item",
      });
      gsap.set(split.words, { opacity: 0, y: "15%" });

      const tl = gsap.timeline();
      tl.to(split.words, {
        opacity: 1,
        y: "0%",
        stagger: 0.05,
        ease: "power2.out",
        duration: 0.5,
      });

      return () => {
        tl.kill();
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <h1
      ref={containerRef}
      className={cn(
        "info-animated w-full px-[15px] md:px-[30px] mt-[250px] lg:mt-[392px] text-md select-none",
        className
      )}
    >
      {renderStarEmphasis(info)}
    </h1>
  );
};

export default Info;

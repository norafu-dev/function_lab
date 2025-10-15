"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkScrollAnimations = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero 渐入动画（仅透明度，不含位移）
      const hero = document.querySelector(".work-hero");
      if (hero) {
        gsap.fromTo(
          hero,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      // Description 渐入动画
      const description = document.querySelector(".work-description");
      if (description) {
        gsap.fromTo(
          description,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }

      // Row 滚动渐入动画
      const rows = gsap.utils.toArray(".work-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top bottom-=100",
              once: true,
            },
          }
        );
      });

      // Credits 渐入动画（仅透明度，不含位移）
      const credits = document.querySelector(".work-credits");
      if (credits) {
        gsap.fromTo(
          credits,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: credits,
              start: "top bottom-=100",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
};

export default WorkScrollAnimations;

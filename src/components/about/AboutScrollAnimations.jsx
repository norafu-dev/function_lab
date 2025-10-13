"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutScrollAnimations = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".padding-x section");

      sections.forEach((section) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });

        const borderLines = section.querySelectorAll(".about-animate-line");
        const titles = section.querySelectorAll(
          ".about-animate-title, .about-animate-subtext"
        );
        const fades = section.querySelectorAll(".about-animate-fade");

        if (borderLines.length) {
          timeline.fromTo(
            borderLines,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.out",
              stagger: 0.1,
            }
          );
        }

        if (titles.length) {
          timeline.from(
            titles,
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
            },
            "-=0.3"
          );
        }

        if (fades.length) {
          timeline.from(
            fades,
            {
              opacity: 0,
              y: 10,
              duration: 0.2,
              ease: "power2.out",
              stagger: 0.08,
            },
            "-=0.2"
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
};

export default AboutScrollAnimations;

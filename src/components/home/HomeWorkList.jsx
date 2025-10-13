"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import WorkCard from "@/components/work/WorkCard";

const HomeWorkList = ({ works }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return undefined;

    const cards = gsap.utils.toArray(
      sectionEl.querySelectorAll(".home-work-card")
    );

    if (!cards.length) return undefined;

    gsap.set(cards, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: 0.4,
      duration: 0.6,
    });

    let hasPlayed = false;

    const playOnce = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      tl.play();
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playOnce();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const handleScroll = () => {
      if (hasPlayed || !sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      if (
        rect.top < viewportHeight * 0.85 &&
        rect.bottom > viewportHeight * 0.1
      ) {
        playOnce();
      }
    };

    observer.observe(sectionEl);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      tl.kill();
    };
  }, [works]);

  return (
    <section ref={sectionRef} className="pt-[50px] lg:pt-[200px]">
      {works.map((work) => (
        <div className="lg:pb-[6px] home-work-card" key={work.title}>
          {/* 传递放大的倍数 */}
          <WorkCard
            work={work}
            autoplay={true}
            scale={true}
            scaleFactor={1.02}
          />
        </div>
      ))}
    </section>
  );
};

export default HomeWorkList;

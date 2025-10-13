"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WorkCard from "./WorkCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WorkList = ({ works, triggerMode = "scrollTrigger" }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // 添加数据验证
  if (!works || !Array.isArray(works)) {
    return <div className="text-center py-20">暂无作品数据</div>;
  }

  // 过滤掉没有 hero 数据的作品
  const validWorks = works.filter(
    (work) => work && work.hero && work.hero.type
  );

  if (validWorks.length === 0) {
    return <div className="text-center py-20">暂无有效的作品数据</div>;
  }

  const listRef = useRef(null);

  const filteredWorks = useMemo(() => {
    if (!categoryParam) return validWorks;

    return validWorks.filter(
      (work) =>
        Array.isArray(work.category) &&
        work.category.map((item) => item.toLowerCase()).includes(categoryParam)
    );
  }, [categoryParam, validWorks]);

  useEffect(() => {
    if (triggerMode !== "intersection") return undefined;

    const listEl = listRef.current;
    if (!listEl) return undefined;

    const cards = gsap.utils.toArray(
      listEl.querySelectorAll(".work-card-item")
    );

    if (!cards.length) return undefined;

    gsap.set(cards, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: 0.2,
      duration: 0.4,
    });

    let hasPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true;
            tl.play();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(listEl);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, [filteredWorks, triggerMode]);

  useGSAP(
    () => {
      if (triggerMode !== "scrollTrigger") return;

      const cards = gsap.utils.toArray(
        listRef.current?.querySelectorAll(".work-card-item") || []
      );

      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 20 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: listRef.current,
            start: "top bottom-=120",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .to(cards, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.2,
          duration: 0.4,
        });
    },
    { scope: listRef, dependencies: [filteredWorks, triggerMode] }
  );

  return (
    <div ref={listRef} className="lg:grid lg:grid-cols-2 gap-[6px] mb-[200px]">
      {filteredWorks.map((work) => (
        <div className="work-card-item" key={work.title}>
          <WorkCard work={work} autoplay={true} scale={true} />
        </div>
      ))}
    </div>
  );
};

export default WorkList;

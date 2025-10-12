"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getImageInfo, formatDate } from "@/lib/utils";
import NewsCard from "./NewsCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NewsList = ({
  news,
  mobileCount = 4,
  total = 6,
  triggerMode = "scrollTrigger",
}) => {
  const listRef = useRef(null);

  const newsWithImageInfo = useMemo(
    () =>
      news.map((item) => ({
        title: item.title,
        cover: getImageInfo(item.cover),
        date: formatDate(item.date),
      })),
    [news]
  );

  useEffect(() => {
    if (triggerMode !== "intersection") return undefined;

    const listEl = listRef.current;
    if (!listEl) return undefined;

    const cards = gsap.utils.toArray(
      listEl.querySelectorAll(".news-card-item")
    );

    if (!cards.length) return undefined;

    gsap.set(cards, { opacity: 0, y: 40 });

    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: 0.15,
      duration: 0.5,
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
      { threshold: 0.05, rootMargin: "0px 0px -40% 0px" }
    );

    observer.observe(listEl);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, [newsWithImageInfo, triggerMode]);

  useGSAP(
    () => {
      if (triggerMode !== "scrollTrigger") return;

      const cards = gsap.utils.toArray(
        listRef.current?.querySelectorAll(".news-card-item") || []
      );

      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 40 });

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
          stagger: 0.15,
          duration: 0.5,
        });
    },
    { scope: listRef, dependencies: [newsWithImageInfo, triggerMode] }
  );

  return (
    <div
      ref={listRef}
      className="grid grid-cols-2 md:grid-cols-3 gap-x-[6px] gap-y-[60px] lg:gap-x-[30px] lg:gap-y-[30px]"
    >
      {newsWithImageInfo
        .slice(0, total)
        .map(({ cover, title, date }, index) => (
          <div
            key={index}
            className={`news-card-item ${
              index >= mobileCount ? "hidden md:block" : ""
            }`}
          >
            <NewsCard cover={cover} title={title} date={date} index={index} />
          </div>
        ))}
    </div>
  );
};

export default NewsList;

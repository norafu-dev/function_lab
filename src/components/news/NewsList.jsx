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
  animateFrom = 0,
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

    gsap.set(cards, { opacity: 0, y: 10 });

    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: 0.15,
      duration: 0.3,
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

      const allCards = gsap.utils.toArray(
        listRef.current?.querySelectorAll(".news-card-item") || []
      );

      if (!allCards.length) return;

      // 根据 data-index 过滤需要动画的卡片
      const cardsToAnimate = allCards.filter((card) => {
        const index = parseInt(card.getAttribute("data-index") || "0", 10);
        return index >= animateFrom;
      });

      if (cardsToAnimate.length === 0) return;

      gsap.set(cardsToAnimate, { opacity: 0, y: 10 });

      if (animateFrom > 0) {
        // 如果是展开动画，立即执行
        // 添加短暂延迟确保 DOM 已更新
        gsap.delayedCall(0.05, () => {
          gsap.to(cardsToAnimate, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            stagger: 0.1,
            duration: 0.4,
          });
        });
      } else {
        // 如果是初始加载，使用 ScrollTrigger
        gsap
          .timeline({
            scrollTrigger: {
              trigger: listRef.current,
              start: "top bottom-=120",
              once: true,
              invalidateOnRefresh: true,
            },
          })
          .to(cardsToAnimate, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            stagger: 0.15,
            duration: 0.3,
          });
      }
    },
    {
      scope: listRef,
      dependencies: [newsWithImageInfo, triggerMode, animateFrom],
    }
  );

  return (
    <div
      ref={listRef}
      className="grid grid-cols-2 md:grid-cols-3 gap-x-[6px] gap-y-[30px] lg:gap-x-[30px] lg:gap-y-[60px]"
    >
      {newsWithImageInfo
        .slice(0, total)
        .map(({ cover, title, date }, index) => (
          <div
            key={index}
            data-index={index}
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

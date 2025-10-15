"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { renderStarEmphasis } from "@/lib/utils";

const MobileHero = ({ src, poster, info }) => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    // 刷新 ScrollTrigger 确保正确计算
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      // 滚动触发的范围：顶部 0px 到 底部 300%
      scrollTrigger: {
        trigger: ".mobile-hero",
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        pinSpacing: "margin",
        anticipatePin: 1,
      },
    });

    const split = new SplitText(".mobile-hero-info", { type: "words" });
    gsap.set(split.words, { opacity: 0 });

    // 先把视频包装一层，确保 overflow: hidden
    gsap.set(".mobile-hero-video", {
      scale: 1,
      yPercent: 0,
      transformOrigin: "50% 50%",
    });

    tl.fromTo(
      ".mobile-hero-video",
      { scale: 1, yPercent: 0 },
      { scale: 1.8, yPercent: -40, ease: "power1.inOut", duration: 0.8 }
    )
      .fromTo(
        ".mobile-hero-info",
        { y: "76vh" },
        { y: "71vh", ease: "power1.inOut", duration: 1.2 },
        "<0.1"
      )
      .to(
        split.words,
        { opacity: 1, stagger: 0.05, ease: "power1.out", duration: 0.7 },
        "<"
      )
      .to(
        ".mobile-hero-video",
        { yPercent: -50, duration: 0.5, ease: "power1.inOut" },
        "<0.5"
      );

    return () => {
      split.revert();
      tl.kill();
    };
  });

  return (
    <section className="mobile-hero relative flex min-h-[100dvh] items-center justify-center overflow-hidden pb-[env(safe-area-inset-bottom)]">
      <div className="mobile-hero-frame">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="mobile-hero-video w-full object-cover"
        >
          <source src={src} />
        </video>
      </div>

      {info && (
        <p className="mobile-hero-info absolute left-0 right-0 top-0 mt-0 translate-y-[100vh] text-[24px] leading-[26px] padding-x">
          {renderStarEmphasis(info)}
        </p>
      )}
    </section>
  );
};

export default MobileHero;

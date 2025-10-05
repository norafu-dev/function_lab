"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { HOME } from "@/lib/data";
import { renderStarEmphasis } from "@/lib/utils";

const TabletHero = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const tl = gsap.timeline({
      // 滚动触发的范围：顶部 0px 到 底部 300%
      scrollTrigger: {
        trigger: ".tablet-hero",
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        pinSpacing: "margin",
        anticipatePin: 1,
      },
    });

    const split = new SplitText(".tablet-hero-info", { type: "words" });
    gsap.set(split.words, { opacity: 0 });

    // 先把视频包装一层，确保 overflow: hidden
    gsap.set(".tablet-hero-video", {
      scale: 1,
      yPercent: 0,
      transformOrigin: "50% 50%",
    });

    tl.fromTo(
      ".tablet-hero-video",
      { scale: 1, yPercent: 0 },
      { scale: 1.8, yPercent: -40, ease: "power1.inOut", duration: 1 }
    )
      .fromTo(
        ".tablet-hero-info",
        { y: "100vh" },
        { y: "869px", ease: "power1.inOut", duration: 1.2 },
        "<0.1"
      )
      .to(
        split.words,
        { opacity: 1, stagger: 0.05, ease: "power1.out", duration: 0.7 },
        "<"
      )
      .to(
        ".tablet-hero-video",
        { yPercent: -100, duration: 0.5, ease: "power1.inOut" },
        "<0.5"
      );

    return () => {
      split.revert();
      tl.kill();
    };
  });

  return (
    <section className="tablet-hero hidden  relative md:flex lg:hidden h-screen items-center justify-center overflow-hidden">
      <div className="tablet-hero-frame">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/image/home.jpg"
          className="tablet-hero-video h-full object-cover"
        >
          <source src="/video/home.mp4" />
        </video>
      </div>

      {HOME.info && (
        <p className="tablet-hero-info absolute left-0 right-0 top-0 mt-0 translate-y-[100vh] text-[24px] leading-[26px] padding-x">
          {renderStarEmphasis(HOME.info)}
        </p>
      )}
    </section>
  );
};

export default TabletHero;

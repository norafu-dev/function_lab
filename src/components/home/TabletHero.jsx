"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { renderStarEmphasis } from "@/lib/utils";

const TabletHero = ({ src, poster, info }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    let hasPlayed = false;

    const attemptAutoPlay = () => {
      if (hasPlayed) return;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasPlayed = true;
          })
          .catch((error) => {
            console.log(
              "Autoplay blocked, waiting for user interaction:",
              error
            );
          });
      }
    };

    const playOnInteraction = () => {
      if (hasPlayed || !video.paused) return;

      video
        .play()
        .then(() => {
          hasPlayed = true;
        })
        .catch((err) => console.log("Play failed:", err));
    };

    const events = ["click", "scroll", "touchstart", "mousemove", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, playOnInteraction, {
        once: true,
        passive: true,
      });
    });

    if (video.readyState >= 3) {
      attemptAutoPlay();
    } else {
      video.addEventListener("loadeddata", attemptAutoPlay, { once: true });
    }

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, playOnInteraction);
      });
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    // 刷新 ScrollTrigger 确保正确计算
    ScrollTrigger.refresh();

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
      { scale: 1.8, yPercent: -65, ease: "power1.inOut", duration: 1 }
    )
      .fromTo(
        ".tablet-hero-info",
        { y: "100vh" },
        { y: "85vh", ease: "power1.inOut", duration: 1 },
        "<0.3"
      )
      .to(
        split.words,
        { opacity: 1, stagger: 0.05, ease: "power1.out", duration: 0.7 },
        "<0.2"
      );

    return () => {
      split.revert();
      tl.kill();
    };
  });

  return (
    <section className="tablet-hero relative flex h-screen items-center justify-center overflow-hidden">
      <div className="tablet-hero-frame">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="tablet-hero-video w-full object-cover"
          webkit-playsinline="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {info && (
        <p className="tablet-hero-info absolute left-0 right-0 top-0 mt-0 translate-y-[100vh] text-[24px] leading-[26px] padding-x">
          {renderStarEmphasis(info)}
        </p>
      )}
    </section>
  );
};

export default TabletHero;

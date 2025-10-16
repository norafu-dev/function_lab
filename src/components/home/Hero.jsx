"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { renderStarEmphasis } from "@/lib/utils";

const Hero = ({ src, poster, info }) => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        pinSpacing: "margin",
        anticipatePin: 1,
      },
    });

    const split = new SplitText(".hero-info", { type: "words" });
    gsap.set(split.words, { opacity: 0 });

    tl.fromTo(
      ".hero-video",
      { width: "100%", height: "100%" },
      { width: "0%", height: "0%", ease: "power1.inOut", duration: 1 }
    )
      .fromTo(
        ".hero-info",
        { y: "107vh" },
        { y: "80vh", ease: "power1.inOut", duration: 1 },
        "<5%"
      )
      .to(
        split.words,
        { opacity: 1, stagger: 0.04, ease: "power1.inOut", duration: 0.5 },
        "<"
      );

    return () => {
      split.revert();
      tl.kill();
    };
  });

  return (
    <section className="hero relative">
      <figure className="flex h-screen w-full items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="w-full h-full object-cover hero-video"
        >
          <source src={src} />
        </video>
      </figure>

      {info && (
        <p className="hero-info absolute left-0 right-0 top-0 mt-0 translate-y-[110vh] text-md padding-x">
          {renderStarEmphasis(info)}
        </p>
      )}
    </section>
  );
};

export default Hero;

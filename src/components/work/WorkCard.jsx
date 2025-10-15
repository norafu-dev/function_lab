"use client";

import Link from "next/link";
import { useState } from "react";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";
import AutoPlayVideoCard from "./AutoPlayVideoCard";
import LinearBlur from "@/components/nav/LinearBlur";
import useDelayedUnmount from "@/hooks/useDelayedUnmount";

const WorkCard = ({ work, autoplay, scale, scaleFactor }) => {
  const { hero, slug, title } = work;
  const scaleValue = scaleFactor ? scaleFactor : 1.04;
  const [blurProgress, setBlurProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const shouldRenderOverlay = useDelayedUnmount(hovered, 900);

  const scaleStyle = scale
    ? {
        "--scale-value": scaleValue,
        transition: "all 400ms",
      }
    : {};

  return (
    <Link href={`/work/${slug}`}>
      <div
        className="relative group aspect-[16/9] overflow-hidden"
        onMouseEnter={() => {
          setHovered(true);
          setBlurProgress(1);
        }}
        onMouseLeave={() => {
          setBlurProgress(0);
          setHovered(false);
        }}
      >
        {hero.type === "image" ? (
          <ImageCard
            src={hero}
            alt={title}
            className={scale ? "hover-scale" : ""}
            style={scaleStyle}
          />
        ) : autoplay ? (
          <AutoPlayVideoCard
            src={hero}
            alt={title}
            className={scale ? "hover-scale" : ""}
            style={scaleStyle}
          />
        ) : (
          <VideoCard
            src={hero}
            alt={title}
            className={scale ? "hover-scale" : ""}
            style={scaleStyle}
          />
        )}
        {/* title for desktop */}
        <div className="hidden lg:block absolute left-0 bottom-0 w-full h-[60px]">
          <div className="relative w-full h-full">
            {shouldRenderOverlay && (
              <>
                <div
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,${0.2 * blurProgress}) 0%, rgba(0,0,0,0) 100%)`,
                    transition:
                      "background 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
                <LinearBlur
                  side="bottom"
                  steps={8}
                  strength={20}
                  falloffPercentage={100}
                  tint="transparent"
                  progress={blurProgress}
                  duration={900}
                  easing="cubic-bezier(0.22, 1, 0.36, 1)"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
              </>
            )}
            <div className="absolute inset-0 z-20 flex items-center px-[30px] text-[12px] leading-[15px] opacity-0 translate-y-[2px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
              {title}
            </div>
          </div>
        </div>
      </div>
      {/* title for mobile */}
      <div className="block lg:hidden w-full p-[15px] md:p-[30px] text-sm hover:text-secondary transition-colors duration-300">
        <span className="text-secondary pr-[3px]">↑</span>
        {title}
      </div>
    </Link>
  );
};

export default WorkCard;

"use client";

import Link from "next/link";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";
import AutoPlayVideoCard from "./AutoPlayVideoCard";
import LinearBlur from "@/components/nav/LinearBlur";

const WorkCard = ({ work, autoplay, scale }) => {
  const { hero, slug, title } = work;
  return (
    <Link href={`/work/${slug}`}>
      <div className="relative group aspect-[1440/810] overflow-hidden">
        {hero.type === "image" ? (
          <ImageCard
            src={hero}
            alt={title}
            className={
              scale ? "hover:scale-106 transition-all duration-300" : ""
            }
          />
        ) : autoplay ? (
          <AutoPlayVideoCard
            src={hero}
            alt={title}
            className={
              scale ? "hover:scale-106 transition-all duration-300" : ""
            }
          />
        ) : (
          <VideoCard
            src={hero}
            alt={title}
            className={
              scale ? "hover:scale-106 transition-all duration-300" : ""
            }
          />
        )}
        {/* title for desktop */}
        <div className="hidden lg:block absolute left-0 bottom-0 w-full h-[60px]">
          <div className="relative w-full h-full opacity-0 group-hover:opacity-100">
            <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_100%)]" />
            <LinearBlur
              side="bottom"
              steps={8}
              strength={20}
              falloffPercentage={100}
              tint="transparent"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div className="absolute inset-0 z-20 flex items-center px-[30px] text-[12px] leading-[15px]">
              {title}
            </div>
          </div>
        </div>
      </div>
      {/* title for mobile */}
      <div className="block lg:hidden w-full p-[15px] md:p-[30px] text-sm">
        <span className="text-secondary pr-[3px]">↑</span>
        {title}
      </div>
    </Link>
  );
};

export default WorkCard;

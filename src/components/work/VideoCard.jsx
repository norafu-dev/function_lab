"use client";

import { getVideoUrl, getImageInfo } from "@/lib/utils";
import { cn } from "@/lib/cn";

const VideoCard = ({ src, className }) => {
  const { file, thumbnail, autoplay } = src;
  const videoUrl = getVideoUrl(file);
  const imgUrl = thumbnail ? getImageInfo(thumbnail).imgUrl : null;
  console.log(autoplay ? "autoplay" : "not autoplay");

  return (
    <video
      className={cn("block w-full h-full object-cover", className)}
      poster={imgUrl}
      autoPlay={autoplay}
      controls={!autoplay}
      muted={autoplay}
      loop={autoplay}
      playsInline
    >
      <source src={videoUrl} />
    </video>
  );
};

export default VideoCard;

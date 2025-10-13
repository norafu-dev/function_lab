"use client";

import { getVideoUrl, getImageInfo } from "@/lib/utils";
import { cn } from "@/lib/cn";

const AutoPlayVideoCard = ({ src, className, style }) => {
  const { file, thumbnail } = src;
  const videoUrl = getVideoUrl(file);
  const imgUrl = thumbnail ? getImageInfo(thumbnail).imgUrl : null;

  return (
    <video
      className={cn("block w-full h-full object-cover", className)}
      style={style}
      poster={imgUrl}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={videoUrl} />
    </video>
  );
};

export default AutoPlayVideoCard;

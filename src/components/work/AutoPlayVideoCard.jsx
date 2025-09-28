"use client";

import { getVideoUrl, getImageInfo } from "@/lib/utils";

const AutoPlayVideoCard = ({ src }) => {
  const { file, thumbnail } = src;
  const videoUrl = getVideoUrl(file);
  const imgUrl = thumbnail ? getImageInfo(thumbnail).imgUrl : null;

  return (
    <video
      className="block w-full h-full object-cover"
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

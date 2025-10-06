"use client";

import { useState, useRef } from "react";
import { getVideoUrl, getImageInfo } from "@/lib/utils";
import { cn } from "@/lib/cn";

const VideoCard = ({ src, className }) => {
  const { file, thumbnail, autoplay } = src;
  const videoUrl = getVideoUrl(file);
  const imgUrl = thumbnail ? getImageInfo(thumbnail).imgUrl : null;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        className={cn("block w-full h-full object-cover", className)}
        poster={imgUrl}
        autoPlay={autoplay}
        controls={showControls && !autoplay}
        muted={autoplay}
        loop={autoplay}
        playsInline
        onPause={handlePause}
        onPlay={handlePlay}
      >
        <source src={videoUrl} />
      </video>

      {/* 自定义播放按钮 - 只在非自动播放且未开始播放时显示 */}
      {!autoplay && !isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlayClick}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center shadow-lg transition-all hover:scale-105">
            {/* 播放三角形图标 */}
            <svg
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;

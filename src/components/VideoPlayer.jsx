"use client";

import React from "react";

export default function VideoPlayer({ video, className }) {
  const { url, autoplay, background, loop } = video;

  const src = `${url}?autoplay=${autoplay}&background=${background}&loop=${loop}`;

  return (
    <div className={className}>
      <iframe
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

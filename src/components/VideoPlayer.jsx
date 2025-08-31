"use client";

import React from "react";

export default function VideoPlayer({ src, className }) {
  return (
    <div
      className={className}
      style={{ position: "relative", paddingTop: "50%" }}
    >
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

"use client";

import React from "react";

const oppositeSide = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
};

export default function LinearBlur({
  strength,
  steps,
  falloffPercentage,
  tint,
  side,
  style,
  ...props
}) {
  const actualSteps = Math.max(1, steps);
  const step = falloffPercentage / actualSteps;

  // 同库的强度分布公式（从强到弱呈幂次衰减）
  const factor = 0.5;
  const base = Math.pow(strength / factor, 1 / (actualSteps - 1));
  const mainPercentage = 100 - falloffPercentage;

  const getBackdrop = (i) =>
    `blur(${factor * base ** (actualSteps - i - 1)}px)`;
  const dir = `to ${oppositeSide[side]}`;

  return (
    <div
      {...props}
      style={{ pointerEvents: "none", transformOrigin: side, ...style }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(${dir}, ${tint} 0%, transparent 100%)`,
        }}
      >
        {/* 第 0 层：从 main% 到 main%+step 做满强度 */}
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            inset: 0,
            maskImage: `linear-gradient(${dir}, rgba(0,0,0,1) ${mainPercentage}%, rgba(0,0,0,0) ${mainPercentage + step}%)`,
            WebkitMaskImage: `linear-gradient(${dir}, rgba(0,0,0,1) ${mainPercentage}%, rgba(0,0,0,0) ${mainPercentage + step}%)`,
            backdropFilter: getBackdrop(0),
            WebkitBackdropFilter: getBackdrop(0),
          }}
        />
        {/* 第 1 层（若存在）：主区间再延伸一步 */}
        {actualSteps > 1 && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              inset: 0,
              maskImage: `linear-gradient(${dir},
                rgba(0,0,0,1) ${mainPercentage}%,
                rgba(0,0,0,1) ${mainPercentage + step}%,
                rgba(0,0,0,0) ${mainPercentage + step * 2}%
              )`,
              WebkitMaskImage: `linear-gradient(${dir},
                rgba(0,0,0,1) ${mainPercentage}%,
                rgba(0,0,0,1) ${mainPercentage + step}%,
                rgba(0,0,0,0) ${mainPercentage + step * 2}%
              )`,
              backdropFilter: getBackdrop(1),
              WebkitBackdropFilter: getBackdrop(1),
            }}
          />
        )}
        {/* 余下层：0-1-1-0 的遮罩滑动窗口 */}
        {actualSteps > 2 &&
          Array.from({ length: actualSteps - 2 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                zIndex: i + 3,
                inset: 0,
                maskImage: `linear-gradient(${dir},
                  rgba(0,0,0,0) ${mainPercentage + i * step}%,
                  rgba(0,0,0,1) ${mainPercentage + (i + 1) * step}%,
                  rgba(0,0,0,1) ${mainPercentage + (i + 2) * step}%,
                  rgba(0,0,0,0) ${mainPercentage + (i + 3) * step}%
                )`,
                WebkitMaskImage: `linear-gradient(${dir},
                  rgba(0,0,0,0) ${mainPercentage + i * step}%,
                  rgba(0,0,0,1) ${mainPercentage + (i + 1) * step}%,
                  rgba(0,0,0,1) ${mainPercentage + (i + 2) * step}%,
                  rgba(0,0,0,0) ${mainPercentage + (i + 3) * step}%
                )`,
                backdropFilter: getBackdrop(i + 2),
                WebkitBackdropFilter: getBackdrop(i + 2),
              }}
            />
          ))}
      </div>
    </div>
  );
}

export { LinearBlur };

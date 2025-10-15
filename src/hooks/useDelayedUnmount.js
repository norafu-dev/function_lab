"use client";

import { useEffect, useState } from "react";

export default function useDelayedUnmount(show, delayMs) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    let timeoutId;
    if (show) {
      setShouldRender(true);
    } else if (!show && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayMs);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [show, delayMs, shouldRender]);

  return shouldRender;
}

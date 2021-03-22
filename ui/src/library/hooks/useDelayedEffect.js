import { useEffect } from "react";

export function useDelayedEffect(callback, interval = 1500) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, interval);
    return () => {
      clearTimeout(timer);
    };
  }, [callback, interval]);
}

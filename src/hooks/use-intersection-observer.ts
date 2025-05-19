import { useEffect, useRef } from "react";

export const useIntersectionObserver = (
  cb: (index: number) => void,
  threshold = 0.3
) => {
  const ref = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = ref.current.findIndex((sec) => sec === entry.target);

            if (index !== 1) {
              cb(index);
            }
          }
        });
      },
      { threshold }
    );

    ref.current.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      ref.current.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, [cb, threshold]);

  return ref;
};

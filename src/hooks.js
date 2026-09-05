import { useEffect, useRef, useState } from 'react';

// Fades a section in the first time it enters the viewport. Kept as a hook so
// each section owns its own observer and nothing has to be registered globally.
export function useReveal(options) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px', ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown, options]);

  return [ref, shown ? 'reveal is-in' : 'reveal'];
}

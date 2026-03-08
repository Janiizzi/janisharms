import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';

type RevealOnViewProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  rootMargin?: string;
};

const RevealOnView = ({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: RevealOnViewProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry], activeObserver) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      },
      { threshold, rootMargin }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const style = {
    '--reveal-delay': `${delayMs}ms`,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      className={`reveal-on-view ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

export default RevealOnView;

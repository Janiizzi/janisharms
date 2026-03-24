import { useEffect, useRef, useState } from 'react';

interface LoadingbarProps {
    progress: number;
    className?: string;
    maxCount: number;
    title?: string;
    delayMs?: number;
}

export const Loadingbar = ({ progress, className, maxCount, title, delayMs = 0 }: LoadingbarProps) => {
    const pct = Math.min((progress / maxCount) * 100, 100);
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let timer: ReturnType<typeof setTimeout>;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timer = setTimeout(() => setWidth(pct), delayMs);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [pct, delayMs]);

    return (
        <div className="flex flex-col" ref={ref}>
            {title && <span className='text-sm italic text-white/50'>{title}:</span>}
            <div className={`flex items-center gap-3 ${className || ''}`}>
                <div className='relative flex-1 h-2 bg-white/10 rounded-full overflow-hidden'>
                    <div
                        className='h-full rounded-full transition-all duration-700 ease-out'
                        style={{
                            width: `${width}%`,
                            background: 'linear-gradient(90deg, #cd5d02, #fa8220)',
                            boxShadow: '0 0 8px rgba(250,130,32,0.45)',
                        }}
                    />
                </div>
                <span className='text-xs font-mono tabular-nums min-w-[2.5rem] text-right'>
                    <span className='text-primary/80 font-semibold'>{progress}</span>
                    <span className='text-white/30'>/{maxCount}</span>
                </span>
            </div>
        </div>
    );
}

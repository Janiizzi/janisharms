import { useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export interface LightboxItem {
  src: string;
  title: string;
  caption?: string;
  meta?: string;
}

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

const Lightbox = ({ items, index, onClose, onNavigate }: LightboxProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = index !== null && index >= 0 && index < items.length;

  const goTo = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') goTo(1);
      if (event.key === 'ArrowLeft') goTo(-1);
    };

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, goTo]);

  if (!isOpen || index === null) return null;

  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex flex-col bg-primary-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <span className="text-xs uppercase tracking-[0.18em] text-primary-grey">
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-full border border-primary-white/20 px-3 py-2 text-primary-grey transition hover:border-primary hover:text-primary cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* min-h-0 so the flex child may shrink — without it the image sets the
          height and pushes the caption off screen. */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 pb-2 md:px-16">
        <button
          type="button"
          aria-label="Previous"
          onClick={event => {
            event.stopPropagation();
            goTo(-1);
          }}
          className="absolute left-1 z-10 rounded-full border border-primary-white/15 bg-primary-background/70 px-3 py-4 text-primary-grey transition hover:border-primary hover:text-primary md:left-4 cursor-pointer"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <img
          src={item.src}
          alt={item.title}
          onClick={event => event.stopPropagation()}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />

        <button
          type="button"
          aria-label="Next"
          onClick={event => {
            event.stopPropagation();
            goTo(1);
          }}
          className="absolute right-1 z-10 rounded-full border border-primary-white/15 bg-primary-background/70 px-3 py-4 text-primary-grey transition hover:border-primary hover:text-primary md:right-4 cursor-pointer"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div
        className="mx-auto w-full max-w-3xl px-6 pb-8 pt-2 text-center"
        onClick={event => event.stopPropagation()}
      >
        <div className="text-lg font-semibold text-primary-white">{item.title}</div>
        {item.meta && (
          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-primary-grey">{item.meta}</div>
        )}
        {item.caption && (
          <p className="mt-2 text-sm leading-relaxed text-primary-grey">{item.caption}</p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;

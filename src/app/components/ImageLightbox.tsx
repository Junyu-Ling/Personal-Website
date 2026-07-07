import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

type LightboxImage = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function ImageLightbox({
  images,
  index,
  onClose,
  onChange,
}: ImageLightboxProps) {
  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && index !== null) {
        onChange((index + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && index !== null) {
        onChange((index - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, index, isOpen, onChange, onClose]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (index !== null) {
                    onChange((index - 1 + images.length) % images.length);
                  }
                }}
                className="absolute left-4 md:left-8 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (index !== null) {
                    onChange((index + 1) % images.length);
                  }
                }}
                className="absolute right-4 md:right-8 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="max-h-[88vh] max-w-full object-contain rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(event) => event.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

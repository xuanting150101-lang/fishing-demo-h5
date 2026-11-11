import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface FullScreenGalleryProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export function FullScreenGallery({
  images,
  startIndex,
  onClose,
}: FullScreenGalleryProps) {
  const [current, setCurrent] = useState(startIndex);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm text-white/60">
          {current + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70"
        >
          <X size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center relative">
        <img
          src={images[current]}
          alt={`${current + 1}`}
          className="max-w-full max-h-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white/70"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white/70"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 px-4 py-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden transition-all ${
                i === current ? "ring-2 ring-teal-400" : "opacity-50"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

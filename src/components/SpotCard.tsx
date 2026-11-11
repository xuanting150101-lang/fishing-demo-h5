import { Star, MapPin, MessageSquare } from "lucide-react";
import type { Spot } from "@/types";

interface SpotCardProps {
  spot: Spot;
  onClick: (spot: Spot) => void;
}

export default function SpotCard({ spot, onClick }: SpotCardProps) {
  return (
    <div
      onClick={() => onClick(spot)}
      className="bg-[#142238] rounded-xl overflow-hidden mb-3 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative h-44">
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-[10px] rounded-md border border-teal-500/20">
              {spot.type}
            </span>
            {spot.isHot && (
              <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] rounded-md border border-orange-500/20">
                热门
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-white">{spot.name}</h3>
          <div className="flex items-center gap-1 text-white/50 text-xs mt-0.5">
            <MapPin size={12} />
            <span className="truncate">{spot.address}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-0.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs text-white font-medium">{spot.rating}</span>
        </div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/50">
            距您 {spot.distance}km
          </span>
          <span className="text-xs text-white/50">
            {spot.fishTypes.slice(0, 2).join(" / ")}
          </span>
        </div>
        <div className="flex items-center gap-1 text-white/40 text-xs">
          <MessageSquare size={12} />
          <span>{spot.reviewCount}</span>
        </div>
      </div>
    </div>
  );
}

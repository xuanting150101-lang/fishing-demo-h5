import { MapPin, Star, Phone, Calendar, MessageCircle } from "lucide-react";
import type { Spot } from "../types";

interface SpotCardProps {
  spot: Spot;
  onClick: (spot: Spot) => void;
}

export function SpotCard({ spot, onClick }: SpotCardProps) {
  return (
    <div
      onClick={() => onClick(spot)}
      className="glass-card rounded-2xl overflow-hidden active:scale-[0.985] transition-transform cursor-pointer"
    >
      <div className="relative h-44">
        <img
          src={spot.images[0]}
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-teal-500/90 text-white text-xs font-medium">
            {spot.distance}
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              spot.fishCondition === "爆护"
                ? "bg-amber-500/90 text-white"
                : spot.fishCondition === "有口"
                ? "bg-teal-500/90 text-white"
                : "bg-white/20 text-white"
            }`}
          >
            {spot.fishCondition}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-0.5 bg-black/40 px-2 py-0.5 rounded-lg">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs text-white font-medium">{spot.rating}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base font-bold text-white">{spot.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-white/60" />
            <span className="text-xs text-white/60 truncate">{spot.address}</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-amber-400">{spot.price}</span>
            <span className="text-xs text-white/30">{spot.hours}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {spot.bookingSlots && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-400 text-[10px] font-medium flex items-center gap-1"
              >
                <Calendar size={10} />
                预约
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `tel:${spot.phone}`;
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 text-white/50 text-[10px] font-medium flex items-center gap-1"
            >
              <Phone size={10} />
              电话
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 text-white/50 text-[10px] font-medium flex items-center gap-1"
            >
              <MessageCircle size={10} />
              客服
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {spot.fishTypes.slice(0, 4).map((type) => (
            <span
              key={type}
              className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[10px]"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
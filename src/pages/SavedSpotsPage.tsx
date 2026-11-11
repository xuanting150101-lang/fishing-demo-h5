import { ArrowLeft, MapPin, Star, Phone, Calendar, MessageCircle } from "lucide-react";
import { savedSpots } from "../data/mock";
import type { Spot } from "../types";

interface SavedSpotsPageProps {
  onBack: () => void;
  onSpotClick: (spot: Spot) => void;
}

export function SavedSpotsPage({ onBack, onSpotClick }: SavedSpotsPageProps) {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="sticky top-0 z-40 glass-strong border-b-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50"><ArrowLeft size={18} /></button>
          <span className="text-base font-semibold text-white/90">收藏的钓点</span>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {savedSpots.map((spot) => (
          <div key={spot.id} onClick={() => onSpotClick(spot)} className="glass-card rounded-2xl overflow-hidden active:scale-[0.985] transition-transform cursor-pointer">
            <div className="relative h-40">
              <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/90 text-white text-xs font-medium">{spot.distance}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${spot.fishCondition === "爆护" ? "bg-amber-500/90 text-white" : spot.fishCondition === "有口" ? "bg-teal-500/90 text-white" : "bg-white/20 text-white"}`}>{spot.fishCondition}</span>
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
                    <button onClick={(e) => e.stopPropagation()} className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-400 text-[10px] font-medium flex items-center gap-1"><Calendar size={10} /> 预约</button>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${spot.phone}`; }} className="px-2.5 py-1 rounded-lg bg-white/5 text-white/50 text-[10px] font-medium flex items-center gap-1"><Phone size={10} /> 电话</button>
                  <button onClick={(e) => e.stopPropagation()} className="px-2.5 py-1 rounded-lg bg-white/5 text-white/50 text-[10px] font-medium flex items-center gap-1"><MessageCircle size={10} /> 客服</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {spot.fishTypes.slice(0, 4).map((type) => (
                  <span key={type} className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[10px]">{type}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {savedSpots.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Bookmark size={40} className="text-white/10 mb-3" />
            <p className="text-sm text-white/30">暂无收藏的钓点</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { SpotCard } from "../components/SpotCard";
import { spots } from "../data/mock";
import type { Spot } from "../types";

interface SpotsPageProps {
  onSpotClick: (spot: Spot) => void;
}

const filters = ["全部", "黑坑", "野钓", "湖库", "海钓", "路亚"];

export function SpotsPage({ onSpotClick }: SpotsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("全部");

  const filteredSpots = spots.filter((spot) => {
    if (activeFilter !== "全部") {
      if (activeFilter === "黑坑" && spot.price.includes("小时")) return true;
      if (activeFilter === "野钓" && spot.price === "免费") return true;
      if (activeFilter === "湖库" && spot.name.includes("湖")) return true;
      if (activeFilter === "海钓" && spot.fishTypes.some((f) => ["海鲈", "石斑", "马鲛"].includes(f))) return true;
      if (activeFilter === "路亚" && spot.fishTypes.some((f) => ["翘嘴", "鳡鱼", "马口"].includes(f))) return true;
      return false;
    }
    if (searchQuery) {
      return (
        spot.name.includes(searchQuery) ||
        spot.address.includes(searchQuery) ||
        spot.fishTypes.some((f) => f.includes(searchQuery))
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="sticky top-0 z-40 glass-strong border-b-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索钓点、鱼种..."
              className="w-full bg-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors"
            />
          </div>
          <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50">
            <SlidersHorizontal size={18} />
          </button>
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === filter ? "bg-teal-500 text-white" : "bg-white/5 text-white/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-3">
        {filteredSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} onClick={onSpotClick} />
        ))}
        {filteredSpots.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <MapPin size={40} className="text-white/10 mb-3" />
            <p className="text-sm text-white/30">暂无符合条件的钓点</p>
          </div>
        )}
      </div>
    </div>
  );
}
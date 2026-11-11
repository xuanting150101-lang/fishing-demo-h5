import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import SpotCard from "@/components/SpotCard";
import { spots } from "@/data/mock";
import type { Spot } from "@/types";

interface SpotsPageProps {
  onSpotClick: (spot: Spot) => void;
  searchQuery: string;
}

const filters = ["全部", "黑坑", "野钓", "路亚", "海钓", "湖库"];

export default function SpotsPage({ onSpotClick }: SpotsPageProps) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpots = useMemo(() => {
    let result = spots;
    if (activeFilter !== "全部") {
      result = result.filter((s) => s.type === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.fishTypes.some((f) => f.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeFilter, searchQuery]);

  return (
    <div className="px-4 pt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-[#142238] rounded-xl px-3 py-2.5">
          <Search size={16} className="text-white/30" />
          <input
            type="text"
            placeholder="搜索钓点名称、地址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none flex-1"
          />
        </div>
        <button className="p-2.5 bg-[#142238] rounded-xl">
          <SlidersHorizontal size={18} className="text-white/50" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
              activeFilter === f
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/20"
                : "bg-[#142238] text-white/50 border border-transparent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 text-white/30 text-xs mb-3">
        <MapPin size={12} />
        <span>广州市</span>
        <span className="ml-1">共 {filteredSpots.length} 个钓点</span>
      </div>

      {filteredSpots.length > 0 ? (
        filteredSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} onClick={onSpotClick} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center pt-20">
          <MapPin size={48} className="text-white/10 mb-4" />
          <p className="text-white/30 text-sm">没有找到匹配的钓点</p>
        </div>
      )}
    </div>
  );
}

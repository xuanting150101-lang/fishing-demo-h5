import { Bookmark } from "lucide-react";
import SpotCard from "@/components/SpotCard";
import { spots } from "@/data/mock";
import type { Spot } from "@/types";

interface SavedSpotsPageProps {
  onSpotClick: (spot: Spot) => void;
}

export default function SavedSpotsPage({ onSpotClick }: SavedSpotsPageProps) {
  const savedSpots = spots.filter((s) => s.isSaved);

  if (savedSpots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-32 px-4">
        <Bookmark size={48} className="text-white/10 mb-4" />
        <p className="text-white/30 text-sm">暂无收藏的钓点</p>
        <p className="text-white/20 text-xs mt-1">去钓点页面看看吧</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4">
      <h2 className="text-lg font-semibold text-white mb-4">我的收藏</h2>
      {savedSpots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} onClick={onSpotClick} />
      ))}
    </div>
  );
}

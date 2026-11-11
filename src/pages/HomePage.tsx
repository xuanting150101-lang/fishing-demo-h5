import { useState } from "react";
import { Search, MapPin, Bell, Flame, ChevronRight } from "lucide-react";
import { SpotCard } from "../components/SpotCard";
import { WeatherCard } from "../components/WeatherCard";
import { spots, weather, nearbySpots, posts } from "../data/mock";
import type { Spot } from "../types";

interface HomePageProps {
  onSpotClick: (spot: Spot) => void;
}

export function HomePage({ onSpotClick }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");

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
              placeholder="搜索钓点、鱼种、技巧..."
              className="w-full bg-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors"
            />
          </div>
          <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      <WeatherCard weather={weather} />

      <div className="px-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: MapPin, label: "附近钓点", color: "text-teal-400" },
            { icon: Flame, label: "热门钓点", color: "text-amber-400" },
            { icon: Search, label: "搜索", color: "text-sky-400" },
            { icon: ChevronRight, label: "更多", color: "text-white/40" },
          ].map((item, i) => (
            <button key={i} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/5 active:bg-white/10 transition-colors">
              <item.icon size={20} className={item.color} />
              <span className="text-[11px] text-white/50">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white/90">附近钓点</h2>
          <button className="text-xs text-teal-400 flex items-center gap-0.5">
            查看全部 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {nearbySpots.slice(0, 3).map((spot) => (
            <SpotCard key={spot.id} spot={spot} onClick={onSpotClick} />
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white/90">热门动态</h2>
          <button className="text-xs text-teal-400 flex items-center gap-0.5">
            查看全部 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} onClick={() => {}} className="glass-card rounded-2xl p-3.5 active:scale-[0.985] transition-transform cursor-pointer">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.nickname} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white/90 truncate">{post.author.nickname}</p>
                  <p className="text-xs text-white/40">{post.createdAt}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-2 line-clamp-2 leading-relaxed">{post.content}</p>
              {post.images.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {post.images.slice(0, 3).map((img, i) => (
                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
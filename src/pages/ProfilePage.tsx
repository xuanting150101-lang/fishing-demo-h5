import { Settings, Bookmark, MapPin, ChevronRight, Edit3 } from "lucide-react";
import { currentUser } from "../data/mock";
import type { User, Spot, Post } from "../types";

interface ProfilePageProps {
  onUserClick: (user: User) => void;
  onPostClick: (post: Post) => void;
  onSpotClick: (spot: Spot) => void;
  onSavedSpotsClick: () => void;
}

export function ProfilePage({ onUserClick, onPostClick, onSpotClick, onSavedSpotsClick }: ProfilePageProps) {
  const user = currentUser;

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="sticky top-0 z-40 glass-strong border-b-0">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-base font-semibold text-white/90">我的</span>
          <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50"><Settings size={18} /></button>
        </div>
      </div>

      <div className="px-4">
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.nickname} className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/30" />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white/90">{user.nickname}</h2>
              <p className="text-xs text-white/40 mt-0.5">ID: {user.userId}</p>
              <p className="text-xs text-white/30 mt-1 line-clamp-1">{user.bio}</p>
            </div>
            <button className="px-3 py-1.5 rounded-full bg-white/5 text-white/40 text-xs font-medium flex items-center gap-1"><Edit3 size={12} /> 编辑</button>
          </div>
          <div className="flex items-center justify-around mt-4 pt-4 border-t border-white/5">
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.followers || 0}</p><p className="text-xs text-white/30 mt-0.5">粉丝</p></div>
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.following || 0}</p><p className="text-xs text-white/30 mt-0.5">关注</p></div>
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.postsCount || 0}</p><p className="text-xs text-white/30 mt-0.5">帖子</p></div>
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.favorites || 0}</p><p className="text-xs text-white/30 mt-0.5">获赞</p></div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-2">
        <button onClick={onSavedSpotsClick} className="w-full glass-card rounded-xl p-3.5 flex items-center gap-3 active:scale-[0.985] transition-transform">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center"><Bookmark size={18} className="text-amber-400" /></div>
          <span className="flex-1 text-sm font-medium text-white/80 text-left">收藏的钓点</span>
          <ChevronRight size={16} className="text-white/20" />
        </button>
        <button className="w-full glass-card rounded-xl p-3.5 flex items-center gap-3 active:scale-[0.985] transition-transform">
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center"><MapPin size={18} className="text-teal-400" /></div>
          <span className="flex-1 text-sm font-medium text-white/80 text-left">我的足迹</span>
          <ChevronRight size={16} className="text-white/20" />
        </button>
      </div>
    </div>
  );
}
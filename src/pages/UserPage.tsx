import { ArrowLeft, MapPin, MessageCircle, Heart, Eye, Bookmark, Share2, ChevronRight } from "lucide-react";
import type { User, Post, Spot } from "../types";

interface UserPageProps {
  user: User;
  onBack: () => void;
  onPostClick: (post: Post) => void;
  onSpotClick: (spot: Spot) => void;
}

export function UserPage({ user, onBack, onPostClick, onSpotClick }: UserPageProps) {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="sticky top-0 z-40 glass-strong border-b-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50"><ArrowLeft size={18} /></button>
          <span className="text-base font-semibold text-white/90">个人主页</span>
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
            <button className="px-3 py-1.5 rounded-full bg-teal-500/15 text-teal-400 text-xs font-medium">+ 关注</button>
          </div>
          <div className="flex items-center justify-around mt-4 pt-4 border-t border-white/5">
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.followers || 0}</p><p className="text-xs text-white/30 mt-0.5">粉丝</p></div>
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.following || 0}</p><p className="text-xs text-white/30 mt-0.5">关注</p></div>
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.postsCount || 0}</p><p className="text-xs text-white/30 mt-0.5">帖子</p></div>
            <div className="text-center"><p className="text-lg font-bold text-white/90">{user.favorites || 0}</p><p className="text-xs text-white/30 mt-0.5">获赞</p></div>
          </div>
        </div>
      </div>

      {user.recentPosts && user.recentPosts.length > 0 && (
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white/90">最近发帖</h2>
            <button className="text-xs text-teal-400 flex items-center gap-0.5">查看全部 <ChevronRight size={12} /></button>
          </div>
          <div className="space-y-3">
            {user.recentPosts.map((post) => (
              <div key={post.id} onClick={() => onPostClick(post)} className="glass-card rounded-2xl p-3.5 active:scale-[0.985] transition-transform cursor-pointer">
                <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">{post.content}</p>
                {post.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {post.images.slice(0, 3).map((img, i) => (
                      <div key={i} className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0"><img src={img} alt="" className="w-full h-full object-cover" /></div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1 text-[11px] text-white/30"><Eye size={12} /> {post.views}</span>
                  <span className="flex items-center gap-1 text-[11px] text-white/30"><Heart size={12} /> {post.likes}</span>
                  <span className="flex items-center gap-1 text-[11px] text-white/30"><MessageCircle size={12} /> {post.comments.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {user.recentSpots && user.recentSpots.length > 0 && (
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white/90">去过钓点</h2>
          </div>
          <div className="space-y-3">
            {user.recentSpots.map((spot) => (
              <div key={spot.id} onClick={() => onSpotClick(spot)} className="glass-card rounded-2xl overflow-hidden active:scale-[0.985] transition-transform cursor-pointer">
                <div className="relative h-32">
                  <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white">{spot.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-white/60" />
                      <span className="text-xs text-white/60 truncate">{spot.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
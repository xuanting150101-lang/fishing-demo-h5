import { useState } from "react";
import { Search, PenLine, Trophy, Flame, ChevronRight } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { posts, rankingUsers } from "../data/mock";
import type { Post } from "../types";

interface DiscoverPageProps {
  onPostClick: (post: Post) => void;
  onPublishClick: () => void;
}

const tabs = ["推荐", "最新", "关注"];

export function DiscoverPage({ onPostClick, onPublishClick }: DiscoverPageProps) {
  const [activeTab, setActiveTab] = useState("推荐");

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="sticky top-0 z-40 glass-strong border-b-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" placeholder="搜索帖子、用户、话题..." className="w-full bg-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors" />
          </div>
          <button onClick={onPublishClick} className="ml-3 px-3 py-2 rounded-xl bg-teal-500 text-white text-xs font-medium flex items-center gap-1">
            <PenLine size={14} /> 发布
          </button>
        </div>
        <div className="flex gap-1 px-4 pb-3">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === tab ? "bg-teal-500/15 text-teal-400" : "text-white/40"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white/90 flex items-center gap-2"><Trophy size={16} className="text-amber-400" /> 爆护排行榜</h2>
          <button className="text-xs text-teal-400 flex items-center gap-0.5">查看全部 <ChevronRight size={12} /></button>
        </div>
        <div className="glass-card rounded-2xl p-3 space-y-2">
          {rankingUsers.slice(0, 5).map((user, i) => (
            <div key={user.id} className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-white/30"}`}>{i + 1}</span>
              <img src={user.avatar} alt={user.nickname} className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/80 truncate">{user.nickname}</p>
                <p className="text-[10px] text-white/30">获赞 {user.likes || 0} · 粉丝 {user.followers || 0}</p>
              </div>
              <button className="px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-400 text-[10px] font-medium">关注</button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white/90 flex items-center gap-2"><Flame size={16} className="text-red-400" /> 热门话题</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["#爆护日记", "#新手入门", "#饵料配方", "#钓具评测", "#选位技巧", "#夜钓经验"].map((topic) => (
            <button key={topic} className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 text-white/50 text-xs font-medium">{topic}</button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={onPostClick} showCategory />
        ))}
      </div>
    </div>
  );
}
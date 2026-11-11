import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/mock";
import type { Post } from "@/types";

interface DiscoverPageProps {
  onPostClick: (post: Post) => void;
}

const categories = ["全部", "钓点推荐", "钓鱼技巧", "渔获展示", "装备分享"];

export default function DiscoverPage({ onPostClick }: DiscoverPageProps) {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredPosts =
    activeCategory === "全部"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="px-4 pt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-[#142238] rounded-xl px-3 py-2.5">
          <Search size={16} className="text-white/30" />
          <input
            type="text"
            placeholder="搜索钓点、攻略、渔友..."
            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none flex-1"
          />
        </div>
        <button className="p-2.5 bg-[#142238] rounded-xl">
          <SlidersHorizontal size={18} className="text-white/50" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/20"
                : "bg-[#142238] text-white/50 border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={onPostClick} />
        ))}
      </div>
    </div>
  );
}

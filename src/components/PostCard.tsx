import { Heart, MessageCircle, Eye, Bookmark, Share2 } from "lucide-react";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
  showCategory?: boolean;
}

export function PostCard({ post, onClick, showCategory }: PostCardProps) {
  return (
    <div
      onClick={() => onClick(post)}
      className="glass-card rounded-2xl overflow-hidden active:scale-[0.985] transition-transform cursor-pointer"
    >
      <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
        <img
          src={post.author.avatar}
          alt={post.author.nickname}
          className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white/90 truncate">
              {post.author.nickname}
            </p>
            {showCategory && post.category && (
              <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-medium">
                {post.category}
              </span>
            )}
          </div>
          <p className="text-[11px] text-white/30">{post.createdAt}</p>
        </div>
        <button className="p-1.5 rounded-lg bg-white/5 text-white/30">
          <Share2 size={14} />
        </button>
      </div>

      <div className="px-4">
        <p className="text-sm text-white/75 leading-relaxed line-clamp-3">
          {post.content}
        </p>
      </div>

      {post.images.length > 0 && (
        <div className="px-4 mt-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {post.images.map((img, i) => (
              <div
                key={i}
                className="shrink-0 rounded-xl overflow-hidden bg-white/5"
                style={{
                  width: post.images.length === 1 ? "100%" : "200px",
                  height: "140px",
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 pb-3.5 mt-2.5">
        <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <Eye size={12} />
              {post.views}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <Heart size={12} />
              {post.likes}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <MessageCircle size={12} />
              {post.comments.length}
            </span>
          </div>
          <button className="flex items-center gap-1 text-[11px] text-white/20">
            <Bookmark size={12} />
            收藏
          </button>
        </div>
      </div>
    </div>
  );
}
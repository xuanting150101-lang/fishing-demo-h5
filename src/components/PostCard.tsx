import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div
      onClick={() => onClick(post)}
      className="bg-[#142238] rounded-xl overflow-hidden mb-3 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex p-3 gap-3">
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-white/90">
              {post.authorName}
            </span>
            <span className="text-[10px] text-white/30">{post.timeAgo}</span>
          </div>
          <p className="text-[13px] text-white/70 leading-relaxed line-clamp-2">
            {post.content}
          </p>
        </div>
      </div>
      {post.images && post.images.length > 0 && (
        <div className="px-3 pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="h-28 w-auto rounded-lg object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 px-3 pb-3">
        <button className="flex items-center gap-1 text-white/40 text-xs">
          <Heart size={14} />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1 text-white/40 text-xs">
          <MessageCircle size={14} />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-1 text-white/40 text-xs">
          <Share2 size={14} />
          <span>分享</span>
        </button>
      </div>
    </div>
  );
}

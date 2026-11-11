import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
  MapPin,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import type { Post, User, Spot } from "../types";
import { users } from "../data/mock";
import { FullScreenGallery } from "./FullScreenGallery";

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onUserClick: (user: User) => void;
  onSpotClick: (spot: Spot) => void;
  onShowGallery: (images: string[], startIndex: number) => void;
}

export function PostDetail({
  post,
  onBack,
  onUserClick,
  onSpotClick,
  onShowGallery,
}: PostDetailProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [showFullContent, setShowFullContent] = useState(false);
  const [replyTo, setReplyTo] = useState<{
    commentId: string;
    nickname: string;
  } | null>(null);

  const author = users.find((u) => u.id === post.authorId);
  const isLongContent = post.content.length > 120;

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    setCommentInput("");
    setReplyTo(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#030508]">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-base font-semibold text-white/90">帖子详情</span>
          <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Author */}
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer"
          onClick={() => author && onUserClick(author)}
        >
          <img
            src={author?.avatar}
            alt={author?.nickname}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
          />
          <div>
            <p className="text-sm font-semibold text-white/90">{author?.nickname}</p>
            <p className="text-xs text-white/30">{post.createdAt}</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
            {isLongContent && !showFullContent
              ? post.content.slice(0, 120) + "..."
              : post.content}
          </p>
          {isLongContent && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-xs text-teal-400 mt-1 flex items-center gap-0.5"
            >
              {showFullContent ? "收起" : "展开全文"}
              <ChevronDown
                size={12}
                className={`transition-transform ${showFullContent ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        {/* Images */}
        {post.images.length > 0 && (
          <div className={`px-4 pb-3 ${post.images.length === 1 ? "" : "grid grid-cols-2 gap-1.5"}`}>
            {post.images.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl cursor-pointer ${
                  post.images.length === 1 ? "aspect-video" : "aspect-square"
                }`}
                onClick={() => onShowGallery(post.images, i)}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-sm"
            >
              <Heart
                size={18}
                className={liked ? "fill-red-400 text-red-400" : "text-white/40"}
              />
              <span className={liked ? "text-red-400" : "text-white/40"}>
                {post.likes + (liked ? 1 : 0)}
              </span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-white/40">
              <MessageCircle size={18} />
              <span>{post.comments.length}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-white/40">
              <Share2 size={18} />
            </button>
          </div>
          <button onClick={handleBookmark}>
            <Bookmark
              size={18}
              className={bookmarked ? "fill-amber-400 text-amber-400" : "text-white/40"}
            />
          </button>
        </div>

        {/* Comments */}
        <div className="px-4 py-3">
          <h3 className="text-sm font-semibold text-white/80 mb-3">
            评论 ({post.comments.length})
          </h3>
          <div className="space-y-4">
            {post.comments.map((comment) => {
              const commentAuthor = users.find((u) => u.id === comment.authorId);
              return (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={commentAuthor?.avatar}
                    alt={commentAuthor?.nickname}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/70">
                        {commentAuthor?.nickname}
                      </span>
                      <span className="text-xs text-white/20">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-white/50 mt-0.5 leading-relaxed">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button className="flex items-center gap-1 text-xs text-white/30">
                        <Heart size={12} />
                        {comment.likes}
                      </button>
                      <button
                        onClick={() =>
                          setReplyTo({
                            commentId: comment.id,
                            nickname: commentAuthor?.nickname || "",
                          })
                        }
                        className="text-xs text-white/30"
                      >
                        回复
                      </button>
                    </div>

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-2 space-y-2 pl-3 border-l border-white/5">
                        {comment.replies.map((reply) => {
                          const replyAuthor = users.find((u) => u.id === reply.authorId);
                          return (
                            <div key={reply.id} className="flex gap-2">
                              <img
                                src={replyAuthor?.avatar}
                                alt={replyAuthor?.nickname}
                                className="w-6 h-6 rounded-full object-cover shrink-0"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-medium text-white/60">
                                    {replyAuthor?.nickname}
                                  </span>
                                  <span className="text-[10px] text-white/20">
                                    {reply.createdAt}
                                  </span>
                                </div>
                                <p className="text-xs text-white/40 mt-0.5">
                                  {reply.content}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="shrink-0 border-t border-white/5 bg-[#030508]/95 backdrop-blur-xl">
        {replyTo && (
          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5">
            <span className="text-xs text-teal-400">回复 @{replyTo.nickname}</span>
            <button onClick={() => setReplyTo(null)} className="text-xs text-white/30">
              取消
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 px-4 py-3">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
            placeholder={replyTo ? `回复 @${replyTo.nickname}...` : "写评论..."}
            className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors"
          />
          <button
            onClick={handleCommentSubmit}
            disabled={!commentInput.trim()}
            className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white disabled:opacity-30 active:scale-90 transition-transform"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

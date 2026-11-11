import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  Phone,
  MessageCircle,
  Bookmark,
  Clock,
  MapPin,
  Users,
  Fish,
  Check,
  Calendar,
  X,
  Heart,
  Send,
  ImagePlus,
  ChevronDown,
  ChevronUp,
  Navigation,
} from "lucide-react";
import type { Spot, Comment, Reply } from "../types";
import { users } from "../data/mock";
import { FullScreenGallery } from "./FullScreenGallery";
import { useToast } from "./Toast";

interface SpotDetailProps {
  spot: Spot;
  onBack: () => void;
}

function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  if (msg.includes("价格") || msg.includes("多少钱") || msg.includes("收费")) {
    return "我们的收费标准如下：\n\n- 白天场（6:00-18:00）：200元/4小时\n- 夜场（18:00-次日6:00）：300元/6小时\n- 自带装备减20元\n- 女士及儿童半价\n\n需要我帮您预约吗？";
  }
  if (msg.includes("鱼") || msg.includes("有什么鱼")) {
    return "目前塘内有：\n\n- 鲫鱼（密度最高，新手推荐）\n- 草鱼（个体3-8斤）\n- 鲤鱼（近期开口不错）\n- 罗非（全天有口）\n\n最近一周鱼口情况：上午9-11点、下午4-6点是最佳上鱼时段。";
  }
  if (msg.includes("预约") || msg.includes("订位")) {
    return "预约方式很简单：\n\n1. 点击下方【预约】按钮\n2. 选择日期和时段\n3. 确认后支付定金（50元，到场退还）\n\n周末建议提前2-3天预约，工作日当天预约即可。";
  }
  if (msg.includes("装备") || msg.includes("渔具") || msg.includes("自带")) {
    return "装备政策：\n\n- 可自带鱼竿、鱼线、浮漂等\n- 塘内提供钓椅、遮阳伞（免费）\n- 饵料建议自带，塘内也有售（价格稍高）\n- 限竿长度：手竿不超过7.2米\n\n新手也不用担心，我们有装备租赁服务。";
  }
  if (msg.includes("位置") || msg.includes("地址") || msg.includes("怎么去")) {
    return "地址：" + "（具体地址请查看钓点详情页地图）" + "\n\n导航建议：\n- 自驾：导航搜索钓点名，塘内有停车场\n- 公交：附近有公交站，步行约10分钟\n- 打车：直接定位到钓点大门\n\n需要我为您打开地图导航吗？";
  }
  return "感谢您的咨询！我是该钓点的客服助手，可以为您解答关于价格、鱼情、预约、装备等方面的问题。\n\n请问还有什么可以帮您的吗？";
}

function ReplyList({
  replies,
  onLike,
}: {
  replies: Reply[];
  onLike: (replyId: string) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (replies.length === 0) return null;

  const displayReplies = showAll ? replies : replies.slice(0, 3);

  return (
    <div className="mt-2 space-y-2 pl-3 border-l border-white/5">
      {displayReplies.map((reply) => {
        const replyAuthor = users.find((u) => u.id === reply.authorId);
        return (
          <div key={reply.id} className="flex gap-2">
            <img
              src={replyAuthor?.avatar || ""}
              alt={replyAuthor?.nickname || ""}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-white/60">
                  {replyAuthor?.nickname}
                </span>
                <span className="text-[10px] text-white/20">
                  {reply.createdAt}
                </span>
              </div>
              <p className="text-[13px] text-white/50 mt-0.5 leading-relaxed">
                {reply.content}
              </p>
              <button
                onClick={() => {
                  setLiked(!liked);
                  onLike(reply.id);
                }}
                className="flex items-center gap-1 mt-1 text-[11px] text-white/20"
              >
                <Heart
                  size={10}
                  className={liked ? "fill-red-400 text-red-400" : ""}
                />
                {reply.likes}
              </button>
            </div>
          </div>
        );
      })}
      {replies.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-teal-400/60 hover:text-teal-400 transition-colors"
        >
          查看 {replies.length - 3} 条回复
        </button>
      )}
    </div>
  );
}

export function SpotDetail({ spot, onBack }: SpotDetailProps) {
  const { showToast } = useToast();
  const [activeImage, setActiveImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{
    commentId: string;
    nickname: string;
  } | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [serviceMessages, setServiceMessages] = useState<
    { type: "user" | "service"; content: string }[]
  >([
    {
      type: "service",
      content: `您好！欢迎咨询「${spot.name}」。我可以帮您了解价格、鱼情、预约等信息，请问有什么可以帮您的？`,
    },
  ]);
  const [serviceInput, setServiceInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const serviceScrollRef = useRef<HTMLDivElement>(null);

  const comments = spot.comments || [];

  useEffect(() => {
    if (serviceScrollRef.current) {
      serviceScrollRef.current.scrollTop =
        serviceScrollRef.current.scrollHeight;
    }
  }, [serviceMessages]);

  const handleSubmitComment = () => {
    if (!commentInput.trim()) return;
    console.log(
      replyingTo
        ? `回复 @${replyingTo.nickname}: ${commentInput}`
        : `发表评论: ${commentInput}`
    );
    setReplyingTo(null);
    setCommentInput("");
    showToast(replyingTo ? "回复发布成功" : "评论发布成功", "success");
  };

  const openNavigation = (type: "amap" | "baidu") => {
    if (!spot.lat || !spot.lng) {
      showToast("该钓点暂无位置信息", "error");
      return;
    }
    const name = encodeURIComponent(spot.name);
    const url =
      type === "amap"
        ? `https://uri.amap.com/marker?position=${spot.lng},${spot.lat}&name=${name}&src=youkou`
        : `https://api.map.baidu.com/marker?location=${spot.lat},${spot.lng}&title=${name}&content=${name}&output=html&src=youkou`;
    window.open(url, "_blank");
    setShowNavMenu(false);
    showToast(type === "amap" ? "正在打开高德地图..." : "正在打开百度地图...", "info");
  };

  const handleServiceSend = () => {
    if (!serviceInput.trim()) return;
    const userMsg = serviceInput.trim();
    setServiceMessages((prev) => [...prev, { type: "user", content: userMsg }]);
    setServiceInput("");

    setTimeout(() => {
      const aiResponse = getAIResponse(userMsg);
      setServiceMessages((prev) => [
        ...prev,
        { type: "service", content: aiResponse },
      ]);
    }, 800 + Math.random() * 1200);
  };

  const handleImageSelect = () => {
    setSelectedImage(
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#030508]">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b-0">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-base font-semibold text-white/90 truncate max-w-[200px]">
            {spot.name}
          </span>
          <button
            onClick={() => {
              setLiked(!liked);
              showToast(liked ? "已取消收藏" : "收藏成功", liked ? "info" : "success");
            }}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Bookmark size={18} className={liked ? "text-amber-400 fill-amber-400" : "text-white/70"} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Image Gallery */}
        <div className="relative">
          <div
            className="aspect-[16/10] bg-white/5 cursor-pointer"
            onClick={() => setShowGallery(true)}
          >
            <img
              src={spot.images[activeImage]}
              alt={spot.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {spot.images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveImage(i);
                  showToast(`已切换至图片 ${i + 1}`, "info");
                }}
                className={`h-1 rounded-full transition-all ${
                  i === activeImage
                    ? "w-6 bg-teal-400"
                    : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          {spot.images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveImage(i);
                showToast(`已切换至图片 ${i + 1}`, "info");
              }}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all ${
                i === activeImage
                  ? "ring-2 ring-teal-400"
                  : "opacity-60"
              }`}
            >
              <img
                src={img}
                alt={`${spot.name} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="px-4 pt-2 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white/90">{spot.name}</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin size={12} className="text-white/30" />
                <span className="text-xs text-white/40">{spot.address}</span>
                <button
                  onClick={() => {
                    setShowNavMenu(!showNavMenu);
                    showToast("请选择导航方式", "info");
                  }}
                  className="ml-1.5 px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 text-[10px] font-medium flex items-center gap-0.5 active:scale-90 transition-transform"
                >
                  <Navigation size={10} /> 导航
                </button>
                {showNavMenu && (
                  <div className="absolute left-4 right-4 mt-6 z-30 glass rounded-xl p-2 space-y-1 shadow-lg shadow-black/30">
                    <button
                      onClick={() => openNavigation("amap")}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <MapPin size={14} className="text-blue-400" />
                      </div>
                      <span className="text-sm text-white/80">高德地图</span>
                    </button>
                    <button
                      onClick={() => openNavigation("baidu")}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <MapPin size={14} className="text-indigo-400" />
                      </div>
                      <span className="text-sm text-white/80">百度地图</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 ml-3">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-white/90">
                {spot.rating}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                spot.fishCondition === "爆护"
                  ? "bg-amber-500/15 text-amber-400"
                  : spot.fishCondition === "有口"
                  ? "bg-teal-500/15 text-teal-400"
                  : "bg-white/5 text-white/40"
              }`}
            >
              {spot.fishCondition}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40 font-medium">
              {spot.distance}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                spot.crowd === "少"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : spot.crowd === "适中"
                  ? "bg-sky-500/15 text-sky-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              人数{spot.crowd}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            {spot.bookingSlots && spot.bookingSlots.length > 0 && (
              <button
                onClick={() => {
                  setShowBooking(true);
                  showToast("正在打开预约...", "info");
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-medium flex items-center justify-center gap-1.5 active:scale-[0.985] transition-transform"
              >
                <Calendar size={16} />
                预约
              </button>
            )}
            <button
              onClick={() => {
                setShowPhone(true);
                showToast("正在打开电话...", "info");
              }}
              className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/80 text-sm font-medium flex items-center justify-center gap-1.5 active:scale-[0.985] transition-transform"
            >
              <Phone size={16} />
              电话
            </button>
            <button
              onClick={() => {
                setShowService(true);
                showToast("正在连接客服...", "info");
              }}
              className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/80 text-sm font-medium flex items-center justify-center gap-1.5 active:scale-[0.985] transition-transform"
            >
              <MessageCircle size={16} />
              客服
            </button>
          </div>

          {/* Details */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Clock size={15} className="text-white/40" />
              </div>
              <div>
                <p className="text-sm text-white/60">营业时间</p>
                <p className="text-sm text-white/90 font-medium">
                  {spot.hours}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <DollarSign size={15} className="text-white/40" />
              </div>
              <div>
                <p className="text-sm text-white/60">参考价格</p>
                <p className="text-sm text-amber-400 font-medium">
                  {spot.price}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Fish size={15} className="text-white/40" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/60">目标鱼种</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {spot.fishTypes.map((type) => (
                    <span
                      key={type}
                      className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Users size={15} className="text-white/40" />
              </div>
              <div>
                <p className="text-sm text-white/60">装备政策</p>
                <p className="text-sm text-white/80">
                  {spot.bringOwn.gear
                    ? "可自带装备"
                    : "塘内提供装备"}
                  {spot.bringOwn.bait
                    ? " · 可自带饵料"
                    : " · 塘内提供饵料"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-white/80 mb-2">
              钓点介绍
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              {spot.description}
            </p>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white/80">
                钓友评价 ({comments.length})
              </h3>
            </div>
            <div className="space-y-4">
              {comments.map((comment) => {
                const author = users.find((u) => u.id === comment.authorId);
                return (
                  <div
                    key={comment.id}
                    className="pb-4 border-b border-white/5 last:border-0"
                  >
                    <div className="flex gap-3">
                      <img
                        src={author?.avatar || ""}
                        alt={author?.nickname || ""}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white/70">
                            {author?.nickname}
                          </span>
                          <span className="text-xs text-white/20">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="text-sm text-white/50 mt-1 leading-relaxed">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <button
                            onClick={() => {
                              setLiked(!liked);
                              showToast(liked ? "已取消点赞" : "点赞成功", "success");
                            }}
                            className="flex items-center gap-1 text-xs text-white/30"
                          >
                            <Heart
                              size={12}
                              className={liked ? "fill-red-400 text-red-400" : ""}
                            />
                            {comment.likes}
                          </button>
                          <button
                            onClick={() =>
                              setReplyingTo({
                                commentId: comment.id,
                                nickname: author?.nickname || "",
                              })
                            }
                            className="text-xs text-white/30"
                          >
                            回复
                          </button>
                        </div>
                        <ReplyList
                          replies={comment.replies}
                          onLike={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="shrink-0 border-t border-white/5 bg-[#030508]/95 backdrop-blur-xl">
        {replyingTo && (
          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5">
            <span className="text-xs text-teal-400">
              回复 @{replyingTo.nickname}
            </span>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-xs text-white/30"
            >
              取消
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 px-4 py-3">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
            placeholder={
              replyingTo ? `回复 @${replyingTo.nickname}...` : "写评价..."
            }
            className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors"
          />
          <button
            onClick={handleSubmitComment}
            disabled={!commentInput.trim()}
            className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white disabled:opacity-30 active:scale-90 transition-transform"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end">
          <div className="w-full bg-[#0a0c10] rounded-t-3xl max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 shrink-0">
              <h3 className="text-base font-semibold text-white/90">预约时段</h3>
              <button
                onClick={() => setShowBooking(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
              >
                <X size={16} className="text-white/50" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {spot.bookingSlots?.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  onClick={() => {
                    if (slot.available) {
                      setShowBooking(false);
                      showToast(`已选择 ${slot.date} ${slot.timeRange}`, "success");
                    }
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                    slot.available
                      ? "border-teal-500/30 bg-teal-500/5 active:bg-teal-500/10"
                      : "border-white/5 bg-white/[0.02] opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        slot.available ? "bg-teal-400" : "bg-white/20"
                      }`}
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-white/80">
                        {slot.date} {slot.timeRange}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5">
                        {slot.available ? "可预约" : "已约满"}
                      </p>
                    </div>
                  </div>
                  {slot.available && (
                    <span className="text-xs text-teal-400 font-medium">
                      选择
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Phone Modal */}
      {showPhone && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end">
          <div className="w-full bg-[#0a0c10] rounded-t-3xl p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white/90">联系方式</h3>
              <button
                onClick={() => setShowPhone(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
              >
                <X size={16} className="text-white/50" />
              </button>
            </div>
            <a
              href={`tel:${spot.phone}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 active:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center">
                <Phone size={18} className="text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">拨打手机</p>
                <p className="text-sm text-teal-400">{spot.phone}</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Service Chat */}
      {showService && (
        <div className="absolute inset-0 z-50 bg-[#030508] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                <MessageCircle size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">
                  {spot.name}
                </p>
                <p className="text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400">在线中</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowService(false)}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
            >
              <X size={16} className="text-white/50" />
            </button>
          </div>

          <div
            ref={serviceScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {serviceMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.type === "user"
                      ? "bg-teal-500 text-white rounded-br-md"
                      : "bg-white/5 text-white/70 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 border-t border-white/5 p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleImageSelect}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/30 shrink-0"
              >
                <ImagePlus size={18} />
              </button>
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleServiceSend()}
                placeholder="输入消息..."
                className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors"
              />
              <button
                onClick={handleServiceSend}
                disabled={!serviceInput.trim()}
                className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white disabled:opacity-30 active:scale-90 transition-transform shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery */}
      {showGallery && (
        <FullScreenGallery
          images={spot.images}
          startIndex={activeImage}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}

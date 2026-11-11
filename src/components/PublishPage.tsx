import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Image,
  MapPin,
  X,
  ChevronRight,
  Check,
} from "lucide-react";
import { TECHNIQUE_CATEGORIES } from "../types";
import type { PostType } from "../types";

interface PublishPageProps {
  onBack: () => void;
  onPublish: (post: any) => void;
}

const MAX_IMAGES = 9;
const MAX_TITLE_LENGTH = 15;
const MAX_CONTENT_LENGTH = 500;

export function PublishPage({ onBack, onPublish }: PublishPageProps) {
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [postType, setPostType] = useState<PostType>("daily");
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [spotLocation, setSpotLocation] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleAddImage = () => {
    if (images.length >= MAX_IMAGES) return;
    // Simulate camera/album pick with random images
    const newImages = [
      `https://picsum.photos/seed/${Date.now()}/300/300`,
      `https://picsum.photos/seed/${Date.now() + 1}/300/300`,
      `https://picsum.photos/seed/${Date.now() + 2}/300/300`,
    ];
    const count = Math.min(3, MAX_IMAGES - images.length);
    setImages((prev) => [...prev, ...newImages.slice(0, count)]);
  };

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) return;
    onPublish({
      title,
      content,
      images,
      location: spotLocation,
      category: postType === "technique" ? category : undefined,
      postType,
    });
    onBack();
  };

  const isValid =
    title.trim().length > 0 &&
    title.trim().length <= MAX_TITLE_LENGTH &&
    content.trim().length > 0 &&
    content.trim().length <= MAX_CONTENT_LENGTH &&
    (postType === "daily" || category);

  if (step === "choose") {
    return (
      <div className="min-h-[100dvh] bg-[#030508] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-40 glass-strong border-b-0">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition-transform"
            >
              <ArrowLeft size={18} className="text-white/80" />
            </button>
            <span className="text-base font-semibold text-white/90">发布</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <h2 className="text-lg font-semibold text-white/60 mb-2">选择发布类型</h2>
          
          <button
            onClick={() => {
              setPostType("daily");
              setStep("form");
            }}
            className="w-full glass-card rounded-2xl p-6 flex items-center gap-4 active:scale-[0.985] transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-500/15 flex items-center justify-center">
              <Camera size={28} className="text-teal-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-base font-semibold text-white/90">发日常</h3>
              <p className="text-xs text-white/40 mt-1">分享你的钓鱼日常和收获</p>
            </div>
            <ChevronRight size={20} className="text-white/20" />
          </button>

          <button
            onClick={() => {
              setPostType("technique");
              setStep("form");
            }}
            className="w-full glass-card rounded-2xl p-6 flex items-center gap-4 active:scale-[0.985] transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 flex items-center justify-center">
              <Image size={28} className="text-amber-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-base font-semibold text-white/90">分享技巧</h3>
              <p className="text-xs text-white/40 mt-1">传授你的独门钓技和经验</p>
            </div>
            <ChevronRight size={20} className="text-white/20" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#030508] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("choose")}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition-transform"
            >
              <ArrowLeft size={18} className="text-white/80" />
            </button>
            <span className="text-base font-semibold text-white/90">
              {postType === "daily" ? "发日常" : "分享技巧"}
            </span>
          </div>
          <button
            onClick={handlePublish}
            disabled={!isValid}
            className="px-4 py-1.5 rounded-full bg-teal-500 text-white text-sm font-medium disabled:opacity-30 disabled:bg-teal-500/50 transition-opacity"
          >
            发布
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
        {/* 技巧类型 */}
        {postType === "technique" && (
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">选择类型</label>
            <button
              onClick={() => setShowCategoryPicker(true)}
              className="w-full glass rounded-xl px-4 py-3 flex items-center justify-between text-sm text-white/80"
            >
              <span>{category || "请选择技巧类型"}</span>
              <ChevronRight size={16} className="text-white/30" />
            </button>
          </div>
        )}

        {/* 标题 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-white/40">标题</label>
            <span className={`text-[10px] ${title.length > MAX_TITLE_LENGTH ? "text-red-400" : "text-white/20"}`}>
              {title.length}/{MAX_TITLE_LENGTH}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="给你的帖子起个标题"
            maxLength={MAX_TITLE_LENGTH}
            className="w-full glass rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors"
          />
        </div>

        {/* 正文 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-white/40">正文</label>
            <span className={`text-[10px] ${content.length > MAX_CONTENT_LENGTH ? "text-red-400" : "text-white/20"}`}>
              {content.length}/{MAX_CONTENT_LENGTH}
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的钓鱼故事..."
            maxLength={MAX_CONTENT_LENGTH}
            rows={6}
            className="w-full glass rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/30 outline-none border border-white/5 focus:border-teal-500/40 transition-colors resize-none"
          />
        </div>

        {/* 标记地点 */}
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">标记地点</label>
          <button
            onClick={() => setSpotLocation("松山湖垂钓中心")}
            className="w-full glass rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-white/60"
          >
            <MapPin size={16} className="text-teal-400/60" />
            <span>{spotLocation || "添加地点"}</span>
          </button>
        </div>

        {/* 图片上传 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/40">上传图片</label>
            <span className="text-[10px] text-white/20">{images.length}/{MAX_IMAGES}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/5">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
            {images.length < MAX_IMAGES && (
              <button
                onClick={handleAddImage}
                className="w-20 h-20 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-white/30 active:bg-white/5 transition-colors"
              >
                <Camera size={20} />
                <span className="text-[10px]">添加</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Picker Modal */}
      {showCategoryPicker && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex flex-col justify-end">
          <div className="glass-strong rounded-t-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-semibold text-white/90">选择技巧类型</span>
              <button
                onClick={() => setShowCategoryPicker(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
              >
                <X size={16} className="text-white/50" />
              </button>
            </div>
            <div className="space-y-1">
              {TECHNIQUE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setShowCategoryPicker(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                    category === cat
                      ? "bg-teal-500/15 text-teal-400"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  <span>{cat}</span>
                  {category === cat && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import {
  User,
  Settings,
  ChevronRight,
  Heart,
  Bookmark,
  FileText,
  Camera,
  LogOut,
  Edit3,
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface UserPageProps {
  onPublish: () => void;
}

export default function UserPage({ onPublish }: UserPageProps) {
  const { showToast } = useToast();
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
  );

  const menuItems = [
    { icon: Heart, label: "我的喜欢", count: 128, action: () => showToast("功能开发中", "info") },
    { icon: Bookmark, label: "我的收藏", count: 56, action: () => showToast("功能开发中", "info") },
    { icon: FileText, label: "我的发布", count: 12, action: () => showToast("功能开发中", "info") },
    { icon: Edit3, label: "编辑资料", count: null, action: () => showToast("功能开发中", "info") },
    { icon: Settings, label: "设置", count: null, action: () => showToast("功能开发中", "info") },
  ];

  const handleAvatarClick = () => {
    showToast("更换头像功能开发中", "info");
  };

  const handlePublish = () => {
    onPublish();
  };

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={handleAvatarClick} className="relative">
          <img
            src={avatar}
            alt="头像"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Camera size={12} className="text-white" />
          </div>
        </button>
        <div>
          <h2 className="text-lg font-semibold text-white">钓鱼佬</h2>
          <p className="text-sm text-white/50">ID: 888888</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "关注", value: 256 },
          { label: "粉丝", value: 1.2 },
          { label: "获赞", value: 3.8 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#142238] rounded-xl p-3 text-center"
          >
            <p className="text-base font-semibold text-white">{stat.value}K</p>
            <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handlePublish}
        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl py-3 mb-6 flex items-center justify-center gap-2 text-white font-medium text-sm"
      >
        <Edit3 size={16} />
        发布动态
      </button>

      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center justify-between bg-[#142238] rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-white/50" />
                <span className="text-sm text-white/80">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count !== null && (
                  <span className="text-xs text-white/30">{item.count}</span>
                )}
                <ChevronRight size={16} className="text-white/20" />
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => showToast("已退出登录", "info")}
        className="w-full flex items-center justify-center gap-2 bg-[#142238] rounded-xl px-4 py-3 mt-6 text-red-400 text-sm"
      >
        <LogOut size={16} />
        退出登录
      </button>
    </div>
  );
}

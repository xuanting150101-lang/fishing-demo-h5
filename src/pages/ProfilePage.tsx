import { User, Settings, ChevronRight, Heart, Bookmark, FileText } from "lucide-react";

export default function ProfilePage() {
  const menuItems = [
    { icon: Heart, label: "我的喜欢", count: 128 },
    { icon: Bookmark, label: "我的收藏", count: 56 },
    { icon: FileText, label: "我的发布", count: 12 },
    { icon: Settings, label: "设置", count: null },
  ];

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
          <User size={28} className="text-white" />
        </div>
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

      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
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
    </div>
  );
}

import { Compass, MapPin, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: "discover" | "spots" | "saved" | "profile";
  onNavigate: (tab: "discover" | "spots" | "saved" | "profile") => void;
}

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const tabs = [
    { key: "discover" as const, label: "发现", icon: Compass },
    { key: "spots" as const, label: "钓点", icon: MapPin },
    { key: "saved" as const, label: "收藏", icon: Bookmark },
    { key: "profile" as const, label: "我的", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] bg-[#0B1628]/95 backdrop-blur-md border-t border-white/5 px-6 py-2 flex justify-between items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className="flex flex-col items-center gap-0.5 py-1 px-3"
            >
              <Icon
                size={22}
                className={cn(
                  "transition-colors",
                  isActive ? "text-teal-400" : "text-white/40"
                )}
              />
              <span
                className={cn(
                  "text-[10px] transition-colors",
                  isActive ? "text-teal-400 font-medium" : "text-white/40"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

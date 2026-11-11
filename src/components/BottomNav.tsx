import { Home, MapPin, Compass, User } from "lucide-react";

interface BottomNavProps {
  active: "home" | "spots" | "discover" | "profile";
  onChange: (tab: "home" | "spots" | "discover" | "profile") => void;
}

const tabs = [
  { key: "home" as const, label: "首页", icon: Home },
  { key: "spots" as const, label: "钓点", icon: MapPin },
  { key: "discover" as const, label: "发现", icon: Compass },
  { key: "profile" as const, label: "我的", icon: User },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="max-w-md mx-auto glass-strong border-t border-white/5">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = active === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className="flex flex-col items-center gap-0.5 px-4 py-1.5 min-w-[64px] transition-all duration-200"
              >
                <div
                  className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                    isActive ? "bg-teal-500/15" : "bg-transparent"
                  }`}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-teal-400" : "text-white/35"
                    }`}
                  />
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? "text-teal-400" : "text-white/35"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
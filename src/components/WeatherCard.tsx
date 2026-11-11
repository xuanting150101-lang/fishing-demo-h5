import { Cloud, Droplets, Wind, Sun } from "lucide-react";

interface WeatherCardProps {
  temp: number;
  condition: string;
  humidity: number;
  wind: string;
}

export function WeatherCard({ temp, condition, humidity, wind }: WeatherCardProps) {
  const getIcon = () => {
    switch (condition) {
      case "晴":
        return <Sun size={20} className="text-amber-400" />;
      case "多云":
        return <Cloud size={20} className="text-sky-400" />;
      case "雨":
        return <Droplets size={20} className="text-blue-400" />;
      default:
        return <Sun size={20} className="text-amber-400" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <p className="text-2xl font-bold text-white/90">{temp}°C</p>
            <p className="text-xs text-white/40">{condition}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <Droplets size={14} className="text-sky-400 mx-auto mb-1" />
            <p className="text-[10px] text-white/40">湿度</p>
            <p className="text-xs font-medium text-white/70">{humidity}%</p>
          </div>
          <div className="text-center">
            <Wind size={14} className="text-teal-400 mx-auto mb-1" />
            <p className="text-[10px] text-white/40">风力</p>
            <p className="text-xs font-medium text-white/70">{wind}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

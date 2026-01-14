import React from "react";
import { BarChart3, Zap, Code2 } from "lucide-react";

const StatsSection = ({ heroData }) => {
  // Difficulty Logic
  const getDifficultyStats = () => {
    const levels = heroData?.levelsRepo || {
      HardLevelCount: 0,
      MediumLevelCount: 0,
      EasyLevelCount: 0,
    };
    const total =
      levels.HardLevelCount + levels.MediumLevelCount + levels.EasyLevelCount ||
      1;
    return [
      {
        level: "Hard",
        color: "bg-red-500",
        glow: "shadow-red-500/50",
        percentage: `${(levels.HardLevelCount / total) * 100}%`,
        count: levels.HardLevelCount,
      },
      {
        level: "Medium",
        color: "bg-yellow-500",
        glow: "shadow-yellow-500/50",
        percentage: `${(levels.MediumLevelCount / total) * 100}%`,
        count: levels.MediumLevelCount,
      },
      {
        level: "Easy",
        color: "bg-green-500",
        glow: "shadow-green-500/50",
        percentage: `${(levels.EasyLevelCount / total) * 100}%`,
        count: levels.EasyLevelCount,
      },
    ];
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Feature Blocks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-900/10 to-transparent border border-orange-500/20 rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-200">Spaced Repetition</h3>
            <p className="text-xs text-gray-500 mt-1">Algorithm enabled</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
            <Code2 size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-200">Code-Only Mode</h3>
            <p className="text-xs text-gray-500 mt-1">Focus on Syntax</p>
          </div>
        </div>
      </section>

      {/* Difficulty Stats */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-6 text-orange-400">
          <BarChart3 size={20} />
          <h2 className="font-semibold text-sm uppercase">
            Difficulty Breakdown
          </h2>
        </div>
        <div className="space-y-6">
          {getDifficultyStats().map((item) => (
            <div key={item.level} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {item.level}
                </span>
                <span className="text-sm font-bold text-white">
                  {item.count}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} ${item.glow} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                  style={{ width: item.percentage }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StatsSection;

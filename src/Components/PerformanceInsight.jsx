import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Zap, BookOpen, Clock, Target } from "lucide-react";

const stats = [
  {
    title: "Faster Completion",
    subtitle: "CSS Mastery",
    value: "3 days",
    icon: Zap,
    bg: "bg-amber-50",
    color: "text-amber-500",
  },
  {
    title: "Most Studied",
    subtitle: "Web Development",
    value: "68 hours",
    icon: BookOpen,
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  {
    title: "Longest Session",
    subtitle: "Dec 24, 2025",
    value: "6.5 hours",
    icon: Clock,
    bg: "bg-emerald-50",
    color: "text-emerald-500",
  },
  {
    title: "Goal Progress",
    subtitle: "8 / 10 Completed",
    value: "On Track",
    icon: Target,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
];

const PerformanceInsights = () => {
  return (
    <Card className="w-full rounded-3xl border border-gray-100 bg-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Performance Insights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-all"
              >
                <div
                  className={`p-3 rounded-xl ${item.bg} ${item.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.subtitle}
                  </p>
                  <p className={`text-sm font-bold ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceInsights;

import { ReactNode } from "react";

interface TimelineItemProps {
  children: ReactNode;
  side?: "left" | "right";
}

const TimelineItem = ({ children, side = "right" }: TimelineItemProps) => {
  return (
    <div className={`flex gap-6 mb-12 ${side === "left" ? "flex-row-reverse" : ""}`}>
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-gradient-timeline shadow-glow animate-glow-pulse"></div>
        <div className="w-0.5 h-full bg-gradient-timeline opacity-50"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {children}
      </div>
    </div>
  );
};

interface TimelineProps {
  children: ReactNode;
}

const Timeline = ({ children }: TimelineProps) => {
  return (
    <div className="relative">
      {children}
    </div>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;

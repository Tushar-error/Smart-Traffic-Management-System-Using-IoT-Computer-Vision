import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { LaneData } from "../types/index";
import { SignalLight } from "./SignalLight";

interface Props {
  lane: number;
  data: LaneData;
  isGreen: boolean;
}

const congestionColor = {
  CLEAR: "#00FF94",
  LOW: "#00FF94",
  MEDIUM: "#FFD600",
  HIGH: "#FF3F00",
};

export const LaneCard = ({ lane, data, isGreen }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const prevCount = useRef(data.count);

  useEffect(() => {
    if (data.count !== prevCount.current) {
      gsap.fromTo(countRef.current,
        { scale: 1.3, color: "#00FF94" },
        { scale: 1, color: "#E8E8E8", duration: 0.4, ease: "back.out" }
      );
      prevCount.current = data.count;
    }
  }, [data.count]);

  useEffect(() => {
    if (isGreen) {
      gsap.to(cardRef.current, {
        borderColor: "rgba(0,255,148,0.6)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(cardRef.current, {
        borderColor: "rgba(34,34,34,1)",
        duration: 0.5,
      });
    }
  }, [isGreen]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl border p-6 transition-all duration-500"
      style={{
        background: "linear-gradient(135deg, #111111 0%, #0d0d0d 100%)",
        borderColor: isGreen ? "rgba(0,255,148,0.4)" : "#222",
        boxShadow: isGreen ? "0 0 40px rgba(0,255,148,0.1)" : "none",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-bebas text-4xl text-white tracking-wider">
            LANE {lane}
          </div>
          <div
            className="font-mono text-xs tracking-widest uppercase mt-1"
            style={{ color: congestionColor[data.congestion] }}
          >
            {data.congestion}
          </div>
        </div>
        <SignalLight signal={data.signal} />
      </div>

      <div className="mb-4">
        <div className="font-mono text-xs text-muted uppercase tracking-widest mb-1">
          Vehicles
        </div>
        <div ref={countRef} className="font-bebas text-7xl text-white leading-none">
          {data.count}
        </div>
      </div>

      <div className="mb-4">
        <div className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          Congestion
        </div>
        <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((data.count / 15) * 100, 100)}%`,
              background: congestionColor[data.congestion],
              boxShadow: `0 0 8px ${congestionColor[data.congestion]}`,
            }}
          />
        </div>
      </div>

      {isGreen && (
        <div className="font-mono text-xs text-green tracking-widest">
          ⏱ GREEN FOR {data.duration}s
        </div>
      )}

      {isGreen && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green animate-pulse-green" />
      )}
    </div>
  );
};
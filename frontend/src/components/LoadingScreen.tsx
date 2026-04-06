import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const fragmentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      barsRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.inOut",
      }
    )
    .fromTo(
      textRef.current,
      { opacity: 0, letterSpacing: "0.5em" },
      { opacity: 1, letterSpacing: "0.15em", duration: 0.5 },
      "-=0.3"
    )
    .to({}, { duration: 0.6 })
    .to(barsRef.current, {
      y: (i) => (i % 2 === 0 ? -window.innerHeight : window.innerHeight),
      x: (i) => (i - 10) * 30,
      rotation: (i) => (i % 2 === 0 ? -15 : 15),
      duration: 0.7,
      stagger: 0.03,
      ease: "power3.in",
    })
    .to(
      textRef.current,
      { y: -100, opacity: 0, duration: 0.4, ease: "power2.in" },
      "-=0.5"
    )
    .to(fragmentsRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
    }, "-=0.2")
    .call(onComplete);
  }, []);

  const bars = Array.from({ length: 20 });
  const fragments = Array.from({ length: 12 });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-bg flex items-center justify-center overflow-hidden"
    >
      {fragments.map((_, i) => (
        <div
          key={`frag-${i}`}
          ref={(el) => { if (el) fragmentsRef.current[i] = el; }}
          className="absolute w-2 h-2 bg-green rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
          }}
        />
      ))}

      <div className="absolute inset-0 flex">
        {bars.map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) barsRef.current[i] = el; }}
            className="flex-1 h-full"
            style={{
              background: i % 3 === 0
                ? "rgba(0,255,148,0.15)"
                : i % 3 === 1
                ? "rgba(0,255,148,0.08)"
                : "rgba(0,255,148,0.04)",
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>

      <div ref={textRef} className="relative z-10 text-center">
        <div className="font-bebas text-8xl text-green tracking-widest animate-flicker">
          TRAFFIC
        </div>
        <div className="font-bebas text-8xl text-white tracking-widest">
          CONTROL
        </div>
        <div className="font-mono text-xs text-muted mt-4 tracking-widest uppercase">
          Initializing System...
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-green"
              style={{ animation: `pulse-green 1s ease-in-out ${i * 0.3}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
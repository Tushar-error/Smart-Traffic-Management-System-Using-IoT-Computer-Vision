interface Props {
  signal: "GREEN" | "RED" | "YELLOW";
}

export const SignalLight = ({ signal }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface border border-border">
      <div
        className={`w-8 h-8 rounded-full transition-all duration-500 ${
          signal === "RED"
            ? "bg-red animate-pulse-red"
            : "bg-surface2 opacity-20"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full transition-all duration-500 ${
          signal === "YELLOW"
            ? "bg-yellow glow-yellow"
            : "bg-surface2 opacity-20"
        }`}
        style={signal === "YELLOW" ? { boxShadow: "0 0 20px rgba(255,214,0,0.6)" } : {}}
      />
      <div
        className={`w-8 h-8 rounded-full transition-all duration-500 ${
          signal === "GREEN"
            ? "bg-green animate-pulse-green"
            : "bg-surface2 opacity-20"
        }`}
      />
    </div>
  );
};
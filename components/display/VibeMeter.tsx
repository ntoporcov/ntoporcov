import { cn } from "../../hooks/tailwind";

function getColor(value: number) {
  if (value <= 0.33) return "from-emerald-400 to-emerald-600";
  if (value <= 0.66) return "from-amber-400 to-orange-500";
  return "from-purple-400 to-pink-500";
}

function getEmoji(value: number) {
  if (value <= 0.33) return "🪚";
  if (value <= 0.66) return "🤝";
  return "✨";
}

const VibeMeter = ({ value }: { value: number }) => {
  const position = Math.max(0, Math.min(100, value * 100));
  const color = getColor(value);
  const emoji = getEmoji(value);

  return (
    <div className="flex w-full max-w-[200px] flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
          Vibe Meter
        </span>
        <span className="text-xs">
          {emoji}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
        {/* Fill */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
            color,
          )}
          style={{ width: `${Math.max(position, 8)}%` }}
        />

        {/* Indicator dot */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
          style={{ left: `${Math.max(position, 4)}%` }}
        >
          <div
            className={cn(
              "h-3.5 w-3.5 rounded-full border-2 border-white shadow-md bg-gradient-to-br",
              color,
            )}
          />
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between">
        <span
          className={cn(
            "text-[9px] font-semibold uppercase tracking-wide",
            value <= 0.33 ? "text-emerald-600" : "text-gray-300",
          )}
        >
          Handcrafted
        </span>
        <span
          className={cn(
            "text-[9px] font-semibold uppercase tracking-wide",
            value > 0.66 ? "text-purple-500" : "text-gray-300",
          )}
        >
          Vibes Only
        </span>
      </div>
    </div>
  );
};

export default VibeMeter;

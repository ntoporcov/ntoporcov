import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useBoolean } from "react-use";
import ToyContainer from "./ToyContainer";
import { cn } from "../../hooks/tailwind";

const LazyToy = dynamic(() => import("./Toy"));
const LazyPopIt = dynamic(() => import("./PopIt"));

type GameId = "pinart" | "popit";

const games: { id: GameId; label: string }[] = [
  { id: "pinart", label: "Pin Art" },
  { id: "popit", label: "Pop It" },
];

export default function ToysAndGames() {
  const [activeGame, setActiveGame] = useState<GameId>("pinart");
  const [fullScreen, setFullScreen] = useBoolean(false);

  return (
    <div className={"mt-10 w-full"}>
      {/* Toggle button group for switching toys */}
      <div
        className={cn(
          "mx-auto flex w-fit items-center gap-1 rounded-full border border-gray-300 bg-white/40 p-1 backdrop-blur",
          fullScreen && "hidden",
        )}
      >
        {games.map((game) => {
          const isActive = activeGame === game.id;
          return (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              aria-pressed={isActive}
              className={cn(
                "relative overflow-hidden rounded-full px-5 py-1.5 text-sm font-semibold uppercase tracking-wide transition-all",
                isActive
                  ? "bg-rainbow text-white shadow-md shadow-pink-500/20"
                  : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-800",
              )}
            >
              {/* Dim the rainbow a touch so the white label stays legible */}
              {isActive && (
                <span className={"absolute inset-0 bg-black/30"} aria-hidden />
              )}
              <span className={"relative"}>{game.label}</span>
            </button>
          );
        })}
      </div>

      <ToyContainer
        isFullScreen={fullScreen}
        onFullScreenChange={setFullScreen}
      >
        <Suspense fallback={<></>}>
          {activeGame === "pinart" && <LazyToy isFullScreen={fullScreen} />}
          {activeGame === "popit" && <LazyPopIt isFullScreen={fullScreen} />}
        </Suspense>
      </ToyContainer>
    </div>
  );
}

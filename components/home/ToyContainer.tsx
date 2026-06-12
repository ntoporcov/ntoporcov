import { ReactNode, useEffect } from "react";
import { cn } from "../../hooks/tailwind";
import { Button } from "../form/Button";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";

export type ToyContainerProps = {
  children: ReactNode;
  isFullScreen?: boolean;
  onFullScreenChange?: (isFullScreen: boolean) => void;
};

const ToyContainer = ({
  children,
  isFullScreen,
  onFullScreenChange,
}: ToyContainerProps) => {
  // Lock page scroll and flag fullscreen on the body (used to hide the navbar
  // on desktop). Kept in an effect so it stays in sync and cleans up on unmount.
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("toy-fullscreen");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("toy-fullscreen");
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("toy-fullscreen");
    };
  }, [isFullScreen]);

  return (
    <div className={"w-full"}>
      <div
        className={cn(
          "relative mx-auto w-full border border-gray-500 bg-gray-50",
          isFullScreen
            ? "fixed inset-0 z-30 h-screen w-full"
            : "mt-6 h-[60vh] md:h-[70vh] md:max-w-[90%] md:rounded-lg xl:max-w-[1200px]",
        )}
      >
        {[0, 1].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute top-0 -z-10 -mt-[3px] flex h-[calc(100%+6px)] w-full items-center justify-center overflow-hidden md:-ml-[3px] md:w-[calc(100%+6px)] md:rounded-lg",
              i ? "scale-[1.01] opacity-50 blur-2xl" : "",
              isFullScreen ? "hidden" : "",
            )}
          >
            <div
              className={"bg-rainbow min-h-[300%] min-w-[200%] animate-spin"}
              style={{
                animationDuration: "5s",
              }}
            />
          </div>
        ))}

        {/* Enter fullscreen - top-right corner, across from the toy's own
            Draw/Sound controls in the top-left. */}
        {!isFullScreen && (
          <Button
            size={"sm"}
            variant={"outline"}
            className={
              "absolute right-3 top-3 z-20 flex items-center gap-2 text-xs shadow-md"
            }
            onClick={() => onFullScreenChange(true)}
            aria-label={"Enter full screen"}
          >
            <RxEnterFullScreen />
            <span>Fullscreen</span>
          </Button>
        )}

        {/* Exit fullscreen - same top-right corner as the enter button. */}
        {isFullScreen && (
          <Button
            size={"sm"}
            variant={"outline"}
            className={
              "absolute right-3 top-3 z-20 flex items-center gap-2 text-xs shadow-md"
            }
            onClick={() => onFullScreenChange(false)}
            aria-label={"Exit full screen"}
          >
            <RxExitFullScreen />
            <span>Exit</span>
          </Button>
        )}

        {children}
      </div>
    </div>
  );
};

export default ToyContainer;

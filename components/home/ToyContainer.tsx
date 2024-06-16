import { ReactNode } from "react";
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
  return (
    <div className={"mt-10 w-full"}>
      <div className={"relative my-10 flex w-full justify-center"}>
        <Button
          size={"lg"}
          variant={"rainbow"}
          className={
            "right-2 top-2 flex gap-3 shadow-xl shadow-pink-500/50 md:hidden"
          }
          onClick={() => {
            onFullScreenChange(true);
            document.body.style.overflow = "hidden";
          }}
        >
          <RxEnterFullScreen />
          <span>Full Screen</span>
        </Button>
        {isFullScreen && (
          <Button
            size={"lg"}
            variant={"rainbow"}
            className={
              "fixed top-20 z-40 mx-auto gap-3 shadow-xl shadow-pink-500/50"
            }
            onClick={() => {
              onFullScreenChange(false);
              document.body.style.overflow = "auto";
            }}
          >
            <RxExitFullScreen />
            <span>Exit</span>
          </Button>
        )}
      </div>
      <div
        className={cn(
          "relative mx-auto w-full border border-gray-500 bg-gray-50 md:h-[70vh] md:max-w-[90%] md:rounded-lg xl:max-w-[1200px]",
          isFullScreen ? "fixed inset-0 z-30 h-screen w-full" : "h-[60vh]",
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
        {children}
      </div>
    </div>
  );
};

export default ToyContainer;

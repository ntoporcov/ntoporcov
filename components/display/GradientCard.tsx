import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { cn } from "../../hooks/tailwind";

export const GradientCard = ({
  children,
  parentClassName,
  contentClassName,
}: {
  children: ReactNode;
  parentClassName?: string;
  contentClassName?: string;
}) => {
  const [mousePosition, setMousePosition] = useState<{
    x?: number;
    y?: number;
  }>({});
  const boxRef = useRef<HTMLDivElement>(null);
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    setMousePosition(getRelativeCoordinates(e, boxRef.current!));
  };

  return (
    <div
      className={cn(
        "bg-blue-50/50 hover:bg-blue-100/50 transition-colors relative shadow-lg p-1 rounded-xl overflow-hidden w-full h-full",
        parentClassName
      )}
      ref={boxRef}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          ease: "linear",
          duration: 0,
        }}
        style={{
          background: "radial-gradient(rgb(var(--blue-400)),transparent 60%)",
          width: "200px",
          height: "200px",
          marginLeft: "-120px",
          marginTop: "0px",
          position: "absolute",
          // filter: "brightness(1.5)saturate(1.3)",
        }}
      />
      <div
        className={cn(
          "bg-transparent p-5 rounded-lg overflow-hidden w-full h-full z-10 backdrop-blur-2xl backdrop-brightness-50",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

function getRelativeCoordinates(
  event: MouseEvent,
  referenceElement: HTMLDivElement
) {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight,
  };

  let reference = referenceElement.offsetParent as HTMLDivElement;

  while (reference !== null) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent as HTMLDivElement;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top - 100,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 4) / (offset.width / 2),
    centerY:
      (position.y - offset.top - offset.height / 4) / (offset.height / 2),
  };
}

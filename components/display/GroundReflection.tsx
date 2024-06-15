import { cn } from "../../hooks/tailwind";

export type GroundReflectionProps = {
  className: string;
};

const GroundReflection = (props: GroundReflectionProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-full h-full w-full blur-lg transition-all",
        props.className,
      )}
      style={{
        transform:
          "perspective(110px) rotateX(39deg) scaleY(1.8) scaleX(1.5) translateY(-35px)",
      }}
    />
  );
};

export default GroundReflection;

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
          "perspective(110px) rotateX(45deg) scale(1.3) translateY(-20px)",
      }}
    />
  );
};

export default GroundReflection;

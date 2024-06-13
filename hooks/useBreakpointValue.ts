import { useWindowSize } from "react-use";

const tailwindBreakpoints = {
  640: "sm",
  768: "md",
  1024: "lg",
  1280: "xl",
  1536: "2xl",
};

export const useBreakpointValue = <T extends Record<string, any>>(
  values: T,
): T[keyof T] => {
  const { width } = useWindowSize();

  const breakpoints = Object.keys(tailwindBreakpoints)
    .map((bp) => parseInt(bp))
    .sort((a, b) => a - b);

  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i];
    if (width < breakpoint) {
      return values[tailwindBreakpoints[breakpoint]];
    }
  }

  return values[tailwindBreakpoints[breakpoints[breakpoints.length - 1]]];
};

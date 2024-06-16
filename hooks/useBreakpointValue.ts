import { useWindowSize } from "react-use";

const breakpointsList = ["base", "sm", "md", "lg", "xl", "2xl"] as const;
type BreakPoint = (typeof breakpointsList)[number];

const tailwindBreakpoints: Record<BreakPoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useBreakpointValue = <R, T = { [i in BreakPoint]?: R }>(
  values: T,
): R => {
  const { width } = useWindowSize(0, 0);

  const result = Object.entries(values)
    .sort(
      ([a], [b]) =>
        breakpointsList.indexOf(a as BreakPoint) -
        breakpointsList.indexOf(b as BreakPoint),
    )
    .reverse()
    .find(([key]) => {
      const breakpoint = key as BreakPoint;
      return width >= tailwindBreakpoints[breakpoint];
    });

  return result[1];
};

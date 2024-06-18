import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";

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
  const [value, setValue] = useState<R | undefined>();
  const { width } = useWindowSize(0, 0);

  useEffect(() => {
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

    setValue(result[1]);
  }, [values, width]);

  return value as R;
};

"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { CSSProperties, ReactNode, useMemo, useRef } from "react";
import { cn } from "../../hooks/tailwind";
import { useBoolean } from "react-use";

export type SegmentedControlProps = {
  value: string;
  options: { value: string; label: ReactNode }[];
  onChange: (value: string) => void;
  className?: string;
  itemClassName?: ({ active }: { active: boolean }) => string;
  indicatorClassName?: string;
};

export function SegmentedControl(props: SegmentedControlProps) {
  const [calculateInitial, setCalculateInitial] = useBoolean(false);
  const refs = useRef<Record<string, HTMLButtonElement>>({});

  const indicatorStyle = useMemo<CSSProperties>(() => {
    if (!calculateInitial) {
      return;
    }
    const activeRef = refs.current?.[props.value];

    if (!activeRef) return {};

    return {
      left: activeRef?.offsetLeft,
      width: activeRef?.offsetWidth,
    };
  }, [calculateInitial, props.value]);

  return (
    <RadioGroup.Root
      className={cn(
        "relative flex items-center gap-1 rounded border border-gray-300 px-1 py-2",
        props.className,
      )}
      value={props.value}
      onValueChange={props.onChange}
    >
      {props.options.map((option, index) => {
        return (
          <RadioGroup.Item
            value={option.value}
            key={index}
            ref={(ref) => {
              refs.current[option.value] = ref;
              if (
                Object.values(refs.current).length === props.options.length &&
                !calculateInitial
              ) {
                setCalculateInitial(true);
              }
            }}
            className={cn(
              "px-5",
              props.itemClassName?.({ active: props.value === option.value }),
            )}
          >
            {option.label}
          </RadioGroup.Item>
        );
      })}
      <div
        className={cn(
          "absolute left-0 -z-10 h-[80%] w-10 rounded-sm border border-gray-600 transition-all",
          props.indicatorClassName,
        )}
        style={{
          ...indicatorStyle,
        }}
      />
    </RadioGroup.Root>
  );
}

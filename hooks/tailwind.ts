import {twMerge} from "tailwind-merge";

export const cn = (...classes: (string | false | undefined)[]) =>
  twMerge(classes.filter(Boolean));

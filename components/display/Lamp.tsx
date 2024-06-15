import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Lamp = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const opacity = useTransform(scrollYProgress, [1, 0.5], [0.4, 1]);
  const width = useTransform(scrollYProgress, [1, 0.5], ["30%", "80%"]);
  const widthSpill = useTransform(scrollYProgress, [1, 0.5], ["30%", "90%"]);

  // const opacity = useMotionValue(interpolate([0, 1], [0.5, 1])(scrollYProgress))
  // const width = useMotionValue(interpolate([0, 1], ["0%", "80%"]))

  return (
    <div
      ref={ref}
      className="absolute -top-9 isolate -z-10 flex h-56 w-full flex-1 scale-y-125 items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{
          opacity,
          width,
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-blue-50 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
      >
        <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>
      <motion.div
        style={{
          opacity,
          width,
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-blue-50 text-white [--conic-position:from_290deg_at_center_top]"
      >
        <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
      </motion.div>
      <motion.div
        style={{
          opacity,
          width,
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className="absolute top-1/2 h-48 translate-y-12 scale-x-150 bg-background blur-2xl"
      ></motion.div>
      <motion.div
        style={{
          opacity,
          width: widthSpill,
        }}
        className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-blue-200 opacity-50 blur-3xl"
      ></motion.div>
      <motion.div
        style={{
          opacity,
          width: widthSpill,
        }}
        className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-blue-300 blur-2xl"
      ></motion.div>
      <motion.div
        style={{
          opacity,
          width,
        }}
        className="absolute inset-auto z-50 h-1 w-[30rem] -translate-y-[7rem] bg-cyan-400"
      ></motion.div>
    </div>
  );
};

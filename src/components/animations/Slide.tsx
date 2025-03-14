import React from "react";

import { motion, MotionConfig, AnimatePresence } from "motion/react";

type Props = {
  motionKey: string;
  direction: "right" | "left";
} & Readonly<React.PropsWithChildren>;

export default function Slide({ motionKey, direction, children }: Props) {
  return (
    <MotionConfig
      transition={{
        duration: 0.3,
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={motionKey}
          className="w-full h-full"
          custom={direction}
          variants={{
            enter: (dir) => ({
              x: dir === "left" ? 1000 : -1000,
              opacity: 0,
            }),
            center: {
              x: 0,
              opacity: 1,
            },
            leave: (dir) => ({
              x: dir === "left" ? -1000 : 1000,
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="leave"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

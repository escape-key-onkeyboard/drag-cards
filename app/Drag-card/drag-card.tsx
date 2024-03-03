"use client";
import { cn } from "@/lib/utils";
import { useMergedRef, useResizeObserver } from "@mantine/hooks";
import { samples } from "culori";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef, useEffect, useRef } from "react";

const GAP = 16;
const NUMBER_OF_CARDS = 4;

export const DragCardContainer = () => {
  const [containerRef, containerRect] = useResizeObserver();

  const cardHeightRef = useRef<number | undefined>();

  useEffect(() => {
    cardHeightRef.current =
      (containerRect.height + GAP) / NUMBER_OF_CARDS - GAP;
  }, [containerRect]);

  return (
    <div
      className={
        "w-96 h-[32rem] bg-gray-900 relative p-2 rounded-[2.5rem] shadow-[0_0_0_2px_rgb(31_41_55_/_var(--tw-bg-opacity))]"
      }
    >
      <div
        ref={containerRef}
        className="w-full relative h-full"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: GAP,
        }}
      >
        {samples(NUMBER_OF_CARDS).map((value, index, array) => {
          return (
            <DragCard
              key={index + value}
              style={{
                position: "absolute",
                height: cardHeightRef.current,
                y: index * GAP,
                scale: (index - NUMBER_OF_CARDS) * 0.05 + 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const DragCard = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & {}>(
  ({ className, ...rest }, ref) => {
    const [cardRef, cardRect] = useResizeObserver();

    const mergedRefs = useMergedRef(ref, cardRef);
    return (
      <motion.div
        ref={mergedRefs}
        className={cn(
          "bg-gray-800 shadow-[0_0_0_2px_rgb(31_41_55_/_var(--tw-bg-opacity))] w-full rounded-3xl",
          className,
        )}
        {...rest}
      ></motion.div>
    );
  },
);
DragCard.displayName = "DragCard";

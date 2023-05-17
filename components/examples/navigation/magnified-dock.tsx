"use client";
import {
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

const DockItem = ({ mouseX }: { mouseX: MotionValue<number> }) => {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref?.current?.getBoundingClientRect() ??{x:0,width:0};
    return val - bounds.x - bounds.width / 2
  });
  let width = useTransform(mouseX, [-200,0, 200], [40,80,40]);
  return (
    <motion.div
      ref={ref}
      style={{ width: width }}
      className="aspect-square w-12 rounded-lg  bg-gray-500 aspect"
    />
  );
};

const MagnifiedDock = () => {
  let mouseX = useMotionValue(Infinity);

  const items = [...Array(5)];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    mouseX.set(e.pageX);
  };

  return (
    <div
      onMouseLeave={()=>mouseX.set(Infinity)}
      onMouseMove={handleMouseMove}
      className="mx-auto  flex max-w-sm items-center justify-evenly h-16 gap-4 rounded-xl bg-gray-700"
    >
      {items?.map((_, id) => (
        <DockItem mouseX={mouseX} key={id} />
      ))}
    </div>
  );
};

export default MagnifiedDock;

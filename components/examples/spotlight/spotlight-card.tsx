"use client";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import React from "react";


const SpotlightExample = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightSize = "250px"
  const spotlightColor = "rgba(255,255,255,0.1)"

  return (
    <div
      onMouseMove={({ clientX, clientY, currentTarget }) => {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }}
      className="max-w-sm w-full   relative text-neutral-200 rounded-lg border group border-neutral-700 bg-neutral-900 p-8  overflow-hidden"
    >
      <motion.div
        className="absolute transition duration-500 ease-out -inset-px pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${spotlightSize} circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      >

      </motion.div>

      <h6 className="text-2xl font-semibold mb-4">Card Heading </h6>
      <p className="text-neutral-400 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet delectus necessitatibus fugit, sequi quos accusamus distinctio labore quaerat sit repellendus quia ipsam recusandae quo laborum veniam qui. Nam, id. Quaerat molestias minima, autem dignissimos nobis sint eum inventore perferendis. Provident, reprehenderit! Sit molestiae officiis temporibus excepturi modi consequatur, repellendus mollitia!</p>
      <button className="bg-indigo-500 px-4 py-2 rounded-lg mt-4">Call To Action</button>
    </div>
  );
};

export default SpotlightExample;

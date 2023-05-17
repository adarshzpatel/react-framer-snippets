"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const items = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About" },
];

const AnimatedTabsExample = () => {
  const [selected, setSelected] = useState(items[0].id);
  return (
    <motion.div layout className="flex gap-3">
      {items?.map((it) => (
        <div
          key={it.id}
          className={`
            px-4 py-2
            rounded-full
            cursor-pointer
            relative
            `}
          onClick={() => setSelected(it.id)}
        >
          {selected == it.id && (
            <motion.div
              layoutId="menu-item"
              style={{
                borderRadius: 9999,
              }}
              className="h-full w-full bg-indigo-500  absolute inset-0 mx-auto"
              transition={{ duration: 0.5, type: "spring" }}
            />
          )}
          <span className="relative z-10  ">{it.label}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default AnimatedTabsExample;

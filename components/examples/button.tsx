"use client"

import React from "react";
import { motion } from "framer-motion";


const ExampleButton = () => {
  const style = "bg-blue-500 py-2 px-4 rounded-md"
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.1 }}
      className={style}
    >
      Button
    </motion.button>
  );
};

export default ExampleButton;

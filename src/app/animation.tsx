import { motion } from 'framer-motion';
import React from 'react';

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} 
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        offscreen: {
          y: 100,
          opacity: 0,
        },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0 }}
    >
      {children}
    </motion.div>
  );
}
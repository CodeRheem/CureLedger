'use client';

import { motion } from 'framer-motion';

interface PulsingBadgeProps {
  text: string;
  icon?: React.ReactNode;
}

export function PulsingBadge({ text, icon }: PulsingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-medium"
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex h-2 w-2 rounded-full bg-red-500"
      />
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </motion.div>
  );
}

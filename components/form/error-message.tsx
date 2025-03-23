import { AnimatePresence, motion } from "motion/react";

export function ErrorMessage({ error }: { error: string }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: error ? "auto" : 0,
        opacity: error ? 1 : 0,
      }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <AnimatePresence>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </AnimatePresence>
    </motion.div>
  );
}

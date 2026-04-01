
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
export const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

import { motion } from "motion/react";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const GenreHeroSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="mb-12 text-center"
    >
      <h1 className="text-4xl font-bold tracking-tight mb-4">Music Genres</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Explore our collection of music genres and discover new songs from your
        favorite categories. From rock to classical, we have something for
        everyone.
      </p>
    </motion.div>
  );
};

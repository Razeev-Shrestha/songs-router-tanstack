import { motion } from "motion/react";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const ArtistHeroSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="mb-12 text-center"
    >
      <h1 className="text-4xl font-bold tracking-tight mb-4">Music Artists</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Discover amazing artists and their music. From legendary bands to
        contemporary solo artists, explore their discographies and find your
        next favorite track.
      </p>
    </motion.div>
  );
};

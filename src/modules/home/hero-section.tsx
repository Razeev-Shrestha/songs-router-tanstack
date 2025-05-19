import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type HeroSectionProps = {
  activeSection: number;
  sectionsRef: any;
};

export const HeroSection = ({
  activeSection,
  sectionsRef,
}: HeroSectionProps) => {
  return (
    <motion.section
      ref={(el) => (sectionsRef.current[0] = el)}
      initial="hidden"
      animate={activeSection === 0 ? "visible" : "hidden"}
      variants={fadeInUp}
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Discover Your Next Favorite Song
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore thousands of songs, artists, and genres. Find new music
              and create your own playlists.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-2 min-[400px]:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link to="/register">
              <Button size="lg" className="animate-pulse">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard/songs">
              <Button variant="outline" size="lg">
                Browse Songs
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

import { getRandomColorCombo } from "@/lib/generate-random-image";
import { genresDataQueryOptions } from "@/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

type PopularGenreProps = {
  sectionsRef: any;
};

// Animation variants for staggered children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const PopularGenre = ({ sectionsRef }: PopularGenreProps) => {
  const { data } = useSuspenseQuery(genresDataQueryOptions);

  if (!data.data) return null;

  return (
    <motion.section
      ref={(el) => (sectionsRef.current[2] = el)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-8 text-center md:text-left">
            Popular Genres
          </h2>
          <Link to="/genres" className="hover:underline">
            {" "}
            View
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {data.data.slice(2, 12).map((genre) => (
            <motion.div
              key={genre.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getRandomColorCombo()} opacity-80`}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white font-medium p-2 w-full text-center">
                    {genre.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

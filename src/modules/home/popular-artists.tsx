import { generateRandomImage } from "@/lib/generate-random-image";
import { artistsDataQueryOptions } from "@/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

type PopularArtistsProps = {
  sectionsRef: any;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
export const PopularArtists = ({ sectionsRef }: PopularArtistsProps) => {
  const { data } = useSuspenseQuery(artistsDataQueryOptions);

  if (!data.data) return null;
  return (
    <motion.section
      ref={(el) => (sectionsRef.current[3] = el)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="w-full py-12 md:py-24"
    >
      <div className="px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-8 text-center md:text-left">
            Top Artists
          </h2>
          <Link to="/artists" className="hover:underline">
            View
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.data.slice(0, 4).map((artist) => (
            <motion.div
              key={artist.id}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group"
            >
              <div className="relative aspect-square rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-primary transition-colors duration-300 shadow">
                <img
                  src={generateRandomImage()}
                  alt={artist.name}
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-center group-hover:text-primary transition-colors duration-300">
                {artist.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

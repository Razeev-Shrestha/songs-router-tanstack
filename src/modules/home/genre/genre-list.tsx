import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { getRandomColorCombo } from "@/lib/generate-random-image";
import { genresDataQueryOptions } from "@/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

type GenreProps = {
  onGenreClick: (id: number) => void;
};

export const GenreListView = ({ onGenreClick }: GenreProps) => {
  const { data } = useSuspenseQuery(genresDataQueryOptions);

  if (!data.data) return null;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {data.data.map((genre) => (
        <motion.div
          key={genre.id}
          variants={itemVariants}
          whileHover={{ x: 5, backgroundColor: "rgba(var(--accent), 0.2)" }}
          className="group cursor-pointer border rounded-lg p-4 transition-colors duration-200"
          onClick={() => onGenreClick(genre.id)}
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getRandomColorCombo()} opacity-80`}
              ></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{genre.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {genre.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {genre.songs.length} songs
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Icon icon="play" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const GenreGridView = ({ onGenreClick }: GenreProps) => {
  const { data } = useSuspenseQuery(genresDataQueryOptions);

  if (!data.data) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {data.data.map((genre) => (
        <motion.div
          key={genre.id}
          variants={itemVariants}
          whileHover={{
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="group cursor-pointer rounded-lg overflow-hidden"
          onClick={() => onGenreClick(genre.id)}
        >
          <div className="overflow-hidden shadow-md transition-all duration-300">
            <div className="relative aspect-video">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getRandomColorCombo()} opacity-80`}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                  {genre.title}
                </h3>
              </div>
            </div>
            <div className="p-4 bg-background">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {genre.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm">{genre.songs.length} songs</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Icon icon="play" className="h-4 w-4 mr-1" />
                  Play
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

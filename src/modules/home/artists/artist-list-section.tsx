import { Badge } from "@/components/ui/badge";
import { artistsDataQueryOptions } from "@/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import { Fragment } from "react/jsx-runtime";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@/components/icon";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { generateRandomImage } from "@/lib/generate-random-image";

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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

type ArtistType = {
  id: number;
  name: string;
  bio: string | null;
  songs: {
    id: number;
    title: string;
    released_year: number;
    genres: { id: number; title: string };
  }[];
};

export const ArtistListSection = () => {
  const { data } = useSuspenseQuery(artistsDataQueryOptions);
  const disclosure = useDisclosure();
  const [selectedArtist, setSelectedArtist] = useState<ArtistType | null>(null);

  if (!data.data) return null;

  return (
    <Fragment>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
      >
        {data.data.map((artist) => {
          const genres = artist.songs.flatMap((s) => s.genres);

          return (
            <motion.div
              key={artist.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="group cursor-pointer"
              onClick={() => {
                disclosure.onOpen();
                setSelectedArtist(artist);
              }}
            >
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-square">
                  <img
                    src={generateRandomImage()}
                    alt={artist.name}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {genres.map((genre) => (
                          <Badge
                            key={genre.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {genre.title}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-white text-sm">
                        {artist.songs.length} songs
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-semibold text-center group-hover:text-primary transition-colors duration-300">
                    {artist.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <AnimatePresence>
        {disclosure.isOpen && selectedArtist && (
          <Dialog open={disclosure.isOpen} onOpenChange={disclosure.onToggle}>
            <DialogContent
              className="sm:max-w-[700px] p-0 overflow-hidden"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="relative"
              >
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={disclosure.onClose}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative aspect-square w-full md:w-48 rounded-lg overflow-hidden"
                    >
                      <img
                        src={generateRandomImage()}
                        alt={selectedArtist.name}
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-2xl font-bold mb-2"
                      >
                        {selectedArtist.name}
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-2 mb-4"
                      >
                        {selectedArtist.songs
                          .flatMap((s) => s.genres)
                          .map((genre) => (
                            <Badge key={genre.id} variant={"secondary"}>
                              {genre.title}
                            </Badge>
                          ))}
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-muted-foreground mb-6 text-sm"
                      >
                        {selectedArtist.bio}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex gap-4"
                      >
                        <Button size="sm">
                          <Icon icon="play" className="mr-2 h-4 w-4" />
                          Play All
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon icon="heart" className="mr-2 h-4 w-4" />
                          Follow
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <Separator />

                <ScrollArea className="max-h-[300px]">
                  <div className="p-6">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-xl font-semibold mb-4"
                    >
                      Popular Songs
                    </motion.h3>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2"
                    >
                      {selectedArtist.songs.map((song, index) => (
                        <motion.div
                          key={song.id}
                          variants={itemVariants}
                          whileHover={{
                            x: 5,
                            backgroundColor: "rgba(var(--accent), 0.2)",
                          }}
                          className="flex items-center justify-between p-3 rounded-md transition-colors duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{song.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {song.released_year}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {song.duration}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Icon icon="play" className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </ScrollArea>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

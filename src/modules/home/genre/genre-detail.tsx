import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DisclosureProps } from "@/hooks/use-disclosure";
import { getRandomColorCombo } from "@/lib/generate-random-image";
import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

type GenreDetailProps = {
  disclosure: DisclosureProps;
  data: {
    id: number;
    title: string;
    description: string;
    songs: {
      id: number;
      title: string;
      description: string;
      duration: string;
      artists: {
        id: number;
        name: string;
      };
    }[];
  };
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

export const GenreDetail = ({ disclosure, data }: GenreDetailProps) => {
  return (
    <AnimatePresence>
      {disclosure.isOpen && (
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

              <div className="relative h-48 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getRandomColorCombo()} opacity-80`}
                ></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-white text-3xl font-bold"
                  >
                    {data.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-white/80 mt-2 line-clamp-2"
                  >
                    {data.description}
                  </motion.p>
                </div>
              </div>

              <ScrollArea className="max-h-[400px] p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Songs</h3>
                    <Button size="sm">
                      <Icon icon="play" className="mr-2 h-4 w-4" />
                      Play All
                    </Button>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                  >
                    {data.songs.map((song, index) => (
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
                              {song.artists.name}
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
                </motion.div>
              </ScrollArea>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

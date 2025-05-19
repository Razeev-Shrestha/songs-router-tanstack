import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { songsQueryOptions } from "../dashboard/songs/songs.service";
import { generateRandomImage } from "@/lib/generate-random-image";
import AutoPlay from "embla-carousel-autoplay";
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
type FeaturedSongProps = {
  sectionsRef: any;
};

export const FeaturedSong = ({ sectionsRef }: FeaturedSongProps) => {
  const { data } = useSuspenseQuery(songsQueryOptions);

  if (!data.data) return null;

  return (
    <motion.section
      ref={(el) => (sectionsRef.current[1] = el)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="w-full py-12 md:py-24"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-8 text-center md:text-left">
          Featured Songs
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[AutoPlay({ delay: 1200 })]}
          className="w-full"
        >
          <CarouselContent>
            {data.data.slice(3, 15).map((song) => (
              <CarouselItem
                key={song.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={generateRandomImage()}
                          alt={song.title}
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full"
                          >
                            <Icon icon="play" className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold truncate">{song.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile indicators */}
        <div className="flex justify-center gap-1 mt-4 sm:hidden">
          {[...Array(Math.ceil(data.data.length / 1))].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

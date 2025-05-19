import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

import { Header } from "@/modules/home/header";
import { Footer } from "@/modules/home/footer";
import { HeroSection } from "@/modules/home/hero-section";
import { FeaturedSong } from "@/modules/home/featured-song";
import { songsQueryOptions } from "@/modules/dashboard/songs/songs.service";
import { artistsDataQueryOptions, genresDataQueryOptions } from "@/services";
import { PopularGenre } from "@/modules/home/popular-genre";
import { CallToAction } from "@/modules/home/call-to-action";
import { PopularArtists } from "@/modules/home/popular-artists";

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context: { queryClient } }) => ({
    featuredSongs: queryClient.ensureQueryData(songsQueryOptions),
    popularGenre: queryClient.ensureQueryData(genresDataQueryOptions),
    artists: queryClient.ensureQueryData(artistsDataQueryOptions),
  }),
});

export function Index() {
  const [_isMobile, setIsMobile] = useState(false);

  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Handle responsive state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex(
              (section) => section === entry.target
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <HeroSection sectionsRef={sectionsRef} activeSection={activeSection} />

        <FeaturedSong sectionsRef={sectionsRef} />

        <PopularGenre sectionsRef={sectionsRef} />

        {/* Top Artists */}
        <PopularArtists sectionsRef={sectionsRef} />

        <CallToAction sectionsRef={sectionsRef} />
      </main>

      <Footer />
    </div>
  );
}

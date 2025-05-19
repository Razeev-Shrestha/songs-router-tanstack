import { ArtistListSection } from "@/modules/home/artists/artist-list-section";
import { ArtistHeroSection } from "@/modules/home/artists/hero-section";
import { Footer } from "@/modules/home/footer";
import { Header } from "@/modules/home/header";
import { artistsDataQueryOptions } from "@/services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/artists")({
  component: ArtistsPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(artistsDataQueryOptions),
});

function ArtistsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 py-8 md:py-12">
        <ArtistHeroSection />
        <ArtistListSection />
      </main>
      <Footer />
    </div>
  );
}

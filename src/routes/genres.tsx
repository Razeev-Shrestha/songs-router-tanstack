import { useDisclosure } from "@/hooks/use-disclosure";
import { Footer } from "@/modules/home/footer";
import { GenreDetail } from "@/modules/home/genre/genre-detail";
import { GenreGridView, GenreListView } from "@/modules/home/genre/genre-list";
import { GenreHeroSection } from "@/modules/home/genre/hero-section";
import { ViewSection } from "@/modules/home/genre/view-section";
import { Header } from "@/modules/home/header";
import { genresDataQueryOptions } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";

export const Route = createFileRoute("/genres")({
  component: GenrePage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(genresDataQueryOptions),
});

function GenrePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const [view, setView] = useState<"grid" | "list">("grid");
  const disclosure = useDisclosure();

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
    disclosure.onOpen();
  };

  const data = Route.useLoaderData();

  const genreData = data.data?.find((d) => d.id === selectedGenre);

  return (
    <Fragment>
      <div className="min-h-screen bg-background w-screen">
        <Header />
        <main className=" px-4 py-8 md:py-12 w-screen">
          <GenreHeroSection />

          <ViewSection view={view} onViewChange={setView} />

          {view === "grid" ? (
            <GenreGridView onGenreClick={handleGenreClick} />
          ) : (
            <GenreListView onGenreClick={handleGenreClick} />
          )}
        </main>
        <Footer />
      </div>
      {selectedGenre ? (
        <GenreDetail disclosure={disclosure} data={genreData} />
      ) : null}
    </Fragment>
  );
}

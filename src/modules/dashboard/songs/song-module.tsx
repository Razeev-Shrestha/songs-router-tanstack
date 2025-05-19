import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { songsQueryOptions } from "./songs.service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDuration } from "@/lib/format-duration";
import { Badge } from "@/components/ui/badge";
import { SongAction } from "./song-action";

type SongType = {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  artists: {
    id: number;
    name: string;
  };
  genres: {
    id: number;
    title: string;
  }[];
};
export const SongModule = () => {
  const columns = useMemo<ColumnDef<SongType>[]>(
    () => [
      { header: "S.N", cell: ({ row }) => row.index + 1 },
      {
        header: "title",
        accessorKey: "title",
      },
      {
        header: "Duration",
        accessorFn: ({ duration }) => formatDuration(duration),
      },
      {
        header: "Artist",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {row.original.artists.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p>{row.original.artists.name}</p>
          </div>
        ),
      },
      {
        header: "Genre",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.genres.map((genre) => (
              <Badge key={genre.id} variant={"outline"}>
                {genre.title}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        id: "action",
        cell: ({ row }) => <SongAction id={row.original.id} />,
      },
    ],
    []
  );

  const { data } = useSuspenseQuery(songsQueryOptions);

  return (
    <Table
      data={data.data ?? []}
      columns={columns}
      title="Genre"
      description="Manage songs"
      addPlaceholder={
        <Link to="/dashboard/songs/create">
          <Button>
            <Icon icon="plus" className="size-4" />
            Add Song
          </Button>
        </Link>
      }
    />
  );
};

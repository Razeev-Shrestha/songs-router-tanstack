import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { genreQueryOptions } from "./genre.service";
import { GenreAction } from "./genre-action";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";

type GenreType = {
  id: number;
  title: string;
  description: string | null;
};
export const GenreModule = () => {
  const columns = useMemo<ColumnDef<GenreType>[]>(
    () => [
      { header: "S.N", cell: ({ row }) => row.index + 1 },
      {
        header: "title",
        accessorKey: "title",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        id: "action",
        cell: ({ row }) => <GenreAction id={row.original.id} />,
      },
    ],
    []
  );

  const { data } = useSuspenseQuery(genreQueryOptions);

  return (
    <Table
      data={data.data ?? []}
      columns={columns}
      title="Genre"
      description="Manage your music genres"
      addPlaceholder={
        <Link to="/dashboard/genres/create">
          <Button>
            <Icon icon="plus" className="size-4" />
            Add Genre
          </Button>
        </Link>
      }
    />
  );
};

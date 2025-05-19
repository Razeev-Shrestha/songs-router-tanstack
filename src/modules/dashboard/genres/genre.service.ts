import {
  addGenre,
  deleteGenre,
  getGenreById,
  getGenres,
  updateGenre,
} from "@/supabase/services";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const genreQueryOptions = queryOptions({
  queryKey: ["genre"],
  queryFn: getGenres,
});

export const getGenreByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["genre", id],
    queryFn: () => getGenreById(id),
  });

export const genreSchema = z.object({
  title: z.string().min(3, "Genre is required."),
  description: z.string().min(16, "Minimum characters is 16."),
});

export type GenreType = z.infer<typeof genreSchema>;

export const useAddGenre = () =>
  useMutation<any, any, GenreType>({
    mutationKey: ["add-genre"],
    mutationFn: (input) => addGenre(input),
  });

export const useUpdateGenre = (id: number) =>
  useMutation<any, any, GenreType>({
    mutationFn: (input) => updateGenre(id, input),
    mutationKey: ["update-genre"],
  });

export const useDeleteGenre = () =>
  useMutation<any, any, { id: number }>({
    mutationKey: ["delete-genre"],
    mutationFn: ({ id }) => deleteGenre(id),
  });

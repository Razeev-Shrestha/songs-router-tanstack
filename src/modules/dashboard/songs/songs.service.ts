import {
  addSong,
  deleteSong,
  deleteSongFromGenre,
  getArtists,
  getSong,
  getSongs,
  updateSong,
  updateSongsGenre,
} from "@/supabase/services";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const songsQueryOptions = queryOptions({
  queryKey: ["songs"],
  queryFn: getSongs,
});

export const artistsQueryOptions = queryOptions({
  queryKey: ["artists"],
  queryFn: getArtists,
});

export const songByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["songs", id],
    queryFn: () => getSong(id),
  });

export const songsSchema = z.object({
  title: z.string().min(3, "Minimum 3 characters is required."),
  description: z.string().min(6, "Minimum 6 characters is required."),
  duration: z.number().min(5),
  released_year: z.number().nullable(),
  artist_id: z.number().positive(),
  genre_id: z.array(z.number()).min(1),
});

export type SongsType = z.infer<typeof songsSchema>;

export const useAddSong = () =>
  useMutation<any, any, Omit<SongsType, "genre_id">>({
    mutationKey: ["add-song"],
    mutationFn: (input) => addSong(input),
  });

export const useUpdateSongGenre = () =>
  useMutation<any, any, { songId: number; genreId: number[] }>({
    mutationKey: ["update-song-genre"],
    mutationFn: (input) => updateSongsGenre(input),
  });

export const useDeleteSong = () =>
  useMutation<any, any, { id: number }>({
    mutationFn: ({ id }) => deleteSong(id),
    mutationKey: ["delete-song"],
  });
export const useUpdateSong = (id: number) =>
  useMutation<any, any, Omit<SongsType, "genre_id">>({
    mutationKey: ["update-song", id],
    mutationFn: (input) => updateSong(id, input),
  });

export const useDeleteSongFromGenre = () =>
  useMutation<any, any, { id: number }>({
    mutationFn: ({ id }) => deleteSongFromGenre(id),
  });

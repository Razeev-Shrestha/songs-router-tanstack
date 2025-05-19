import { getArtistsData, getGenresData, getUser } from "@/supabase/services";
import { queryOptions } from "@tanstack/react-query";

export const genresDataQueryOptions = queryOptions({
  queryKey: ["genre-data"],
  queryFn: getGenresData,
});

export const artistsDataQueryOptions = queryOptions({
  queryKey: ["artists-data"],
  queryFn: getArtistsData,
});

export const userQueryOptions = queryOptions({
  queryKey: ["current-user"],
  queryFn: getUser,
});

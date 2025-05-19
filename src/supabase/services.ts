import { client } from "./client";

export const registerUser = async (email: string, password: string) =>
  client.auth.signUp({ email, password });

export const loginUser = async (email: string, password: string) =>
  client.auth.signInWithPassword({ email, password });

export const getUser = async () => client.auth.getUser();
export const getGenres = async () =>
  client.from("genres").select("id,title,description");

export const getGenreById = async (id: number) =>
  client.from("genres").select().eq("id", id);

export const addGenre = (input: { title: string; description: string }) =>
  client
    .from("genres")
    .insert({ ...input })
    .select();

export const updateGenre = (
  id: number,
  input: { title: string; description: string }
) =>
  client
    .from("genres")
    .update({ ...input, updated_at: new Date().toUTCString() })
    .eq("id", id);

export const deleteGenre = (id: number) =>
  client.from("genres").delete().eq("id", id);

export const getSongs = async () =>
  client
    .from("songs")
    .select(
      "id,title,description,duration,artists (id,name) , genres (id,title) "
    );

export const getSong = (id: number) =>
  client
    .from("songs")
    .select(
      "id,title,description,duration,artists (id,name) , genres (id,title) "
    )
    .eq("id", id);
export const getArtists = async () => client.from("artists").select("id,name");

export const addSong = async (input: {
  title: string;
  description: string;
  duration: number;
  released_year: number | null;
  artist_id: number;
}) => client.from("songs").insert(input).select();

export const updateSongsGenre = async ({
  songId,
  genreId,
}: {
  songId: number;
  genreId: number[];
}) =>
  client
    .from("songs_genres")
    .insert(genreId.map((i) => ({ song_id: songId, genre_id: i })))
    .select();

export const deleteSong = async (id: number) =>
  client.from("songs").delete().eq("id", id);

export const deleteSongFromGenre = async (id: number) =>
  client.from("songs_genres").delete().eq("song_id", id);

export const updateSong = async (
  id: number,
  input: {
    title: string;
    description: string;
    duration: number;
    released_year: number | null;
    artist_id: number;
  }
) => client.from("songs").update(input).eq("id", id);

///home page data

export const getGenresData = async () =>
  client
    .from("genres")
    .select(
      "id,title,description, songs (id,title,duration,released_year, artists (id,name,bio) ) "
    );

export const getArtistsData = async () =>
  client
    .from("artists")
    .select("id,name,bio, songs (id,title, genres (id,title))");

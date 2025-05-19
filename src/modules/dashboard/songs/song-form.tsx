import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { artistsQueryOptions, type SongsType } from "./songs.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MultiSelect } from "@/components/multi-select";
import { genreQueryOptions } from "../genres/genre.service";
export const SongsForm = () => {
  const form = useFormContext<SongsType>();
  const { data } = useSuspenseQuery(artistsQueryOptions);
  const { data: genres } = useSuspenseQuery(genreQueryOptions);
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center w-full justify-between gap-3">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter duration in seconds"
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="released_year"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Released Year</FormLabel>
              <FormControl>
                {/** @ts-expect-error null not acceptable */}
                <Input
                  placeholder="Enter released year"
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="artist_id"
        render={({ field }) => {
          const selected = data.data?.find((v) => v.id === field.value);
          return (
            <FormItem className="w-full">
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select artist..."
                  multi={false}
                  command={{
                    placeholder: "Search artist...",
                    emptyMessage: "No artist found",
                  }}
                  options={
                    data.data
                      ? data.data?.map((artist) => ({
                          label: artist.name,
                          value: artist.id,
                        }))
                      : []
                  }
                  selected={{ label: selected?.name, value: selected?.id }}
                  onSelect={(option) => {
                    field.onChange(option.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="genre_id"
        render={({ field }) => {
          const selected = field.value
            .map((id) => {
              // eslint-disable-next-line no-unsafe-optional-chaining
              return genres.data?.find((item) => item.id === id);
            })
            .map((v) => ({ label: v?.title, value: v?.id }));
          return (
            <FormItem className="w-full">
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select genre..."
                  multi
                  command={{
                    placeholder: "Search genre...",
                    emptyMessage: "No genre found",
                  }}
                  options={
                    genres.data
                      ? genres.data.map((g) => ({
                          label: g.title,
                          value: g.id,
                        }))
                      : []
                  }
                  selected={selected}
                  onSelect={(option) => {
                    field.onChange(option.map((o) => o.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};

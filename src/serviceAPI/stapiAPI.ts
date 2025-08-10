import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LINK_TO_API } from "../constant/global-constant";
import type { MainResponse } from "../models/types/mainResponse";

export const stapiAPI = createApi({
  reducerPath: "stapiAPI",
  baseQuery: fetchBaseQuery({ baseUrl: LINK_TO_API }),
  endpoints: (build) => ({
    getCharacters: build.query<
      MainResponse,
      { search: string | null; params?: URLSearchParams | null }
    >({
      query: ({ search, params }) => ({
        url: `/search${params?.toString() ? "?" + params.toString() : ""}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: { name: search || "" },
      }),
    }),
  }),
});

export const { useGetCharactersQuery } = stapiAPI;

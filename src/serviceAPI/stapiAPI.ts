import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LINK_TO_API } from "../constant/global-constant";
import type { MainResponse } from "../models/types/mainResponse";
import type z from "zod";
import type { CharacterFullZ } from "../schema/characterFullZ";
import { RequestQuery } from "../models/enums/requestQuery";

export const stapiAPI = createApi({
  reducerPath: "stapiAPI",
  baseQuery: fetchBaseQuery({ baseUrl: LINK_TO_API }),
  endpoints: (build) => ({
    getCharacters: build.query<
      MainResponse,
      { search: string | null; params?: string | null }
    >({
      query: ({ search, params }) => {
        console.log("rtk query work");
        return {
          url: `/search?pageSize=9${params ? "&" + RequestQuery.PAGE + "=" + params : ""}`,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: new URLSearchParams({ name: search || "" }),
        };
      },
    }),
    getSingleCharacter: build.query<
      {
        character: z.infer<typeof CharacterFullZ>;
      },
      { params?: URLSearchParams | null }
    >({
      query: ({ params }) => ({
        url: `${params?.toString() ? "?" + params.toString() : ""}`,
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetSingleCharacterQuery } = stapiAPI;

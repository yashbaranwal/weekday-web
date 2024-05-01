import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, API_TOKEN } from "@/general";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }

    return headers;
  },
});

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (args) => {
        const { limit, offset } = args;
        return {
          url: "regions",
          params:
             { limit: limit, offset: offset }
        };
      },
    }),
    

  }),
});

export const {
  useGetJobsQuery
} = myApi;

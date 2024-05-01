import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/general";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getJobs: builder.mutation({
      query: (args) => {
        const { limit, offset } = args
        return {
          url: "adhoc/getSampleJdJSON",
          method: "POST",
          body: {
            limit: limit,
            offset: offset
          }
        };
      },
    }),
  }),
});

export const {
  useGetJobsMutation
} = myApi;

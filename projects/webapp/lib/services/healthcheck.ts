import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('API_URL', API_URL);

export type Healthcheck = {
  status: string;
}

export const healthcheckApi = createApi({
  reducerPath: 'healthcheckApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getHealthcheck: builder.query<Healthcheck, void>({
      query: () => 'healthcheck',
    }),
  }),
});

export const { useGetHealthcheckQuery } = healthcheckApi;

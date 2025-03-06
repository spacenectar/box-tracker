import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `/api/${process.env.NEXT_PUBLIC_API_VERSION}/`;

export type Healthcheck = {
  status: string;
}

export const healthcheckApi = createApi({
  reducerPath: 'healthcheckApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getHealthcheck: builder.query<Healthcheck, void>({
      query: () => 'healthcheck',
    }),
  }),
});

export const { useGetHealthcheckQuery } = healthcheckApi;

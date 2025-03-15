import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Location } from '@typeDefs/location';
import type { RootState } from '../store';

export interface CreateLocationRequest {
  name: string;
  spaceId: string;
}

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Location', 'Space'],
  endpoints: (builder) => ({
    createLocation: builder.mutation<Location, CreateLocationRequest>({
      query: ({ name, spaceId }) => ({
        url: 'location',
        method: 'POST',
        body: { name, spaceId }
      }),
      invalidatesTags: ['Location', 'Space']
    })
  })
});

export const { useCreateLocationMutation } = locationApi;

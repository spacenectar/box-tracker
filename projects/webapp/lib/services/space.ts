import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Space } from '@typeDefs/space';
import type { RootState } from '../store';

export const spaceApi = createApi({
  reducerPath: 'spaceApi',
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
  tagTypes: ['Space'],
  endpoints: (builder) => ({
    getSpaces: builder.query<Space[], void>({
      query: () => 'space',
      providesTags: ['Space']
    }),
    createSpace: builder.mutation<Space, string>({
      query: (name) => ({
        url: 'space',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Space']
    }),
    updateSpace: builder.mutation<Space, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `space/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: ['Space']
    }),
    deleteSpace: builder.mutation<void, string>({
      query: (id) => ({
        url: `space/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Space']
    })
  })
});

export const { 
  useCreateSpaceMutation, 
  useGetSpacesQuery, 
  useUpdateSpaceMutation, 
  useDeleteSpaceMutation 
} = spaceApi;

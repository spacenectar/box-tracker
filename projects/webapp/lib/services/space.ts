import { api } from './baseApi';
import type { Space } from '@typeDefs/space';

export const spaceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpaces: builder.query<Space[], void>({
      query: () => 'space',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Space' as const, id })),
              { type: 'Space', id: 'LIST' },
            ]
          : [{ type: 'Space', id: 'LIST' }],
    }),
    getSpace: builder.query<Space, string>({
      query: (id) => `space/${id}`,
      providesTags: (result, error, id) => [{ type: 'Space', id }],
    }),
    addSpace: builder.mutation<Space, Partial<Space>>({
      query: (body) => ({
        url: 'space',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Space', id: 'LIST' }],
    }),
    updateSpace: builder.mutation<Space, Partial<Space> & Pick<Space, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `space/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Space', id }, { type: 'Space', id: 'LIST' }],
    }),
    deleteSpace: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `space/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Space', id }, { type: 'Space', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSpacesQuery,
  useGetSpaceQuery,
  useAddSpaceMutation,
  useUpdateSpaceMutation,
  useDeleteSpaceMutation,
} = spaceApi;

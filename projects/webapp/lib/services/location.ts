import { api } from './baseApi';
import type { Location } from '@typeDefs/location';

export interface CreateLocationRequest {
  name: string;
  spaceId: string;
}

export const locationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all locations for the user
    getLocations: builder.query<Location[], void>({
      query: () => 'location',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Location' as const, id })),
              { type: 'Location', id: 'LIST' },
            ]
          : [{ type: 'Location', id: 'LIST' }],
    }),
    // Get a single location by ID
    getLocation: builder.query<Location, string>({
      query: (id) => `location/${id}`,
      providesTags: (result, error, id) => [{ type: 'Location', id }],
    }),
    // Add a new location
    addLocation: builder.mutation<Location, Partial<Location>>({
      query: (body) => ({
        url: 'location',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Location', id: 'LIST' }],
    }),
    // Update an existing location
    updateLocation: builder.mutation<Location, Partial<Location> & Pick<Location, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `location/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Location', id }, { type: 'Location', id: 'LIST' }],
    }),
    // Delete a location
    deleteLocation: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `location/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Location', id }, { type: 'Location', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLocationsQuery,
  useGetLocationQuery,
  useAddLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;

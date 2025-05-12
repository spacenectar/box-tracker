import { api } from './baseApi'; // Import the root api
import type { User } from '@typeDefs/user';

// Define a service using a base API instance
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get the current user's data
    getUser: builder.query<User, void>({
      query: () => 'user/me',
      providesTags: (result) => (result ? [{ type: 'User', id: 'ME' }] : []),
    }),
    // Add other user-related endpoints here (e.g., updateUser, etc.)
    // Example mutation:
    // updateUser: builder.mutation<User, Partial<User>>({
    //   query: (body) => ({
    //     url: 'user/me',
    //     method: 'PATCH',
    //     body,
    //   }),
    //   invalidatesTags: [{ type: 'User', id: 'ME' }],
    // }),
  }),
  overrideExisting: false, // Important: keep false unless intentionally overriding
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery } = userApi;

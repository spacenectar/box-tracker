import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the expected structure for the Clerk session object on window
interface ClerkSession {
  getToken: (options?: { template?: string }) => Promise<string | null>;
}

// Define the expected structure for the Clerk instance on window
interface ClerkInstance {
  session?: ClerkSession;
}

// Extend the global Window interface (this relies on "dom" lib in tsconfig)
declare global {
  interface Window {
    Clerk?: ClerkInstance;
  }
}

// Define the shared base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/', // Adjust if your API prefix is different
  prepareHeaders: async (headers) => {
    let token: string | null = null;

    // Check if running in a browser environment and Clerk is available
    if (typeof window !== 'undefined' && window.Clerk && window.Clerk.session) {
      try {
        // Use the typed window object - no 'any' needed
        token = await window.Clerk.session.getToken();
      } catch (error) {
        console.error('Error fetching Clerk token:', error);
        // Potentially handle token fetching errors (e.g., session expired)
      }
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Create a base API instance using the shared baseQuery.
 * Endpoints are injected from other files using `injectEndpoints`.
 * Define tagTypes for caching strategies. Adjust based on your models.
 */
export const api = createApi({
  reducerPath: 'api', // Single reducer path for the combined API
  baseQuery: baseQuery,
  tagTypes: ['User', 'Space', 'Location', 'Box', 'Item', 'Room', 'Health'], // Add all relevant tags
  endpoints: () => ({}), // Endpoints are defined in separate files
});

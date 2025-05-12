import { api } from './baseApi';

// Define a type for the healthcheck response (if specific structure is known)
interface HealthCheckResponse {
  status: string;
  message?: string;
  // Add other fields based on your actual healthcheck response
}

export const healthCheckApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Query to check the health of the backend
    getHealth: builder.query<HealthCheckResponse, void>({
      query: () => 'health', // Assuming your healthcheck endpoint is /api/v1/health
      // Healthchecks usually don't need to provide tags for caching,
      // but if it influences other data, you might add them.
      // For example, if a failing healthcheck should invalidate user data:
      // providesTags: (result) => (result?.status === 'ok' ? [] : [{ type: 'User', id: 'ME' }]),
      // Or more simply, if you want to tag it for refetching policies:
      providesTags: [{ type: 'Health', id: 'STATUS' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetHealthQuery } = healthCheckApi;

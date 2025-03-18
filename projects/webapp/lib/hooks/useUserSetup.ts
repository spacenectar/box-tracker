import { useGetSpacesQuery } from '@/lib/services/space';

/**
 * Custom hook to check if a user has completed the initial setup
 * by creating spaces and locations.
 * 
 * @returns An object containing:
 * - hasSpaces: boolean indicating if the user has at least one space
 * - hasLocations: boolean indicating if the user has at least one location
 * - isSetupComplete: boolean indicating if the user has both spaces and locations
 * - isLoading: boolean indicating if the data is still loading
 * - error: any error that occurred during the fetch
 */
export const useUserSetup = () => {
  const { data: spaces, error, isLoading } = useGetSpacesQuery();
  
  const hasSpaces = !!spaces && spaces.length > 0;
  const hasLocations = !!spaces && spaces.some(space => space.locations && space.locations.length > 0);
  const isSetupComplete = hasSpaces && hasLocations;
  
  return {
    hasSpaces,
    hasLocations,
    isSetupComplete,
    isLoading,
    error
  };
};

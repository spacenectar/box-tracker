'use client'


import { useUserSetup } from "@/lib/hooks";
import Loader from "@components/feedback/loader";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetLocationsQuery } from '@/lib/services/location';
import Grid from "@components/layout/grid";
import { LocationPane } from "@components/data-display/location-pane";

export default function Home() {
  const router = useRouter();
  const { hasSpaces, isSetupComplete, isLoading: setupLoading } = useUserSetup();
  const [loading, setLoading] = useState(true);
  const { data, error, isLoading } = useGetLocationsQuery();

  useEffect(() => {
    if (!setupLoading && !isLoading) {
      setLoading(false);
    }
  }, [setupLoading, isLoading]);

  if (loading) {
    return <div className="dashboard-layout"><Loader helpText="Loading application data..." /></div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
  }

  // User has not completed setup
  if (!isSetupComplete) {
    return (
      <main className="app-content">
        <h1 className="heading-large">Welcome to Box Tracker</h1>
        <div className="content-section">
          <p className="text-large mb-4">
            {!hasSpaces 
              ? "You haven't created any workspaces yet." 
              : "You have workspaces but no locations set up yet."}
          </p>
          <p className="mb-6">
            To get started with Box Tracker, you'll need to set up your workspaces and locations.
            This will help you organize and track your items effectively.
          </p>
          <button 
            className="btn-primary" 
            onClick={() => router.push('/getting-started')}
          >
            Get Started
          </button>
        </div>
      </main>
    );
  }

  // User has completed setup
  return (
    <main className="app-content">
      <Grid columns={2} className="m-4">
        {data?.map((location) => (
          <LocationPane
            key={location.id}
            locationData={location}
          />
        ))}
      </Grid>
    </main>
  );
}

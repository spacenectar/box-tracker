'use client'

import { useGetHealthcheckQuery } from "@/lib/services";
import { useUserSetup } from "@/lib/hooks";
import Loader from "@components/feedback/loader";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data, error, isLoading: healthCheckLoading } = useGetHealthcheckQuery();
  const { hasSpaces, isSetupComplete, isLoading: setupLoading } = useUserSetup();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!healthCheckLoading && !setupLoading) {
      setLoading(false);
    }
  }, [healthCheckLoading, setupLoading]);

  if (loading) {
    return <div className="dashboard-layout"><Loader helpText="Loading application data..." /></div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
  }

  // User has not completed setup
  if (!isSetupComplete) {
    return (
      <main className="app-layout ta-c">
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
    <main className="app-layout ta-c">
      <h1 className="heading-large">Welcome to Box Tracker</h1>
      <section className="ta-c">
        <p>
          This is a simple web application that allows you to track the location of boxes and items across multiple locations.
        </p>
        <p>
          This is a pre-alpha version of the application and is not yet ready for production use.
        </p>
        <p>
          The status of the API is: <strong style={data?.status === 'ok' ? {color: 'green'} : { color: 'red'}}>{data?.status === 'ok' ? 'Online' : 'Offline'}</strong>
        </p>
        <p>
          To use the application, you will need to <Link className="link" href="/login">login</Link> or <Link className="link" href="/register">register</Link> for an account.
        </p>
      </section>
    </main>
  );
}

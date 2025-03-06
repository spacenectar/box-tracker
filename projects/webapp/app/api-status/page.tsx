'use client'

import { useGetHealthcheckQuery } from "@/lib/services";
import Link from "next/link";

export default function APIStatus() {

  const { data, error, isLoading } = useGetHealthcheckQuery();

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
  }

  return (
    <div className="dashboard-layout">
      <main className="ta-c">
        <h1 className="heading-large">BoxTracker API Status</h1>

        {/* TODO: Replace the contents of this page with a proper status page when the components for it exist */}
        <p>The API at <Link className="link" href={API_URL}>{API_URL}</Link> is currently <strong style={data?.status === 'ok' ? {color: 'green'} : { color: 'red'}}>{data?.status === 'ok' ? 'Online' : 'Offline'}</strong></p>
        <p>For more information, please refer to the API documentation.</p>

        <p><Link className="link" href={`${API_URL}/docs`}>View the docs</Link></p>
      </main>
    </div>
  );
}

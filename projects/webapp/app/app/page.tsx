'use client'

import { useGetUserQuery } from "@/lib/services";

export default function Home() {

  const { data, error, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
  }

  return (
    <div className="dashboard-layout">
      <main className="ta-c">

        <p>You are logged in as {data?.username}</p>

      </main>
    </div>
  );
}

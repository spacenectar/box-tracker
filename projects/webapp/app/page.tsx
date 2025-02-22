'use client'

import { useGetHealthcheckQuery } from "@/lib/services";

export default function Home() {

  const { data, error, isLoading } = useGetHealthcheckQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
  }

  return (
    <div>
      <main>
        <h1>{data?.status}</h1>
      </main>
    </div>
  );
}

'use client'

import { useGetHealthcheckQuery } from "@/lib/services";
import Link from "next/link";

export default function Home() {

  const { data, error, isLoading } = useGetHealthcheckQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
  }

  return (
    <div className="dashboard-layout">
      <main className="ta-c">
        <h1 className="heading-large">Welcome to Box Tracker</h1>
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
      </main>
    </div>
  );
}

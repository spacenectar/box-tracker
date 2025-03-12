'use client';
import { WizardComplete } from './partials/wizard-complete';
import { WizardFlow } from './partials/wizard-flow';
import styles from './style.module.scss';
import Loader from '@components/feedback/loader';
import { useState, useEffect } from 'react';
import { useGetSpacesQuery } from '@/lib/services/space';
import { Space } from '@typeDefs/space';

export default function GettingStartedPage() {
  const [isClient, setIsClient] = useState(false);
  
  // Only render the content component on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <Loader helpText='Loading setup wizard status...'/>;
  }

  return <SetupWizardContent />;
}

// Separate component to handle the data fetching
function SetupWizardContent() {
  // Using the hook with lazy initialization to prevent rendering issues
  const { data: spaces, isLoading } = useGetSpacesQuery(undefined, {
    skip: false // We're already ensuring this only runs on client side
  });
  
  if (isLoading) {
    return <Loader helpText='Loading setup wizard status...'/>;
  }
  
  const hasCompletedSetup = spaces?.some((space: Space) => 
    space.locations && space.locations.length > 0
  );

  return (
    <main className={styles.container}>
      {hasCompletedSetup ? <WizardComplete /> : <WizardFlow />}
    </main>
  );
}

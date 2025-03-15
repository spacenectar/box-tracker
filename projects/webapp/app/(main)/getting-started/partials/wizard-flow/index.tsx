'use client';
import { useState, useEffect } from 'react';
import { CreateSpaceStep } from '../wizard-create-space-step';
import { CreateLocationsStep } from '../wizard-create-locations-step';
import { useGetSpacesQuery } from '@/lib/services/space';
import Loader from '@components/feedback/loader';
import styles from './style.module.scss';

export const WizardFlow = () => {
  const [currentStep, setCurrentStep] = useState<'space' | 'locations'>('space');
  const [currentSpaceId, setCurrentSpaceId] = useState<string | null>(null);
  
  const { data: spaces, isLoading } = useGetSpacesQuery();

  const handleSpaceCreated = (spaceId: string) => {
    setCurrentSpaceId(spaceId);
    setCurrentStep('locations');
  };
  
  // Check for existing spaces and move to locations step if a space exists
  useEffect(() => {
    if (spaces && spaces.length > 0) {
      setCurrentSpaceId(spaces[0].id);
      setCurrentStep('locations');
    }
  }, [spaces]);

  if (isLoading) {
    return <Loader helpText="Checking for existing workspaces..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={`${styles.step} ${currentStep === 'space' ? styles.active : styles.completed}`}>
          Create Workspace
        </div>
        <div className={`${styles.step} ${currentStep === 'locations' ? styles.active : ''}`}>
          Add Locations
        </div>
      </div>

      <div className={styles.content}>
        {currentStep === 'space' ? (
          <CreateSpaceStep onCompleteAction={handleSpaceCreated} />
        ) : (
          <CreateLocationsStep spaceId={currentSpaceId!} />
        )}
      </div>
    </div>
  );
};

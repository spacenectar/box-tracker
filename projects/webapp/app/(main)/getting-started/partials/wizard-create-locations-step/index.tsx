'use client';
import { useState } from 'react';
import { useCreateLocationMutation } from '@/lib/services/location';
import { useRouter } from 'next/navigation';
import styles from './style.module.scss';
import InputFactory from '@components/factories/input-factory';
import Button from '@components/data-input/button';

export const CreateLocationsStep = ({ spaceId }: { spaceId: string }) => {
  const router = useRouter();
  const [locations, setLocations] = useState<string[]>(['']);
  const [error, setError] = useState<string | null>(null);
  const [createLocation, { isLoading }] = useCreateLocationMutation();

  const isValidLocations = locations.every(loc => loc.trim().length >= 3 || loc.trim().length === 0);
  const hasAtLeastOneLocation = locations.some(loc => loc.trim().length >= 3);

  const handleAddLocation = () => {
    if (locations.length < 2) {
      setLocations([...locations, '']);
    }
  };

  const handleLocationChange = (index: number) => (e: React.ChangeEvent<Element>) => {
    const target = e.target as unknown as { value: string };
    const newLocations = [...locations];
    newLocations[index] = target.value;
    setLocations(newLocations);
  };

  const handleSubmitLocations = async () => {
    if (!isValidLocations) {
      setError('Each location must be at least 3 characters');
      return;
    }

    if (!hasAtLeastOneLocation) {
      setError('Please add at least one location');
      return;
    }

    try {
      await Promise.all(
        locations
          .filter(loc => loc.trim().length >= 3)
          .map(loc => createLocation({ 
            name: loc.trim(),
            spaceId 
          }).unwrap())
      );
      
      setError(null);
      router.push('/');
    } catch (err) {
      console.error('Location creation failed:', err);
      setError('Failed to create locations. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Locations to Your Space</h2>
      <p>Locations are specific areas within your space where boxes are stored.</p>
      
      <div className={styles.locations}>
        {locations.map((location, index) => (
          <div key={index} className={styles["form-group"]}>
            <InputFactory
              name={`location-${index}`}
              label={`Location ${index + 1}`}
              variant="text"
              value={location}
              onChange={handleLocationChange(index)}
              placeholder="e.g. '123 Meteor Street'"
              status={error && !isValidLocations ? 'error' : 'default'}
            />
          </div>
        ))}
        
        {locations.length < 2 && (
          <Button 
            type="button"
            variant="secondary"
            onClick={handleAddLocation}
            label="Add Another Location"
          />
        )}
      </div>
      
      {error && <div className={styles["error-message"]}>{error}</div>}
      
      <div className={styles.actions}>
        <Button 
          variant="primary"
          onClick={handleSubmitLocations}
          disabled={isLoading || !hasAtLeastOneLocation || !isValidLocations}
          isLoading={isLoading}
          label="Complete Setup"
        />
      </div>
    </div>
  );
};

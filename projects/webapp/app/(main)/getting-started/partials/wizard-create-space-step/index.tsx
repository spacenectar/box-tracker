'use client';
import { useState } from 'react';
import { useCreateSpaceMutation } from '@/lib/services/space';
import styles from './style.module.scss';
import InputFactory from '@components/factories/input-factory';
import Button from '@components/data-input/button';

export const CreateSpaceStep = ({ onCompleteAction }: { onCompleteAction: (spaceId: string) => void }) => {
  const [spaceName, setSpaceName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [createSpace, { isLoading }] = useCreateSpaceMutation();
  
  const handleInputChange = (e: React.ChangeEvent<Element>) => {
    const target = e.target as unknown as { value: string };
    setSpaceName(target.value);
  };

  const isValidSpaceName = spaceName.trim().length >= 3;

  const handleCreateSpace = async () => {
    if (!isValidSpaceName) {
      setError('Space name must be at least 3 characters');
      return;
    }

    try {
      const result = await createSpace(spaceName.trim()).unwrap();
      setError(null);
      onCompleteAction(result.id);
    } catch (err) {
      console.error('Space creation failed:', err);
      setError('Failed to create space. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Your First Workspace</h2>
      <p>A workspace represents a group of locations.</p><p>Free users can have only one workspace but our Pro plan will allow for unlimited workspaces, allowing you to manage multiple moving or storage projects at once.</p>
      
      <div className={styles['form-group']}>
        <InputFactory
          name="space-name"
          label="Workspace Name"
          variant="text"
          value={spaceName}
          onChange={handleInputChange}
          placeholder="e.g. Default, My Move, My Storage"
          status={error && !isValidSpaceName ? 'error' : 'default'}
          statusMessage={error && !isValidSpaceName ? error : ''}
        />
      </div>

      <Button 
        variant="primary"
        onClick={handleCreateSpace}
        disabled={isLoading || !isValidSpaceName}
        isLoading={isLoading}
        label="Create Space"
      />
    </div>
  );
};

'use client';
import { useState } from 'react';
import { useCreateSpaceMutation } from '@/lib/services/space';
import styles from './style.module.scss';

export const CreateSpaceStep = ({ onCompleteAction }: { onCompleteAction: (spaceId: string) => void }) => {
  const [spaceName, setSpaceName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [createSpace, { isLoading }] = useCreateSpaceMutation();

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
        <label htmlFor="space-name">Workspace Name</label>
        <input
          id="space-name"
          type="text"
          value={spaceName}
          onChange={(e) => setSpaceName(e.currentTarget.value)}
          placeholder="e.g. Default, My Move, My Storage"
          className={error && !isValidSpaceName ? styles.error : ''}
        />
        {error && <div className={styles['error-message']}>{error}</div>}
      </div>

      <button 
        className={styles.button}
        onClick={handleCreateSpace}
        disabled={isLoading || !isValidSpaceName}
      >
        {isLoading ? 'Creating...' : 'Create Space'}
      </button>
    </div>
  );
};

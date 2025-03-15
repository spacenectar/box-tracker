"use client";

import { useState } from 'react';
import { 
  useGetSpacesQuery, 
  useCreateSpaceMutation, 
  useUpdateSpaceMutation, 
  useDeleteSpaceMutation 
} from '@/lib/services/space';
import { Space } from '@typeDefs/space';
import { Icon } from "@components/data-display/icon";
import styles from './style.module.scss';
import { Loader } from '@components/feedback/loader';

export function ManageSpaces() {
  const { data: spaces, isLoading, refetch } = useGetSpacesQuery();
  const [createSpace] = useCreateSpaceMutation();
  const [updateSpace] = useUpdateSpaceMutation();
  const [deleteSpace] = useDeleteSpaceMutation();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [spaceToDelete, setSpaceToDelete] = useState<Space | null>(null);

  const handleCreateSpace = async () => {
    if (newSpaceName.trim()) {
      await createSpace(newSpaceName.trim());
      setNewSpaceName('');
      setIsCreateModalOpen(false);
      refetch();
    }
  };
  
  const handleSaveSpace = async () => {
    if (editingSpace && newSpaceName.trim()) {
      await updateSpace({ id: editingSpace.id, name: newSpaceName.trim() });
      setNewSpaceName('');
      setEditingSpace(null);
      refetch();
    }
  };

  const handleEditSpace = (space: Space) => {
    setEditingSpace(space);
    setNewSpaceName(space.name);
  };

  const handleDeleteSpace = (space: Space) => {
    setSpaceToDelete(space);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) {
    return <Loader helpText="Loading spaces..." />;
  }

  return (
    <div className={styles['manage-spaces']}>
      <div className={styles['header']}>
        {/* TODO: Add create space when we've worked out the subscription stuff */}
        {/* <button 
          className={styles['create-button']} 
          onClick={() => {
            setNewSpaceName('');
            setIsCreateModalOpen(true);
          }}
        >
          <Icon use="plus" /> Create New Space
        </button> */}
      </div>

      {spaces && spaces.length > 0 ? (
        <ul className={styles['space-list']}>
          {spaces.map((space: Space) => (
            <li key={space.id} className={styles['space-item']}>
              <div className={styles['space-info']}>
                <h3 className={styles['space-name']}>{space.name}</h3>
                <p className={styles['space-details']}>
                  {space.locations?.length || 0} locations
                </p>
              </div>
              <div className={styles['space-actions']}>
                <button 
                  className={styles['edit-button']} 
                  onClick={() => handleEditSpace(space)}
                  aria-label={`Edit ${space.name}`}
                >
                  <Icon use="edit" />
                </button>
                <button 
                  className={styles['delete-button']} 
                  onClick={() => handleDeleteSpace(space)}
                  aria-label={`Delete ${space.name}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles['empty-state']}>
          <p>You don't have any spaces yet. Create your first space to get started.</p>
        </div>
      )}

      {isCreateModalOpen || !!editingSpace && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <div className={styles['modal-header']}>
              <h3>{editingSpace ? "Edit Space" : "Create New Space"}</h3>
              <button 
                className={styles['close-button']} 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingSpace(null);
                }}
              >
                <Icon use="close" />
              </button>
            </div>
            <div className={styles['modal-content']}>
              <div className={styles['input-group']}>
                <label htmlFor="space-name" className={styles['input-label']}>Space Name</label>
                <input
                  id="space-name"
                  type="text"
                  className={styles['input']}
                  value={newSpaceName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSpaceName(e.target.value)}
                  placeholder="Enter space name"
                />
              </div>
              <div className={styles['modal-actions']}>
                <button 
                  className={styles['button-secondary']} 
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingSpace(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className={styles['button-primary']} 
                  onClick={editingSpace ? handleSaveSpace : handleCreateSpace}
                  disabled={!newSpaceName.trim()}
                >
                  {editingSpace ? "Save Changes" : "Create Space"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <div className={styles['modal-header']}>
              <h3>Delete Space</h3>
              <button 
                className={styles['close-button']} 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSpaceToDelete(null);
                }}
              >
                <Icon use="close" />
              </button>
            </div>
            <div className={styles['modal-content']}>
              <p>
                Are you sure you want to delete the space "{spaceToDelete?.name}"? 
                This action cannot be undone and all associated locations and items will be deleted.
              </p>
              <div className={styles['modal-actions']}>
                <button 
                  className={styles['button-secondary']} 
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSpaceToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className={styles['button-danger']} 
                  onClick={async () => {
                    if (spaceToDelete) {
                      await deleteSpace(spaceToDelete.id);
                      refetch();
                    }
                    setIsDeleteModalOpen(false);
                    setSpaceToDelete(null);
                  }}
                >
                  Confirm deletion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSpaces;

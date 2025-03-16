"use client";

import { useState } from 'react';
import { 
  useGetSpacesQuery, 
  useCreateSpaceMutation, 
  useUpdateSpaceMutation, 
  useDeleteSpaceMutation 
} from '@/lib/services/space';
import { Space } from '@typeDefs/space';
import { Button } from "@components/data-input/button";
import { InputFactory } from "@components/factories/input-factory";
import Modal from "@components/layout/modal";
import { DialogBox } from "@components/feedback/dialog-box";
import { Loader } from '@components/feedback/loader';
import { Tooltip } from '@components/feedback/tooltip';
import styles from './style.module.scss';

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
  
  const handleInputChange = (e: React.ChangeEvent<Element>) => {
    const target = e.target as unknown as { value: string };
    setNewSpaceName(target.value);
  };

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
        {/* <Button 
          className={styles['create-button']} 
          onClick={() => {
            setNewSpaceName('');
            setIsCreateModalOpen(true);
          }}
          icon="plus"
          label="Create New Space"
        /> */}
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
                <Tooltip content={`Edit ${space.name}`} placement="top">
                  <Button 
                    className={styles['edit-button']} 
                    onClick={() => handleEditSpace(space)}
                    icon="edit"
                    hideLabel
                    label={`Edit ${space.name}`}
                    variant="secondary"
                    circular
                    small
                    data-testid={`edit-space-${space.id}`}
                  />
                </Tooltip>
                <Tooltip content={`Delete ${space.name}`} placement="top">
                  <Button 
                    className={styles['delete-button']} 
                    onClick={() => handleDeleteSpace(space)}
                    icon="delete"
                    hideLabel
                    label={`Delete ${space.name}`}
                    variant="destroy"
                    small
                    data-testid={`delete-space-${space.id}`}
                  />
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles['empty-state']}>
          <p>You don't have any spaces yet. Create your first space to get started.</p>
        </div>
      )}

      <Modal
        isOpen={isCreateModalOpen || !!editingSpace}
        modalName={editingSpace ? "Edit Space" : "Create New Space"}
        onDismiss={() => {
          setIsCreateModalOpen(false);
          setEditingSpace(null);
        }}
        size="md"
      >
        <div className={styles['modal-content']}>
          <h3>{editingSpace ? "Edit Space" : "Create New Space"}</h3>
          <div className={styles['input-container']}>
            <InputFactory
              name="space-name"
              id="space-name"
              label="Space Name"
              variant="text"
              value={newSpaceName}
              onChange={handleInputChange}
              placeholder="Enter space name"
            />
          </div>
          <div className={styles['modal-actions']}>
            <Button 
              variant="secondary"
              label="Cancel"
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingSpace(null);
              }}
            />
            <Button 
              variant="primary"
              label={editingSpace ? "Save Changes" : "Create Space"}
              onClick={editingSpace ? handleSaveSpace : handleCreateSpace}
              disabled={!newSpaceName.trim()}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        modalName="Delete Space"
        onDismiss={() => {
          setIsDeleteModalOpen(false);
          setSpaceToDelete(null);
        }}
        size="md"
        isAlert
      >
        <DialogBox
          title="Delete Space"
          message={
            <>
              Are you sure you want to delete the space "{spaceToDelete?.name}"? 
              This action cannot be undone and all associated locations and items will be deleted.
            </>
          }
          confirmLabel="Confirm deletion"
          cancelLabel="Cancel"
          confirmVariant="destroy"
          cancelVariant="secondary"
          confirmAction={async () => {
            if (spaceToDelete) {
              await deleteSpace(spaceToDelete.id);
              refetch();
            }
            setIsDeleteModalOpen(false);
            setSpaceToDelete(null);
          }}
          cancelAction={() => {
            setIsDeleteModalOpen(false);
            setSpaceToDelete(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default ManageSpaces;

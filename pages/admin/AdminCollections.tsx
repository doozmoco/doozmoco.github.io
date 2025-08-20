
import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../../services/api';
import { Collection } from '../../types';
import Button from '../../components/Button';
import CollectionFormModal from '../../components/admin/CollectionFormModal';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminCollections: React.FC = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);

    const fetchCollections = useCallback(async () => {
        setIsLoading(true);
        try {
            const collectionsData = await api.getCollections();
            setCollections(collectionsData);
        } catch (error) {
            console.error("Failed to fetch collections", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    const handleOpenAddModal = () => {
        setCurrentCollection(null);
        setIsModalOpen(true);
    };
    
    const handleOpenEditModal = (collection: Collection) => {
        setCurrentCollection(collection);
        setIsModalOpen(true);
    };
    
    const handleOpenDeleteModal = (collection: Collection) => {
        setCurrentCollection(collection);
        setIsDeleteModalOpen(true);
    };
    
    const handleCloseModals = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        setCurrentCollection(null);
    };

    const handleSaveCollection = async (collectionData: Omit<Collection, 'id'>) => {
        try {
            if (currentCollection) {
                await api.updateCollection(currentCollection.id, collectionData);
            } else {
                await api.createCollection(collectionData);
            }
            fetchCollections();
        } catch (error) {
            console.error("Failed to save collection", error);
        } finally {
            handleCloseModals();
        }
    };
    
    const handleDeleteCollection = async () => {
        if (!currentCollection) return;
        try {
            await api.deleteCollection(currentCollection.id);
            fetchCollections();
        } catch (error) {
            console.error("Failed to delete collection", error);
        } finally {
            handleCloseModals();
        }
    };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
        <Button onClick={handleOpenAddModal}>Add New</Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading collections...</div>
        ) : collections.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-lg font-medium">No collections found</h3>
            <p className="mt-1">Click "Add New" to create your first collection.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collections.map(collection => (
                <tr key={collection.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-md object-cover mr-4" src={collection.image} alt={collection.name} />
                        <span className="text-sm font-medium text-gray-900">{collection.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-sm truncate">{collection.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenEditModal(collection)} className="text-indigo-600 hover:text-indigo-900 p-2">
                        <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(collection)} className="text-red-600 hover:text-red-900 p-2 ml-2">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CollectionFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSave={handleSaveCollection}
        collection={currentCollection}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteCollection}
        message={`Are you sure you want to delete the collection "${currentCollection?.name}"? This action cannot be undone.`}
      />

    </div>
  );
};

export default AdminCollections;
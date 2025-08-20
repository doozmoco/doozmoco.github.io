
import React, { useState, useEffect, useRef } from 'react';
import { Collection } from '../../types';
import Button from '../Button';
import { PhotoIcon } from '@heroicons/react/24/solid';

interface CollectionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collectionData: Omit<Collection, 'id'>) => void;
  collection: Collection | null;
}

const CollectionFormModal: React.FC<CollectionFormModalProps> = ({ isOpen, onClose, onSave, collection }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setDescription(collection.description || '');
      setImagePreview(collection.image);
      setImageFile(null);
    } else {
      setName('');
      setDescription('');
      setImagePreview(null);
      setImageFile(null);
    }
  }, [collection, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
        alert("Please upload an image for the collection.");
        return;
    }
    onSave({
      name,
      description,
      image: imagePreview,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{collection ? 'Edit Collection' : 'Add New Collection'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Collection Name</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent"></textarea>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700">Collection Image</label>
             <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Collection preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                    ) : (
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-brand-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 hover:text-red-800"
                        >
                            <span>{imagePreview ? 'Change image' : 'Upload an image'}</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
                        </label>
                        {!imagePreview && <p className="pl-1">or drag and drop</p>}
                    </div>
                    {!imagePreview && <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>}
                </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Collection</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionFormModal;

import React, { useState, useEffect } from 'react';
import { Product, Collection } from '../../types';
import Button from '../Button';
import { XCircleIcon, PhotoIcon } from '@heroicons/react/24/solid';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id'>) => void;
  product: Product | null;
  collections: Collection[];
}

const specialCategoriesList = [
    { id: 'new-arrivals', name: 'New Arrivals' },
    { id: 'premium-collection', name: 'Premium Collection' },
    { id: 'full-collection', name: 'Full Collection' },
    { id: 'weekly-sale', name: 'Weekly SALE' },
];

const initialState = {
    name: '',
    description: '',
    originalPrice: 0,
    price: 0,
    inventory: 0,
    images: [] as string[],
    collectionIds: [] as string[],
    specialCategories: [] as string[],
};

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, product, collections }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        originalPrice: product.originalPrice || 0,
        price: product.price,
        inventory: product.inventory,
        images: product.images,
        collectionIds: product.collectionIds,
        specialCategories: product.specialCategories,
      });
    } else {
      setFormData(initialState);
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? Math.max(0, parseFloat(value) || 0) : value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const files = Array.from(e.target.files);
        const filePromises = files.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(filePromises).then(newImages => {
            setFormData(prev => ({...prev, images: [...prev.images, ...newImages]}));
        });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'collectionIds' | 'specialCategories') => {
    const { value, checked } = e.target;
    setFormData(prev => {
        const currentValues = prev[field];
        if (checked) {
            return { ...prev, [field]: [...currentValues, value] };
        } else {
            return { ...prev, [field]: currentValues.filter(item => item !== value) };
        }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
        alert("Please upload at least one image for the product.");
        return;
    }
    const dataToSave = {
        ...formData,
        originalPrice: formData.originalPrice > 0 && formData.originalPrice > formData.price ? formData.originalPrice : undefined,
    };
    onSave(dataToSave);
  };
  
  const discount = formData.originalPrice > formData.price 
    ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) 
    : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full my-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Original Price (Optional)</label>
                    <input type="number" name="originalPrice" id="originalPrice" value={formData.originalPrice} onChange={handleChange} step="0.01" min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Final Price</label>
                    <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required step="0.01" min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500">Calculated Discount</label>
                    <div className="mt-1 flex items-center w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {discount > 0 ? (
                            <span className="text-sm font-semibold text-green-700">{discount}% OFF</span>
                        ) : (
                            <span className="text-sm text-gray-500">N/A</span>
                        )}
                    </div>
                </div>
            </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                        <img src={image} alt={`Product image ${index + 1}`} className="h-24 w-24 object-cover rounded-md" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 p-0.5 bg-white rounded-full text-red-500 hover:text-red-700 opacity-50 group-hover:opacity-100 transition-opacity">
                           <XCircleIcon className="h-6 w-6"/>
                        </button>
                    </div>
                ))}
                <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center h-24 w-24 rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-colors">
                    <PhotoIcon className="h-8 w-8" />
                    <input id="image-upload" name="image-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleFileChange} />
                </label>
            </div>
          </div>
          <div>
            <label htmlFor="inventory" className="block text-sm font-medium text-gray-700">Inventory Count</label>
            <input type="number" name="inventory" id="inventory" value={formData.inventory} onChange={handleChange} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Collections</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                {collections.map(c => (
                  <div key={c.id} className="flex items-center">
                    <input id={`collection-${c.id}`} value={c.id} type="checkbox" checked={formData.collectionIds.includes(c.id)} onChange={(e) => handleCheckboxChange(e, 'collectionIds')} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary" />
                    <label htmlFor={`collection-${c.id}`} className="ml-2 block text-sm text-gray-900">{c.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Special Categories</h3>
              <div className="space-y-2 p-2 border rounded-md">
                {specialCategoriesList.map(sc => (
                  <div key={sc.id} className="flex items-center">
                    <input id={`special-${sc.id}`} value={sc.id} type="checkbox" checked={formData.specialCategories.includes(sc.id)} onChange={(e) => handleCheckboxChange(e, 'specialCategories')} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary" />
                    <label htmlFor={`special-${sc.id}`} className="ml-2 block text-sm text-gray-900">{sc.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
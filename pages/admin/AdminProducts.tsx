
import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../../services/api';
import { Product, Collection } from '../../types';
import Button from '../../components/Button';
import ProductFormModal from '../../components/admin/ProductFormModal';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsData, collectionsData] = await Promise.all([
        api.getProducts(),
        api.getCollections()
      ]);
      setProducts(productsData);
      setCollections(collectionsData);
    } catch (error) {
      console.error("Failed to fetch products or collections", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleOpenAddModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };
    
  const handleOpenEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };
    
  const handleOpenDeleteModal = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };
    
  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id'>) => {
    try {
        if (currentProduct) {
            await api.updateProduct(currentProduct.id, productData);
        } else {
            await api.createProduct(productData);
        }
        fetchData();
    } catch (error) {
        console.error("Failed to save product", error);
    } finally {
        handleCloseModals();
    }
  };

  const handleDeleteProduct = async () => {
    if (!currentProduct) return;
    try {
        await api.deleteProduct(currentProduct.id);
        fetchData();
    } catch (error) {
        console.error("Failed to delete product", error);
    } finally {
        handleCloseModals();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Button onClick={handleOpenAddModal}>Add New</Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="mt-1">Click "Add New" to create your first product.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.inventory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenEditModal(product)} className="text-indigo-600 hover:text-indigo-900 p-2">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(product)} className="text-red-600 hover:text-red-900 p-2 ml-2">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSave={handleSaveProduct}
        product={currentProduct}
        collections={collections}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteProduct}
        message={`Are you sure you want to delete the product "${currentProduct?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminProducts;
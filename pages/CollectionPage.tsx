
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../services/api';
import { Collection, Product } from '../types';
import ProductCard from '../components/ProductCard';
import { motion, Variants } from 'framer-motion';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-10 w-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const [collectionData, productsData] = await Promise.all([
          api.getCollectionById(id),
          api.getProductsByCollectionId(id)
        ]);
        if (collectionData) {
          setCollection(collectionData);
          setProducts(productsData);
        } else {
          setCollection(null); // Not found
        }
      } catch (error) {
        console.error("Failed to fetch collection data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!collection) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Collection not found</h1>
        <p className="mt-2 text-slate-600">The collection you are looking for does not exist.</p>
        <Link to="/" className="text-brand-primary font-semibold hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">{collection.name}</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">{collection.description}</p>
      </div>

      {products.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map(product => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700">Coming Soon!</h3>
            <p className="mt-2 text-gray-500">No products have been added to this collection yet.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
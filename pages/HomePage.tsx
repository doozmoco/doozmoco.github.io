import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '../types';
import * as api from '../services/api';
import { motion, Variants } from 'framer-motion';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-10 w-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const HomePage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      // Don't set loading to true on refetch to avoid flicker
      try {
        const allCollections = await api.getCollections();
        // Sort by ID descending to ensure newest collections are always first
        const sortedCollections = allCollections.sort((a, b) => 
            parseInt(b.id.substring(1)) - parseInt(a.id.substring(1))
        );
        setCollections(sortedCollections);
      } catch (error) {
        console.error("Failed to fetch collections", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchCollections(); // Initial fetch

    const unsubscribe = api.subscribe(fetchCollections); // Subscribe to changes

    return () => {
        unsubscribe(); // Unsubscribe on cleanup
    };
  }, []); // Empty dependency array ensures this runs once and sets up the subscription.

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1610996614484-c24c237363f5?q=80&w=1932&auto=format&fit=crop" alt="Traditional Red and Gold Saree Border" className="w-full h-64 md:h-96 object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Curated Collections Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">Explore Our Artistry</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Each collection tells a story, woven with passion and artistry. Find the one that speaks to you.</p>
          
          {isLoading ? <LoadingSpinner /> : (
            collections.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {collections.map(collection => (
                    <motion.div variants={itemVariants} key={collection.id}>
                      <Link to={`/collections/${collection.id}`} className="group block">
                        <div className="overflow-hidden rounded-lg shadow-lg">
                          <img src={collection.image} alt={collection.name} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="mt-6 text-center">
                          <h3 className="text-2xl font-serif font-medium text-slate-800 group-hover:text-brand-primary transition-colors">{collection.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">View Collection</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
            ) : (
                <div className="mt-12 py-10 border-2 border-dashed border-gray-300 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700">Your store is getting ready!</h3>
                    <p className="mt-2 text-gray-500">No collections to show yet. Go to the <Link to="/admin/collections" className="text-brand-primary font-semibold hover:underline">admin panel</Link> to add your first collection.</p>
                </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
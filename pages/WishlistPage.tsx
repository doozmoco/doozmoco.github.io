
import React, { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import * as api from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-10 w-10 text-brand-dark" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const WishlistPage: React.FC = () => {
    const { wishlist } = useWishlist();
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (wishlist.length === 0) {
                setProducts([]);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                // In a real app, you'd have an API endpoint to fetch multiple products by ID
                const allProducts = await api.getProducts();
                const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));
                setProducts(wishlistProducts);
            } catch (error) {
                console.error("Failed to fetch wishlist products", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [wishlist]);
    
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">My Wishlist</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    Your collection of saved treasures. Ready to make one yours?
                </p>
            </div>
            
            {products.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {products.map(product => (
                        <div key={product.id} className="flex flex-col">
                            <ProductCard product={product} />
                            <Button 
                                onClick={() => addToCart(product, 1)} 
                                variant="secondary" 
                                className="mt-4 w-full"
                                disabled={product.inventory === 0}
                            >
                                {product.inventory > 0 ? 'Add to Cart' : 'Sold Out'}
                            </Button>
                        </div>
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-700">Your Wishlist is Empty</h3>
                    <p className="mt-2 text-gray-500">Looks like you haven't added anything yet. Find something you love!</p>
                    <Link to="/">
                        <Button className="mt-6">Start Shopping</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;

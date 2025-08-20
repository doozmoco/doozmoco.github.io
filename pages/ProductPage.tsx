
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';
import { getSareeStylingAdvice } from '../services/geminiService';
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/solid';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-10 w-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [stylingAdvice, setStylingAdvice] = useState('');
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const productData = await api.getProductById(id);
            if (productData) {
                setProduct(productData);
                setSelectedImage(productData.images[0]);
            } else {
                setProduct(null);
            }
        } catch (error) {
            console.error("Failed to fetch product", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div className="container mx-auto px-6 py-12 text-center">Product not found</div>;
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product.id);
    }
  };

  const handleAskAIStylist = async () => {
    setIsLoadingAdvice(true);
    setStylingAdvice('');
    const advice = await getSareeStylingAdvice(product);
    setStylingAdvice(advice);
    setIsLoadingAdvice(false);
  };

  const isWishlisted = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg shadow-lg mb-4">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedImage(img)} 
                className={`w-24 h-24 rounded-md overflow-hidden border-2 transition-all duration-200 ${selectedImage === img ? 'border-brand-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">{product.name}</h1>
          
          <div className="flex items-baseline flex-wrap space-x-4 mt-4">
            <p className={`text-3xl font-medium ${hasDiscount ? 'text-red-600' : 'text-slate-800'}`}>
                ${product.price.toFixed(2)}
            </p>
            {hasDiscount && (
                <p className="text-2xl text-slate-400 line-through">
                    ${product.originalPrice!.toFixed(2)}
                </p>
            )}
            {hasDiscount && (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    SAVE {discountPercentage}%
                </span>
            )}
          </div>
          
          <div className="mt-6 border-t pt-6">
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mt-8 flex items-center space-x-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              min="1"
              max={product.inventory > 0 ? product.inventory : 1}
              className="w-24 p-3 border border-gray-300 rounded-md text-center focus:ring-brand-accent focus:border-brand-accent"
              aria-label="Quantity"
              disabled={product.inventory === 0}
            />
            <Button onClick={handleAddToCart} className="flex-grow !py-3.5" disabled={product.inventory === 0}>
              {product.inventory > 0 ? 'Add to Cart' : 'Sold Out'}
            </Button>
            <Button variant="outline" onClick={handleToggleWishlist} className="!px-4 !py-3.5" aria-label="Add to wishlist">
                <HeartIcon className={`h-6 w-6 ${isWishlisted ? 'text-red-500' : 'text-gray-500'}`} />
            </Button>
          </div>

          {/* AI Stylist Section */}
          <div className="mt-12 p-6 bg-brand-light rounded-lg">
            <h3 className="text-xl font-serif font-semibold text-slate-800 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-3 text-brand-accent" />
              AI Fashion Stylist
            </h3>
            <p className="text-slate-500 mt-2">Get personalized styling advice for this saree from our Gemini-powered AI assistant.</p>
            <Button variant="secondary" onClick={handleAskAIStylist} isLoading={isLoadingAdvice} className="mt-4">
              Ask for Styling Advice
            </Button>
            {stylingAdvice && (
                <div className="mt-4 p-4 bg-white/70 rounded-md">
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">{stylingAdvice}</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
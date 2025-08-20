
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, ShoppingBagIcon } from '@heroicons/react/24/outline';


const WishlistButton: React.FC<{ product: Product }> = ({ product }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating to product page
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 text-slate-600 hover:text-brand-primary transition-all duration-300 scale-0 group-hover:scale-100"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            {isWishlisted ? <HeartSolid className="h-6 w-6 text-brand-primary" /> : <HeartOutline className="h-6 w-6" />}
        </button>
    );
};


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inventory > 0) {
      addToCart(product, 1);
    }
  };
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
    : 0;

  return (
    <motion.div whileHover={{ y: -8 }} className="h-full">
      <Link to={`/product/${product.id}`} className="group block overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden rounded-lg shadow-sm">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <WishlistButton product={product} />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-4 z-20">
            {product.inventory > 0 && (
                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center bg-white text-slate-800 font-semibold py-2 px-4 rounded-full shadow-lg opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                </button>
            )}
          </div>
          
          {hasDiscount && (
             <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                {discountPercentage}% OFF
             </div>
          )}
          
          {product.inventory === 0 && (
              <div className="absolute top-3 left-3 bg-white text-slate-700 text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                  SOLD OUT
              </div>
          )}
        </div>
        <div className="mt-4 flex-grow">
          <h3 className="text-lg font-serif text-slate-800 group-hover:text-brand-primary transition-colors">{product.name}</h3>
          <div className="mt-1 flex items-baseline space-x-2">
            <p className={`text-md font-medium ${hasDiscount ? 'text-red-600' : 'text-slate-600'}`}>
                ${product.price.toFixed(2)}
            </p>
            {hasDiscount && (
                <p className="text-sm text-slate-400 line-through">
                    ${product.originalPrice!.toFixed(2)}
                </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
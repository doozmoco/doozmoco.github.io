import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import * as api from '../services/api';
import { Collection } from '../types';
import { useClickOutside } from '../hooks/useClickOutside';
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon, ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import LogoIcon from './LogoIcon';

const NavLink: React.FC<{href: string; children: React.ReactNode;}> = ({ href, children }) => (
    <RouterNavLink to={href} className="flex items-center text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors tracking-wider uppercase">
        {children}
    </RouterNavLink>
)

const Header: React.FC = () => {
  const { toggleCart, cartCount } = useCart();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isShopByOpen, setIsShopByOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const shopByRef = useRef(null);
  const userMenuRef = useRef(null);

  useClickOutside(shopByRef, () => setIsShopByOpen(false));
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  useEffect(() => {
    const fetchCollections = async () => {
        try {
            const fetchedCollections = await api.getCollections();
            setCollections(fetchedCollections);
        } catch (error) {
            console.error("Failed to fetch collections for header", error);
        }
    };
    
    fetchCollections(); // Initial fetch
    
    const unsubscribe = api.subscribe(fetchCollections); // Subscribe to data changes

    return () => unsubscribe(); // Unsubscribe on cleanup
  }, []);

  const specialCategories = [
    { name: "New Arrivals", slug: "new-arrivals" },
    { name: "Premium Collection", slug: "premium-collection" },
    { name: "Full Collection", slug: "full-collection" },
    { name: "Weekly SALE", slug: "weekly-sale" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
           <div className="w-1/3">
             <button className="text-slate-600 hover:text-brand-primary p-2 -ml-2" aria-label="Search">
                <MagnifyingGlassIcon className="h-6 w-6" />
             </button>
           </div>
           
           <div className="w-1/3 flex justify-center">
             <Link to="/" className="group inline-flex items-center transition-colors duration-300 text-slate-900 hover:text-brand-primary">
                <LogoIcon className="h-8 w-8 text-brand-primary transition-transform duration-300 group-hover:rotate-12" />
                <span className="ml-3 text-3xl font-serif font-medium tracking-tight">
                  6 Yards by Katyayini
                </span>
             </Link>
           </div>

           <div className="w-1/3 flex justify-end items-center space-x-2">
               <div className="relative" ref={userMenuRef}>
                 {user ? (
                   <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-2 text-slate-600 hover:text-brand-primary" title="My Account">
                      <UserIcon className="h-6 w-6" />
                   </button>
                 ) : (
                   <Link to="/login" className="p-2 text-slate-600 hover:text-brand-primary" title="Login">
                      <UserIcon className="h-6 w-6" />
                   </Link>
                 )}
                 {user && isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            Signed in as <span className="font-semibold">{user.username}</span>
                        </div>
                        <Link to="/wishlist" onClick={() => setIsUserMenuOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <HeartIcon className="h-5 w-5 mr-2" /> My Wishlist
                        </Link>
                        <button onClick={logout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> Logout
                        </button>
                    </div>
                 )}
               </div>
               <Link to="/wishlist" className="relative p-2 text-slate-600 hover:text-brand-primary" aria-label="Wishlist">
                  <HeartIcon className="h-6 w-6" />
                  {wishlistCount > 0 && (
                   <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-primary text-white text-xs font-medium flex items-center justify-center">
                     {wishlistCount}
                   </span>
                 )}
               </Link>
               <button onClick={toggleCart} className="relative p-2 text-slate-600 hover:text-brand-primary" aria-label="Open cart">
                 <ShoppingBagIcon className="h-6 w-6" />
                 {cartCount > 0 && (
                   <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-primary text-white text-xs font-medium flex items-center justify-center">
                     {cartCount}
                   </span>
                 )}
               </button>
           </div>
        </div>
      </div>
      <nav className="hidden md:flex justify-center items-center space-x-8 py-3 border-t border-gray-200">
        <div className="relative" ref={shopByRef}>
            <button onClick={() => setIsShopByOpen(!isShopByOpen)} className="flex items-center text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors tracking-wider uppercase">
                Shop By
                <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${isShopByOpen ? 'rotate-180' : ''}`} />
            </button>
            {isShopByOpen && (
                <div className="absolute top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                    {collections.length > 0 ? collections.map(c => (
                        <Link key={c.id} to={`/collections/${c.id}`} onClick={() => setIsShopByOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {c.name}
                        </Link>
                    )) : (
                      <span className="block px-4 py-2 text-sm text-gray-400">No collections</span>
                    )}
                </div>
            )}
        </div>
        {specialCategories.map(cat => (
          <NavLink key={cat.slug} href={`/category/${cat.slug}`}>{cat.name}</NavLink>
        ))}
         {user && user.role === 'ADMIN' && (
            <RouterNavLink 
                to="/admin" 
                className={({ isActive }) => 
                    `flex items-center text-sm font-medium tracking-wider uppercase px-3 py-1.5 rounded-md transition-colors ${
                        isActive 
                        ? 'bg-brand-primary text-white' 
                        : 'bg-brand-accent text-slate-800 hover:bg-amber-400'
                    }`
                }
            >
                Admin Dashboard
            </RouterNavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
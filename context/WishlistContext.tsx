import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as api from '../services/api';

const GUEST_WISHLIST_KEY = '6_yards_by_katyayini_guest_wishlist';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);

  const getGuestWishlist = (): string[] => {
    try {
        const localData = localStorage.getItem(GUEST_WISHLIST_KEY);
        return localData ? JSON.parse(localData) : [];
    } catch {
        return [];
    }
  };

  useEffect(() => {
    const handleUserChange = async () => {
      if (user) {
        // User has logged in. Check for a guest wishlist to merge.
        const guestWishlist = getGuestWishlist();
        if (guestWishlist.length > 0) {
          const updatedUserWishlist = await api.mergeWishlist(user.id, guestWishlist);
          setWishlist(updatedUserWishlist);
          localStorage.removeItem(GUEST_WISHLIST_KEY); // Clean up guest data
        } else {
          // No guest wishlist, just fetch the user's existing one.
          const userWishlist = await api.getWishlist(user.id);
          setWishlist(userWishlist);
        }
      } else {
        // User is logged out or a guest, load from local storage.
        setWishlist(getGuestWishlist());
      }
    };
    handleUserChange();
  }, [user]);

  const addToWishlist = async (productId: string) => {
    if (wishlist.includes(productId)) return;
    
    // Optimistic update for better UX
    const previousWishlist = wishlist;
    setWishlist(prev => [...prev, productId]);

    try {
      if (user) {
        await api.addToWishlist(user.id, productId);
      } else {
        const guestWishlist = getGuestWishlist();
        const updatedWishlist = [...guestWishlist, productId];
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(updatedWishlist));
      }
    } catch(error) {
        console.error("Failed to add to wishlist", error);
        setWishlist(previousWishlist); // Revert on error
    }
  };
  
  const removeFromWishlist = async (productId: string) => {
    if (!wishlist.includes(productId)) return;

    // Optimistic update
    const previousWishlist = wishlist;
    setWishlist(prev => prev.filter(id => id !== productId));

    try {
      if (user) {
        await api.removeFromWishlist(user.id, productId);
      } else {
        const guestWishlist = getGuestWishlist();
        const updatedWishlist = guestWishlist.filter(id => id !== productId);
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(updatedWishlist));
      }
    } catch (error) {
        console.error("Failed to remove from wishlist", error);
        setWishlist(previousWishlist); // Revert on error
    }
  };
  
  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };
  
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
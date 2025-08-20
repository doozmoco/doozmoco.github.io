
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { CartItem, Product, PromoCode } from '../types';
import * as api from '../services/api';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  appliedPromoCode: PromoCode | null;
  applyPromoCode: (code: string) => Promise<void>;
  removePromoCode: () => void;
  discountAmount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('6_yards_by_katyayini_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedPromo = localStorage.getItem('6_yards_by_katyayini_promo');
      if (storedPromo) {
        setAppliedPromoCode(JSON.parse(storedPromo));
      }
    } catch (error) {
      console.error("Failed to parse cart/promo from localStorage", error);
      setCartItems([]);
      setAppliedPromoCode(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('6_yards_by_katyayini_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedPromoCode) {
        localStorage.setItem('6_yards_by_katyayini_promo', JSON.stringify(appliedPromoCode));
    } else {
        localStorage.removeItem('6_yards_by_katyayini_promo');
    }
  }, [appliedPromoCode]);


  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
  };

  const clearCart = () => {
    setCartItems([]);
    removePromoCode();
  };
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const applyPromoCode = async (code: string) => {
    const validatedCode = await api.validatePromoCode(code);
    if (validatedCode) {
        setAppliedPromoCode(validatedCode);
    } else {
        throw new Error("Invalid promo code");
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromoCode) {
    if (appliedPromoCode.type === 'PERCENTAGE') {
        discountAmount = cartSubtotal * (appliedPromoCode.discount / 100);
    } else {
        discountAmount = appliedPromoCode.discount;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <CartContext.Provider value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        isCartOpen, 
        toggleCart, 
        cartCount, 
        cartSubtotal,
        appliedPromoCode,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

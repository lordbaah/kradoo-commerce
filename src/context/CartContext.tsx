import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { ProductProps } from '../types/index';

interface CartItem extends ProductProps {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: ProductProps) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  isInCart: (id: number) => boolean;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

// Lazy state initialization to prevent setState during render
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      const parsed = storedCart ? JSON.parse(storedCart) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  // Persist cart to localStorage on every update
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductProps) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success('Increased quantity');
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success('Added to cart');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error('Removed from cart');
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const isInCart = (id: number) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

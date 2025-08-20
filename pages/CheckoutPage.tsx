
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import * as api from '../services/api';
import Button from '../components/Button';
import { OrderItem, PromoCode } from '../types';
import { TicketIcon } from '@heroicons/react/24/outline';


const PromoCodeSection: React.FC = () => {
  const { applyPromoCode, removePromoCode, appliedPromoCode } = useCart();
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyPromoCode = async () => {
    if (!promoCodeInput) return;
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await applyPromoCode(promoCodeInput);
      setSuccess(`Promo code applied!`);
      setPromoCodeInput('');
    } catch (err) {
      setError('Invalid or expired promo code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Promo Code</h3>
        {!appliedPromoCode ? (
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter code"
                    className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
                />
                <Button variant="outline" onClick={handleApplyPromoCode} isLoading={isLoading}>
                    Apply
                </Button>
            </div>
        ) : (
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-md text-green-700">
                <p className="text-sm font-medium flex items-center">
                    <TicketIcon className="h-5 w-5 mr-2"/> Code "{appliedPromoCode.code}" is active.
                </p>
                <button onClick={removePromoCode} className="font-semibold text-sm hover:text-green-900">Remove</button>
            </div>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
    </div>
  )
}


const CheckoutPage: React.FC = () => {
  const { cartItems, cartSubtotal, discountAmount, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
      name: '',
      address: '',
      phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({...prev, [id]: value}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderItems: OrderItem[] = cartItems.map(item => ({
      id: item.id,
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    try {
      await api.createOrder({
        customerName: formData.name,
        address: formData.address,
        phone: formData.phone,
        items: orderItems,
        total: cartTotal, // Use the final total after discount
      });
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Failed to place order", error);
      alert("There was an issue placing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Thank you for your order!</h1>
        <p className="mt-4 text-slate-600">Your order has been placed successfully. A confirmation email will be sent to you shortly.</p>
        <Button onClick={() => navigate('/')} className="mt-8">Continue Shopping</Button>
      </div>
    );
  }
  
  if (cartItems.length === 0 && !orderPlaced) {
      return (
          <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-3xl font-serif font-bold text-slate-900">Your cart is empty.</h1>
            <p className="mt-4 text-slate-600">You can't proceed to checkout without any items.</p>
            <Button onClick={() => navigate('/')} className="mt-8">Go Shopping</Button>
          </div>
      )
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12 lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Customer Information Form */}
        <div className="mb-12 lg:mb-0">
          <h2 className="text-2xl font-serif font-bold mb-6">Contact Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <input type="text" id="address" value={formData.address} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-serif font-bold mb-4">Payment</h2>
              <div className="p-4 border rounded-md bg-gray-50">
                <p className="text-sm text-gray-600">This is a demo. No real payment will be processed. Click below to simulate a successful checkout.</p>
              </div>
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full" isLoading={isProcessing}>
                {isProcessing ? 'Processing Order...' : `Pay $${cartTotal.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-brand-light p-8 rounded-lg">
          <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover rounded-md"/>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <PromoCodeSection />
          
          <div className="border-t my-6"></div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${cartSubtotal.toFixed(2)}</p>
            </div>
            {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                    <p>Discount</p>
                    <p>-${discountAmount.toFixed(2)}</p>
                </div>
            )}
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>FREE</p>
            </div>
          </div>
          <div className="border-t my-6"></div>
          <div className="flex justify-between font-bold text-xl">
            <p>Total</p>
            <p>${cartTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
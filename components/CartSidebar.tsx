
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { XMarkIcon, TrashIcon, TicketIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const PromoCodeSection: React.FC = () => {
  const { applyPromoCode, removePromoCode, appliedPromoCode, discountAmount } = useCart();
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
      setSuccess(`Promo code "${promoCodeInput.toUpperCase()}" applied!`);
      setPromoCodeInput('');
    } catch (err) {
      setError('Invalid or expired promo code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePromoCode = () => {
    removePromoCode();
    setSuccess('Promo code removed.');
    setError('');
  }

  return (
    <div className="py-4">
      {appliedPromoCode ? (
        <div className="p-3 bg-green-50 rounded-md text-green-700">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">
              <TicketIcon className="h-5 w-5 inline-block mr-2" />
              Code "{appliedPromoCode.code}" applied!
            </p>
            <button onClick={handleRemovePromoCode} className="font-bold text-sm hover:text-green-900">Remove</button>
          </div>
          <p className="text-sm mt-1">You saved ${discountAmount.toFixed(2)}</p>
        </div>
      ) : (
        <>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-grow p-2 border rounded-md text-sm"
                    aria-label="Promo Code"
                />
                <Button variant="outline" onClick={handleApplyPromoCode} isLoading={isLoading} className="!px-4 !py-2">
                    Apply
                </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && !appliedPromoCode && <p className="text-green-600 text-sm mt-2">{success}</p>}
        </>
      )}
    </div>
  );
};


const CartSidebar: React.FC = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartSubtotal, discountAmount, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleCart}>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col animate-slide-in-right`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-serif font-semibold">Shopping Cart</h2>
          <button onClick={toggleCart} className="p-2 text-gray-500 hover:text-gray-800">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <p className="text-gray-500">Your cart is empty.</p>
            <Button variant="secondary" onClick={toggleCart} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-start space-x-4">
                  <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="w-16 p-1 border rounded-md text-center"
                        aria-label="Quantity"
                      />
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-1 text-gray-400 hover:text-red-500">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 border-t">
              <PromoCodeSection />
              <div className="space-y-2 text-sm mt-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                     <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center font-semibold text-lg pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 my-4">Shipping & taxes calculated at checkout.</p>
              <Link to="/checkout" onClick={toggleCart} className="w-full">
                <Button className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;

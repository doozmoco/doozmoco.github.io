
import { Product, Collection, Order, PromoCode, User } from '../types';

export let COLLECTIONS: Collection[] = [];

export let PRODUCTS: Product[] = [];

export let ORDERS: Order[] = [];

export const PROMO_CODES: PromoCode[] = [
    { code: 'WELCOME10', type: 'PERCENTAGE', discount: 10 },
    { code: 'SAREELOVE', type: 'FIXED', discount: 20 },
];

export let USERS: User[] = [];

// Storing wishlists as a Record mapping userId to an array of productIds
export let WISHLISTS: Record<string, string[]> = {};

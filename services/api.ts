import { Product, Collection, Order, OrderStatus, OrderItem, PromoCode, User } from '../types';
import { 
    COLLECTIONS as initialCollections, 
    PRODUCTS as initialProducts, 
    ORDERS as initialOrders,
    PROMO_CODES, // This one is static, no need to persist changes.
    USERS as initialUsers,
    WISHLISTS as initialWishlists 
} from '../data/mockData';

const MOCK_DELAY = 300; // ms

// --- Pub/Sub System for Live Data Updates ---
type Listener = () => void;
const listeners: Listener[] = [];

export const subscribe = (listener: Listener): (() => void) => {
    listeners.push(listener);
    return () => { // Unsubscribe function
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
};

const notify = () => {
    listeners.forEach(listener => listener());
};


// --- LocalStorage Persistence Layer ---
const saveData = (key: string, data: any) => {
    try {
        localStorage.setItem(`6_yards_${key}`, JSON.stringify(data));
    } catch (e) {
        console.error(`Failed to save ${key} to localStorage`, e);
    }
};

const loadData = <T>(key: string, defaultValue: T): T => {
    try {
        const storedData = localStorage.getItem(`6_yards_${key}`);
        if (storedData) {
            return JSON.parse(storedData);
        }
    } catch (e) {
        console.error(`Failed to load ${key} from localStorage`, e);
    }
    return defaultValue;
};

// --- In-memory state, loaded from localStorage or initial data ---
let COLLECTIONS: Collection[] = loadData('collections', initialCollections);
let PRODUCTS: Product[] = loadData('products', initialProducts);
let ORDERS: Order[] = loadData('orders', initialOrders);
let USERS: User[] = loadData('users', initialUsers);
let WISHLISTS: Record<string, string[]> = loadData('wishlists', initialWishlists);


// --- Users ---
export const registerUser = (username: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (USERS.find(u => u.username.toLowerCase() === username.toLowerCase())) {
                reject(new Error("Username already exists."));
                return;
            }
            const newUser: User = {
                id: `u${Date.now()}`,
                username,
                role: 'CUSTOMER',
            };
            USERS.push(newUser);
            WISHLISTS[newUser.id] = []; // Initialize empty wishlist
            saveData('users', USERS);
            saveData('wishlists', WISHLISTS);
            notify();
            resolve(newUser);
        }, MOCK_DELAY);
    });
};

export const loginUser = (username: string, password: string): Promise<User | null> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (username.toLowerCase() === 'admin' && password === 'admin') {
                const adminUser: User = { id: 'admin-user', username: 'admin', role: 'ADMIN' };
                if (!USERS.find(u => u.id === 'admin-user')) {
                    USERS.push(adminUser);
                    saveData('users', USERS);
                    notify();
                }
                resolve(adminUser);
                return;
            }
            let user = USERS.find(u => u.username.toLowerCase() === username.toLowerCase() && u.role === 'CUSTOMER');
            if (!user) {
                user = { id: `u${Date.now()}`, username, role: 'CUSTOMER' };
                USERS.push(user);
                WISHLISTS[user.id] = [];
                saveData('users', USERS);
                saveData('wishlists', WISHLISTS);
                notify();
            }
            resolve(user);
        }, MOCK_DELAY);
    });
};

export const findOrCreateGoogleUser = (): Promise<User> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const googleId = 'mock-google-id-12345';
            let user = USERS.find(u => u.googleId === googleId);
            if (!user) {
                user = {
                    id: `u${Date.now()}`,
                    username: 'Google User',
                    role: 'CUSTOMER',
                    googleId: googleId,
                };
                USERS.push(user);
                WISHLISTS[user.id] = [];
                saveData('users', USERS);
                saveData('wishlists', WISHLISTS);
                notify();
            }
            resolve(user);
        }, MOCK_DELAY);
    });
};


// --- Wishlists ---
export const getWishlist = (userId: string): Promise<string[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(WISHLISTS[userId] || []);
        }, MOCK_DELAY);
    });
};

export const addToWishlist = (userId: string, productId: string): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!WISHLISTS[userId]) WISHLISTS[userId] = [];
            if (!WISHLISTS[userId].includes(productId)) {
                WISHLISTS[userId].push(productId);
                saveData('wishlists', WISHLISTS);
                notify();
            }
            resolve();
        }, MOCK_DELAY);
    });
};

export const removeFromWishlist = (userId: string, productId: string): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (WISHLISTS[userId]) {
                WISHLISTS[userId] = WISHLISTS[userId].filter(id => id !== productId);
                saveData('wishlists', WISHLISTS);
                notify();
            }
            resolve();
        }, MOCK_DELAY);
    });
};

export const mergeWishlist = (userId: string, guestWishlist: string[]): Promise<string[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!WISHLISTS[userId]) WISHLISTS[userId] = [];
            const userWishlist = new Set(WISHLISTS[userId]);
            guestWishlist.forEach(productId => userWishlist.add(productId));
            WISHLISTS[userId] = Array.from(userWishlist);
            saveData('wishlists', WISHLISTS);
            notify();
            resolve(WISHLISTS[userId]);
        }, MOCK_DELAY);
    });
}


// --- Promo Codes ---
export const validatePromoCode = (code: string): Promise<PromoCode | null> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const foundCode = PROMO_CODES.find(p => p.code.toUpperCase() === code.toUpperCase());
            resolve(foundCode || null);
        }, MOCK_DELAY);
    });
};


// --- Collections ---
export const getCollections = (): Promise<Collection[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...COLLECTIONS]);
    }, MOCK_DELAY);
  });
};

export const getCollectionById = (id: string): Promise<Collection | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(COLLECTIONS.find(c => c.id === id));
    }, MOCK_DELAY);
  });
};

export const createCollection = (data: Omit<Collection, 'id'>): Promise<Collection> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newCollection: Collection = {
                ...data,
                id: `c${Date.now()}`
            };
            COLLECTIONS.unshift(newCollection);
            saveData('collections', COLLECTIONS);
            notify();
            resolve(newCollection);
        }, MOCK_DELAY);
    });
};

export const updateCollection = (id: string, data: Omit<Collection, 'id'>): Promise<Collection> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = COLLECTIONS.findIndex(c => c.id === id);
            if (index !== -1) {
                COLLECTIONS[index] = { ...COLLECTIONS[index], ...data };
                saveData('collections', COLLECTIONS);
                notify();
                resolve(COLLECTIONS[index]);
            } else {
                reject(new Error("Collection not found"));
            }
        }, MOCK_DELAY);
    });
};

export const deleteCollection = (id: string): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const index = COLLECTIONS.findIndex(c => c.id === id);
            if (index > -1) {
                COLLECTIONS.splice(index, 1);
            }
            PRODUCTS.forEach(p => {
                p.collectionIds = p.collectionIds.filter(cid => cid !== id);
            });
            saveData('collections', COLLECTIONS);
            saveData('products', PRODUCTS);
            notify();
            resolve();
        }, MOCK_DELAY);
    });
};

// --- Products ---
export const getProducts = (): Promise<Product[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([...PRODUCTS]);
        }, MOCK_DELAY);
    });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(PRODUCTS.find(p => p.id === id));
    }, MOCK_DELAY);
  });
};

export const getProductsByCollectionId = (collectionId: string): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(PRODUCTS.filter(p => p.collectionIds.includes(collectionId)));
    }, MOCK_DELAY);
  });
};

export const getProductsBySpecialCategory = (categorySlug: string): Promise<Product[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(PRODUCTS.filter(p => p.specialCategories.includes(categorySlug)));
      }, MOCK_DELAY);
    });
  };

export const createProduct = (data: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newProduct: Product = {
                ...data,
                id: `p${Date.now()}`
            };
            PRODUCTS.push(newProduct);
            saveData('products', PRODUCTS);
            notify();
            resolve(newProduct);
        }, MOCK_DELAY);
    });
};

export const updateProduct = (id: string, data: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = PRODUCTS.findIndex(p => p.id === id);
            if (index !== -1) {
                PRODUCTS[index] = { ...PRODUCTS[index], ...data };
                saveData('products', PRODUCTS);
                notify();
                resolve(PRODUCTS[index]);
            } else {
                reject(new Error("Product not found"));
            }
        }, MOCK_DELAY);
    });
};

export const deleteProduct = (id: string): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const index = PRODUCTS.findIndex(p => p.id === id);
            if (index > -1) {
                PRODUCTS.splice(index, 1);
                saveData('products', PRODUCTS);
                notify();
            }
            resolve();
        }, MOCK_DELAY);
    });
};


// --- Orders ---
export const getOrders = (): Promise<Order[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([...ORDERS]);
        }, MOCK_DELAY);
    });
};

interface CreateOrderData {
    customerName: string;
    address: string;
    phone: string;
    items: OrderItem[];
    total: number;
}

export const createOrder = (orderData: CreateOrderData): Promise<Order> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // First, validate that all items are in stock
            for (const item of orderData.items) {
                const product = PRODUCTS.find(p => p.id === item.productId);
                if (!product || product.inventory < item.quantity) {
                    // Reject the promise if any item is out of stock
                    reject(new Error(`Not enough stock for ${item.productName}. Please adjust your cart.`));
                    return;
                }
            }

            // If all items are in stock, proceed to create the order and decrement inventory
            orderData.items.forEach(item => {
                const productIndex = PRODUCTS.findIndex(p => p.id === item.productId);
                if (productIndex !== -1) {
                    PRODUCTS[productIndex].inventory -= item.quantity;
                }
            });
            // Persist the updated product inventory
            saveData('products', PRODUCTS);

            const newOrder: Order = {
                ...orderData,
                id: `o${ORDERS.length + 1}`,
                status: OrderStatus.PROCESSING,
                createdAt: new Date().toISOString(),
            };
            ORDERS.push(newOrder);
            saveData('orders', ORDERS);
            notify();
            resolve(newOrder);
        }, 1000);
    });
};
// Cart service for local cart management
// This service manages the cart state locally since the cart is temporary
// Order creation will happen through the orderService when user checks out

import { CartItem } from "@/types";

class CartService {
  private readonly STORAGE_KEY = "cart-items";

  // Get cart items from localStorage
  getCartItems(): CartItem[] {
    if (typeof window === "undefined") return [];
    
    const cartItems = localStorage.getItem(this.STORAGE_KEY);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  // Save cart items to localStorage
  private saveCartItems(items: CartItem[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  // Add item to cart
  addToCart(product: CartItem): void {
    const cartItems = this.getCartItems();
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Item already exists, increase quantity
      cartItems[existingItemIndex].quantity += product.quantity;
    } else {
      // New item, add to cart
      cartItems.push(product);
    }

    this.saveCartItems(cartItems);
  }

  // Remove item from cart
  removeFromCart(productId: number): void {
    const cartItems = this.getCartItems();
    const filteredItems = cartItems.filter(item => item.id !== productId);
    this.saveCartItems(filteredItems);
  }

  // Update item quantity
  updateQuantity(productId: number, quantity: number): void {
    const cartItems = this.getCartItems();
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity = quantity;
      this.saveCartItems(cartItems);
    }
  }

  // Clear entire cart
  clearCart(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Get cart totals
  getCartTotals() {
    const cartItems = this.getCartItems();
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = 5; // $5 flat rate
    const total = subtotal + tax + shipping;

    return {
      itemCount,
      subtotal,
      tax,
      shipping,
      total,
    };
  }

  // Check if product is in cart
  isInCart(productId: number): boolean {
    const cartItems = this.getCartItems();
    return cartItems.some(item => item.id === productId);
  }

  // Get item quantity in cart
  getItemQuantity(productId: number): number {
    const cartItems = this.getCartItems();
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }
}

// Export singleton instance
export const cartService = new CartService();
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Product type
type Product = {
  _id: string;
  name: string;
  price: string;
  image: string[] | string;
  quantity: number;
};

// Create cartSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] as Product[],
  },
  reducers: {
    // Add to cart
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(item => item._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove from cart
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },

    // Decrease quantity
    decreaseQty(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i._id !== action.payload);
        }
      }
    },

    // Clear cart
    clearCart(state) {
      state.items = [];
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

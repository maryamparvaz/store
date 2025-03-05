
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import { RootState } from '.';

const sampleBase64Image = 'data:image/jpeg;base64,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';

const initialProducts: Product[] = [
 
];

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: initialProducts,
  selectedProduct: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct = state.products.find(product => product.id === action.payload) || null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  }
});

export const selectProducts = (state: RootState) => state.products.products;

export const { addProduct, updateProduct, deleteProduct, selectProduct, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

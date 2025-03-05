
import { RootState } from '../redux';

// Save state to localStorage
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart,
      products: state.products,
      auth: {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        error: null
      }
    });
    localStorage.setItem('medalMarketState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('medalMarketState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

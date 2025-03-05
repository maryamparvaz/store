
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux';
import MuiThemeProvider from './MuiThemeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    </Provider>
  );
};

export default Providers;

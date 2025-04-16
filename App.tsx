import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Dashboard from './src/screens/Dashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;

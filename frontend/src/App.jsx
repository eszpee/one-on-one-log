import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FUTURE_FLAGS } from './router/routerConfig';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <BrowserRouter future={FUTURE_FLAGS}>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

import "./index.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from './app/pages/Home';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Home />);
}

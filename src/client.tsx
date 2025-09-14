import "@/styles/index.css";
import { createRoot } from 'react-dom/client';
import { Home } from '@/pages';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Home />);
}

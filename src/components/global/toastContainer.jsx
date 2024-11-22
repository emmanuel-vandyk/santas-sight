import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { christmasTheme } from '@/hooks/useToast';

export const ChristmasToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme={christmasTheme}
  />
);
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Backdrop from '@/components/Backdrop';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import CheckoutModal from '@/components/CheckoutModal';
import AccountModal from '@/components/AccountModal';

export const metadata = {
  title: 'Genjis — Canvas Sneakers',
  description: 'Canvas sneakers designed in India, for India — built to survive the commute.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <PromoBar />
          <Header />
          {children}
          <Footer />

          <Backdrop />
          <CartDrawer />
          <ProductModal />
          <CheckoutModal />
          <AccountModal />
        </StoreProvider>
      </body>
    </html>
  );
}

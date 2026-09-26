import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CityEditions from '@/components/CityEditions';
import CraftSection from '@/components/CraftSection';
import FeaturesSection from '@/components/FeaturesSection';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Backdrop from '@/components/Backdrop';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import CheckoutModal from '@/components/CheckoutModal';
import AccountModal from '@/components/AccountModal';

export default function Home() {
  return (
    <>
      <PromoBar />
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <CityEditions />
        <CraftSection />
        <FeaturesSection />
        <Testimonials />
      </main>
      <Footer />

      <Backdrop />
      <CartDrawer />
      <ProductModal />
      <CheckoutModal />
      <AccountModal />
    </>
  );
}

import Hero from '@/components/Hero';
import CityCollage from '@/components/CityCollage';
import CollectionsTeaser from '@/components/CollectionsTeaser';
import CraftSection from '@/components/CraftSection';
import FeaturesSection from '@/components/FeaturesSection';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <CityCollage />
      <CollectionsTeaser />
      <CraftSection />
      <FeaturesSection />
      <Testimonials />
    </main>
  );
}

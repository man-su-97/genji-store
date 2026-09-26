import ShopGrid from '@/components/ShopGrid';

export const metadata = {
  title: 'Shop — Genjis',
  description: 'The full Genjis canvas sneaker catalogue — core range and city editions, filterable and sortable.',
};

export default function ShopPage() {
  return (
    <main>
      <ShopGrid />
    </main>
  );
}

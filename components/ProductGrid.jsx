import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <section className="section" id="shop">
      <div className="wrap">
        <div className="section-head">
          <h2>Pick your route</h2>
          <p>
            Three canvas builds for three kinds of Indian day — the daily commute, the long shift, and the
            monsoon that shows up uninvited.
          </p>
        </div>
        <div className="product-grid">
          <ProductCard id="mumbai-low" />
          <ProductCard id="local-high" />
          <ProductCard id="monsoon-slip" />
        </div>
      </div>
    </section>
  );
}

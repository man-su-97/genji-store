'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from './ProductCard';

const SORTS = {
  featured: { label: 'Featured', compare: null },
  'price-asc': { label: 'Price: Low to High', compare: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: High to Low', compare: (a, b) => b.price - a.price },
  'name-asc': { label: 'Name: A–Z', compare: (a, b) => a.name.localeCompare(b.name) },
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'core', label: 'Core range' },
  { id: 'city-edition', label: 'City editions' },
];

export default function ShopGrid() {
  const { PRODUCTS } = useStore();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');

  const ids = useMemo(() => {
    let list = Object.keys(PRODUCTS);
    if (filter !== 'all') {
      list = list.filter((id) => PRODUCTS[id].category === filter);
    }
    const compare = SORTS[sort].compare;
    if (compare) {
      list = [...list].sort((a, b) => compare(PRODUCTS[a], PRODUCTS[b]));
    }
    return list;
  }, [PRODUCTS, filter, sort]);

  return (
    <section className="section shop-section">
      <div className="wrap">
        <div className="section-head">
          <h2>Shop the collection</h2>
          <p>Every canvas build we make — the daily-wear core range and the limited city editions, in one place.</p>
        </div>

        <div className="shop-toolbar">
          <div className="shop-filters" role="group" aria-label="Filter by collection">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`shop-filter-pill${filter === f.id ? ' active' : ''}`}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="shop-sort">
            <label htmlFor="shop-sort-select">Sort by</label>
            <select id="shop-sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="shop-count">
          {ids.length} {ids.length === 1 ? 'pair' : 'pairs'}
        </p>

        {ids.length > 0 ? (
          <div className="product-grid shop-grid">
            {ids.map((id) => (
              <ProductCard key={id} id={id} />
            ))}
          </div>
        ) : (
          <p className="shop-empty">Nothing matches that filter yet.</p>
        )}
      </div>
    </section>
  );
}

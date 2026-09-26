'use client';

import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/format';
import ShoeIllustration from './ShoeIllustration';

const SIZES = [6, 7, 8, 9, 10, 11];

export default function ProductCard({ id }) {
  const { PRODUCTS, addToCart, setProductModalId } = useStore();
  const p = PRODUCTS[id];

  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  function openDetails() {
    setProductModalId(id);
  }

  function handleAdd() {
    if (!size) {
      setError('Pick a size first.');
      return;
    }
    setError('');
    addToCart(id, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  }

  return (
    <div className="product-card">
      <div
        className="shoe-holder view-details"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${p.name}`}
        onClick={openDetails}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDetails();
          }
        }}
      >
        <ShoeIllustration color={p.color} accent={p.accent} />
      </div>

      <h3>
        <button type="button" className="link-plain" onClick={openDetails}>
          {p.name}
        </button>
      </h3>

      <p className="desc">{p.shortDesc}</p>

      <div className="product-meta">
        <span className="price">{fmt(p.price)}</span>
        <div className="dots">
          {p.dots.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
      </div>

      <button type="button" className="link-btn" onClick={openDetails}>
        View full details
      </button>

      <div className="size-row">
        <select
          className="size-select"
          aria-label={`Select size for ${p.name}`}
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
            setError('');
          }}
        >
          <option value="">Select size (UK)</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="add-row">
        <button className="btn full" type="button" onClick={handleAdd}>
          {added ? 'Added \u2713' : 'Add to cart'}
        </button>
        <span className="add-err">{error}</span>
      </div>
    </div>
  );
}

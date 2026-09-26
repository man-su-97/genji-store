'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/format';
import { flyShoeToCart } from '@/lib/flyToCart';
import ShoeIllustration from './ShoeIllustration';

const SIZES = [6, 7, 8, 9, 10, 11];

export default function ProductModal() {
  const { PRODUCTS, COUPONS, productModalId, setProductModalId, addToCart } = useStore();
  const shoeRef = useRef(null);

  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSize('');
    setError('');
    setAdded(false);
  }, [productModalId]);

  const p = productModalId ? PRODUCTS[productModalId] : null;

  function handleAdd() {
    if (!size) {
      setError('Pick a size first.');
      return;
    }
    setError('');
    addToCart(productModalId, size);
    flyShoeToCart(shoeRef.current);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  }

  const applicableCoupons = p
    ? Object.entries(COUPONS).filter(([, c]) => c.appliesTo === 'all' || c.appliesTo === productModalId)
    : [];

  return (
    <div className={`modal-overlay${productModalId ? ' show' : ''}`}>
      {p && (
        <div className="modal-card" style={{ maxWidth: 640 }}>
          <div className="modal-head">
            <h3>{p.name}</h3>
            <button className="icon-close" onClick={() => setProductModalId(null)} aria-label="Close product details">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>

          <div className="pd-shoe" ref={shoeRef}>
            <ShoeIllustration color={p.color} accent={p.accent} />
          </div>

          <p className="pd-tagline">{p.tagline}</p>
          <p className="pd-desc">{p.description}</p>

          <ul className="pd-features">
            {p.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <div className="pd-coupons">
            {applicableCoupons.map(([code, c]) => (
              <span className="pd-coupon-chip" key={code}>
                {code} &mdash; {c.label}
              </span>
            ))}
          </div>

          <div className="size-row" style={{ borderTop: 'none', paddingTop: 0 }}>
            <select
              aria-label="Select size"
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
            <button className="btn full" onClick={handleAdd}>
              {added ? 'Added \u2713' : `Add to cart \u2014 ${fmt(p.price)}`}
            </button>
            <span className="add-err">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}

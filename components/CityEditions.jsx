'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/format';
import { CITY_EDITION_IDS } from '@/lib/products';
import ShoeIllustration from './ShoeIllustration';

const SIZES = [6, 7, 8, 9, 10, 11];

function StationCard({ id }) {
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
    <div className="station-card">
      <div className="station-stop">
        <span className="dot" style={{ background: p.color }} />
        <span className="code">{p.code}</span>
        <span className="city-name">{p.city}</span>
      </div>

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

      <p className="station-limited">This run only — {p.limited} pairs.</p>

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
          {added ? 'Added ✓' : 'Add to cart'}
        </button>
        <span className="add-err">{error}</span>
      </div>
    </div>
  );
}

export default function CityEditions() {
  const trackRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section city-line" id="city-editions">
      <div className="wrap">
        <div className="section-head">
          <h2>The India Line</h2>
          <p>
            Six cities, six colourways — one canvas-and-rubber build, recoloured and detailed after something
            specific to each stop. Same fit and sole as the core range.
          </p>
        </div>
      </div>

      <div className={`line-track${inView ? ' in-view' : ''}`} ref={trackRef}>
        {CITY_EDITION_IDS.map((id) => (
          <StationCard key={id} id={id} />
        ))}
      </div>
    </section>
  );
}

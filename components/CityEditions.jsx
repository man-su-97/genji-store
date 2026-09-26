'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/format';
import { flyShoeToCart } from '@/lib/flyToCart';
import { CITY_EDITION_IDS } from '@/lib/products';
import ShoeIllustration from './ShoeIllustration';
import CitySkyline from './CitySkyline';

const SIZES = [6, 7, 8, 9, 10, 11];

// Real photo art where we have it; falls back to the hand-drawn CitySkyline SVG otherwise.
// `position` keeps each poster's title/landmark in frame in this wide media panel instead
// of a plain center-crop, which was cutting the city name off the top of several posters.
const PHOTO_MAP = {
  'jaipur-jaali': { src: '/images/collage-jaipur.jpg', position: '50% 10%' },
  'varanasi-ghat': { src: '/images/collage-varanasi.jpg', position: '50% 10%' },
  'kolkata-tram': { src: '/images/showcase-kolkata.jpg', position: '50% 28%' },
  'chennai-filter': { src: '/images/showcase-chennai.jpg', position: '50% 12%' },
  'hyderabad-pearl': { src: '/images/showcase-hyderabad.jpg', position: '50% 15%' },
  'kochi-backwater': { src: '/images/showcase-kerala.jpg', position: '50% 12%' },
};

function ShowcaseRow({ id, index }) {
  const { PRODUCTS, addToCart, setProductModalId } = useStore();
  const p = PRODUCTS[id];
  const shoeRef = useRef(null);

  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const [settled, setSettled] = useState(false);

  // One-time settle-in animation for the shoe when this row first scrolls into view.
  // The shoe's resting CSS position is always correct with or without this class — the
  // animation only plays *into* that position, it never hides content while waiting.
  useEffect(() => {
    const el = shoeRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSettled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    flyShoeToCart(shoeRef.current);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  }

  const reversed = index % 2 === 1;

  return (
    <div className={`showcase-row${reversed ? ' reversed' : ''}`}>
      <div
        className="showcase-media"
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
        {PHOTO_MAP[id] ? (
          <Image
            src={PHOTO_MAP[id].src}
            alt={`${p.city}, India`}
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="showcase-photo"
            style={{ objectPosition: PHOTO_MAP[id].position }}
          />
        ) : (
          <CitySkyline id={id} />
        )}
      </div>

      <div className="showcase-body">
        <div className="showcase-eyebrow">
          <span className="dot" style={{ background: p.color }} />
          <span className="code">{p.code}</span>
          <span className="city-name">{p.city}</span>
        </div>

        <div className={`showcase-shoe${settled ? ' settle-in' : ''}`} ref={shoeRef}>
          <button type="button" onClick={openDetails} aria-label={`View details for ${p.name}`}>
            <ShoeIllustration color={p.color} accent={p.accent} />
          </button>
        </div>

        <h3>
          <button type="button" className="link-plain" onClick={openDetails}>
            {p.name}
          </button>
        </h3>

        <p className="desc">{p.description}</p>

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
    </div>
  );
}

export default function CityEditions() {
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

        <div className="city-showcase">
          {CITY_EDITION_IDS.map((id, index) => (
            <ShowcaseRow key={id} id={id} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

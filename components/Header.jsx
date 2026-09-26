'use client';

import { useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function Header() {
  const { cart, setCartOpen, setAccountOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header>
      <div className="wrap">
        <div className="logo">
          GENJIS<span>.</span>
        </div>
        <nav className="primary">
          <div className="navlinks">
            <a className="navlink" href="#shop">Shop</a>
            <a className="navlink" href="#craft">Craft</a>
            <a className="navlink" href="#stores">Stores</a>
          </div>
          <a className="btn outline" href="#shop">Shop now</a>

          <button className="cart-btn" onClick={() => setAccountOpen(true)} aria-label="Your account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
          </button>

          <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L4.5 3H2" />
              <circle cx="9.5" cy="19" r="1.4" />
              <circle cx="17" cy="19" r="1.4" />
            </svg>
            <span className={`cart-badge${totalQty === 0 ? ' hidden' : ''}`}>{totalQty}</span>
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </nav>
      </div>

      <div className={`mobile-panel${menuOpen ? ' open' : ''}`}>
        <a href="#shop" onClick={closeMenu}>Shop</a>
        <a href="#craft" onClick={closeMenu}>Craft</a>
        <a href="#stores" onClick={closeMenu}>Stores</a>
        <a className="btn" href="#shop" style={{ width: 'fit-content' }} onClick={closeMenu}>
          Shop now
        </a>
      </div>
    </header>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setMsg('Enter a valid email address.');
      return;
    }
    setMsg("You're on the list — first access to new drops.");
    setEmail('');
  }

  return (
    <footer id="stores">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Link href="/" className="logo">
              GENJIS<span>.</span>
            </Link>
            <p>
              Canvas sneakers designed in India, for India — built to survive the commute, not just the catalog
              shoot.
            </p>
            <form className="newsletter" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Notify me</button>
            </form>
            <p style={{ fontSize: 13, color: 'var(--mustard-deep)', marginTop: 10, minHeight: 16 }}>{msg}</p>
          </div>

          <div className="foot-col">
            <h4>Shop</h4>
            <Link href="/shop">The Mumbai Low</Link>
            <Link href="/shop">The Local High</Link>
            <Link href="/shop">The Monsoon Slip</Link>
            <Link href="/city-editions">City Editions</Link>
          </div>

          <div className="foot-col">
            <h4>City Editions</h4>
            <Link href="/city-editions">Jaipur &middot; Johari Bazaar</Link>
            <Link href="/city-editions">Kolkata &middot; Park Street</Link>
            <Link href="/city-editions">Varanasi &middot; Dashashwamedh Ghat</Link>
            <Link href="/city-editions">Chennai &middot; Mylapore</Link>
            <Link href="/city-editions">Hyderabad &middot; Charminar</Link>
            <Link href="/city-editions">Kerala &middot; Fort Kochi</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span>&copy; 2026 Genjis Footwear Co. All rights reserved.</span>
          <span>Made in India, worn everywhere.</span>
        </div>
      </div>
    </footer>
  );
}

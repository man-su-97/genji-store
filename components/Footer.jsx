'use client';

import { useState } from 'react';

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
            <div className="logo">
              GENJIS<span>.</span>
            </div>
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
            <a href="#shop">The Mumbai Low</a>
            <a href="#shop">The Local High</a>
            <a href="#shop">The Monsoon Slip</a>
          </div>

          <div className="foot-col">
            <h4>Find us</h4>
            <a href="#stores">Mumbai &middot; Bandra</a>
            <a href="#stores">Bengaluru &middot; Indiranagar</a>
            <a href="#stores">Delhi &middot; Hauz Khas</a>
            <a href="#stores">Kolkata &middot; Park Street</a>
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

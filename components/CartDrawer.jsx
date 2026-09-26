'use client';

import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/format';
import ShoeIllustration from './ShoeIllustration';

export default function CartDrawer() {
  const {
    cart,
    PRODUCTS,
    updateQty,
    removeItem,
    cartOpen,
    setCartOpen,
    setCheckoutOpen,
    computeTotals,
    appliedCoupon,
    applyCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const totals = computeTotals();

  function handleApply() {
    const res = applyCoupon(couponInput);
    if (!res.ok) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
      setCouponError('');
    }
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  let couponMessage = couponError;
  let couponClass = couponError ? 'coupon-msg bad' : 'coupon-msg';
  if (!couponError && appliedCoupon) {
    if (totals.discount > 0) {
      couponMessage = `"${appliedCoupon}" applied \u2014 discount added below`;
      couponClass = 'coupon-msg ok';
    } else {
      couponMessage = `"${appliedCoupon}" doesn\u2019t apply to the items in your cart yet.`;
      couponClass = 'coupon-msg bad';
    }
  }

  return (
    <aside className={`cart-drawer${cartOpen ? ' open' : ''}`} aria-label="Shopping cart">
      <div className="cart-head">
        <h3>Your cart</h3>
        <button className="icon-close" onClick={() => setCartOpen(false)} aria-label="Close cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>

      <div className="cart-items">
        {cart.length === 0 && <p className="cart-empty">Your cart is empty. Add a pair to get started.</p>}

        {cart.map((item, idx) => {
          const p = PRODUCTS[item.id];
          return (
            <div className="cart-item" key={`${item.id}-${item.size}`}>
              <div className="thumb">
                <ShoeIllustration color={p.color} accent={p.accent} />
              </div>
              <div className="ci-info">
                <div className="ci-name">{p.name}</div>
                <div className="ci-meta">Size UK {item.size}</div>
                <div className="qty-stepper">
                  <button type="button" onClick={() => updateQty(idx, -1)} aria-label="Decrease quantity">
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(idx, 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
              </div>
              <div className="ci-right">
                <span className="ci-price">{fmt(p.price * item.qty)}</span>
                <button type="button" className="ci-remove" onClick={() => removeItem(idx)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-foot">
        <div className="coupon-row">
          <input
            type="text"
            placeholder="Coupon code"
            aria-label="Coupon code"
            value={couponInput}
            onChange={(e) => {
              setCouponInput(e.target.value);
              setCouponError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleApply();
              }
            }}
          />
          <button type="button" className="btn small" onClick={handleApply}>
            Apply
          </button>
        </div>
        <p className={couponClass}>{couponMessage}</p>

        <div className="cart-sub">
          <span>Subtotal</span>
          <strong>{fmt(totals.subtotal)}</strong>
        </div>

        {totals.discount > 0 && (
          <div className="cart-sub discount-row">
            <span>
              Discount <em className="coupon-tag">{totals.couponLabel}</em>
            </span>
            <strong>&minus;{fmt(totals.discount)}</strong>
          </div>
        )}

        <div className="cart-sub cart-total">
          <span>Total</span>
          <strong>{fmt(totals.total)}</strong>
        </div>

        <button className="btn full" onClick={handleCheckout} disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </aside>
  );
}

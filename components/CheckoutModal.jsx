'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/format';

const EMPTY_FORM = { name: '', phone: '', email: '', address: '', city: '', pin: '' };

export default function CheckoutModal() {
  const {
    cart,
    PRODUCTS,
    checkoutOpen,
    setCheckoutOpen,
    checkoutStep,
    setCheckoutStep,
    computeTotals,
    profile,
    setCheckoutShipping,
    checkoutPayment,
    setCheckoutPayment,
    placeOrder,
  } = useStore();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saveProfileChecked, setSaveProfileChecked] = useState(true);
  const [placed, setPlaced] = useState(false);
  const [orderIdShown, setOrderIdShown] = useState('');

  // Reset / prefill whenever the modal opens
  useEffect(() => {
    if (checkoutOpen) {
      setPlaced(false);
      setCheckoutStep(1);
      setForm(profile ? { ...EMPTY_FORM, ...profile } : EMPTY_FORM);
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutOpen]);

  const totals = computeTotals();

  function setField(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Enter your name.';
    if (!/^[0-9]{10}$/.test(form.phone.trim())) errs.phone = 'Enter a 10-digit phone number.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Enter a valid email or leave it blank.';
    }
    if (!form.address.trim()) errs.address = 'Enter your address.';
    if (!form.city.trim()) errs.city = 'Enter your city.';
    if (!/^[0-9]{6}$/.test(form.pin.trim())) errs.pin = 'Enter a 6-digit pincode.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleToStep2() {
    if (validate()) {
      setCheckoutShipping({ ...form });
      setCheckoutStep(2);
    }
  }

  function handlePlaceOrder() {
    const order = placeOrder(saveProfileChecked);
    setOrderIdShown(order.id);
    setPlaced(true);
  }

  function handleClose() {
    setCheckoutOpen(false);
  }

  function handleContinueShopping() {
    setCheckoutOpen(false);
    setPlaced(false);
    setForm(EMPTY_FORM);
  }

  const payLabel = checkoutPayment === 'cod' ? 'Cash on delivery' : checkoutPayment === 'upi' ? 'UPI' : 'Card';

  return (
    <div className={`modal-overlay${checkoutOpen ? ' show' : ''}`}>
      <div className="modal-card">
        {!placed && (
          <div>
            <div className="modal-head">
              <h3>
                {checkoutStep === 1 ? 'Shipping details' : checkoutStep === 2 ? 'Payment method' : 'Review your order'}
              </h3>
              <button className="icon-close" onClick={handleClose} aria-label="Close checkout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            <div className="steps">
              <div className={checkoutStep >= 1 ? 'active' : ''} />
              <div className={checkoutStep >= 2 ? 'active' : ''} />
              <div className={checkoutStep >= 3 ? 'active' : ''} />
            </div>

            {checkoutStep === 1 && (
              <div>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="co-name">Full name</label>
                    <input id="co-name" value={form.name} onChange={(e) => setField('name', e.target.value)} />
                    <span className="err">{errors.name}</span>
                  </div>
                  <div className="field">
                    <label htmlFor="co-phone">Phone number</label>
                    <input id="co-phone" value={form.phone} maxLength={10} onChange={(e) => setField('phone', e.target.value)} />
                    <span className="err">{errors.phone}</span>
                  </div>
                  <div className="field full">
                    <label htmlFor="co-email">Email (optional)</label>
                    <input id="co-email" type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                    <span className="err">{errors.email}</span>
                  </div>
                  <div className="field full">
                    <label htmlFor="co-address">Address</label>
                    <input id="co-address" value={form.address} onChange={(e) => setField('address', e.target.value)} />
                    <span className="err">{errors.address}</span>
                  </div>
                  <div className="field">
                    <label htmlFor="co-city">City</label>
                    <input id="co-city" value={form.city} onChange={(e) => setField('city', e.target.value)} />
                    <span className="err">{errors.city}</span>
                  </div>
                  <div className="field">
                    <label htmlFor="co-pin">Pincode</label>
                    <input id="co-pin" value={form.pin} maxLength={6} onChange={(e) => setField('pin', e.target.value)} />
                    <span className="err">{errors.pin}</span>
                  </div>
                </div>
                <label className="save-profile-check">
                  <input
                    type="checkbox"
                    checked={saveProfileChecked}
                    onChange={(e) => setSaveProfileChecked(e.target.checked)}
                  />
                  Save these details to my profile
                </label>
                <div className="modal-actions">
                  <button className="btn full" onClick={handleToStep2}>
                    Continue to payment
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 2 && (
              <div>
                <label className="pay-option">
                  <input type="radio" name="pay" checked={checkoutPayment === 'cod'} onChange={() => setCheckoutPayment('cod')} />
                  <span>
                    <span className="pname" style={{ display: 'block' }}>Cash on delivery</span>
                    <span className="pdesc">Pay in cash when your order arrives.</span>
                  </span>
                </label>
                <label className="pay-option">
                  <input type="radio" name="pay" checked={checkoutPayment === 'upi'} onChange={() => setCheckoutPayment('upi')} />
                  <span>
                    <span className="pname" style={{ display: 'block' }}>UPI</span>
                    <span className="pdesc">Pay using any UPI app at delivery confirmation.</span>
                  </span>
                </label>
                <label className="pay-option">
                  <input type="radio" name="pay" checked={checkoutPayment === 'card'} onChange={() => setCheckoutPayment('card')} />
                  <span>
                    <span className="pname" style={{ display: 'block' }}>Card</span>
                    <span className="pdesc">Credit or debit card, processed securely at delivery.</span>
                  </span>
                </label>
                <div className="modal-actions">
                  <button className="btn outline full" onClick={() => setCheckoutStep(1)}>
                    Back
                  </button>
                  <button className="btn full" onClick={() => setCheckoutStep(3)}>
                    Review order
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div>
                <div>
                  {cart.map((item, i) => {
                    const p = PRODUCTS[item.id];
                    return (
                      <div className="review-line" key={i}>
                        <span>
                          {p.name} &times; {item.qty} (UK {item.size})
                        </span>
                        <span>{fmt(p.price * item.qty)}</span>
                      </div>
                    );
                  })}
                  <div className="review-line">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="review-line">
                      <span>Discount {totals.couponLabel}</span>
                      <span>&minus;{fmt(totals.discount)}</span>
                    </div>
                  )}
                  <div className="review-line total">
                    <span>Total</span>
                    <span>{fmt(totals.total)}</span>
                  </div>
                </div>

                <div className="review-block">
                  <h4>Shipping to</h4>
                  <p style={{ fontSize: 14, margin: 0, color: 'var(--text-soft)' }}>
                    {form.name}, {form.address}, {form.city} {form.pin} &middot; {form.phone}
                  </p>
                </div>
                <div className="review-block">
                  <h4>Payment method</h4>
                  <p style={{ fontSize: 14, margin: 0, color: 'var(--text-soft)' }}>{payLabel}</p>
                </div>

                <div className="modal-actions">
                  <button className="btn outline full" onClick={() => setCheckoutStep(2)}>
                    Back
                  </button>
                  <button className="btn full" onClick={handlePlaceOrder}>
                    Place order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {placed && (
          <div style={{ textAlign: 'center' }}>
            <div className="confirm-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 style={{ fontSize: 24, textTransform: 'uppercase', marginBottom: 10 }}>Order placed</h3>
            <p style={{ color: 'var(--text-soft)', fontSize: 14.5, margin: '0 0 6px' }}>
              Your order <strong style={{ color: 'var(--text)' }}>#{orderIdShown}</strong> is on its way.
            </p>
            <p style={{ color: 'var(--text-soft)', fontSize: 14.5, margin: '0 0 24px' }}>
              A confirmation would normally be sent to your phone.
            </p>
            <button className="btn full" onClick={handleContinueShopping}>
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/format';

const EMPTY_PROFILE = { name: '', email: '', phone: '', address: '', city: '', pin: '' };

export default function AccountModal() {
  const { accountOpen, setAccountOpen, accountTab, setAccountTab, profile, setProfile, orders } = useStore();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_PROFILE);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (accountOpen) {
      setForm(profile ? { ...EMPTY_PROFILE, ...profile } : EMPTY_PROFILE);
      setEditing(false);
      setSavedMsg('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountOpen]);

  function setField(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function handleSave() {
    setProfile({ ...form });
    setEditing(false);
    setSavedMsg('Details saved.');
  }

  return (
    <div className={`modal-overlay${accountOpen ? ' show' : ''}`}>
      <div className="modal-card" style={{ maxWidth: 580 }}>
        <div className="modal-head">
          <h3>Your account</h3>
          <button className="icon-close" onClick={() => setAccountOpen(false)} aria-label="Close account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>

        <div className="acct-tabs">
          <button
            type="button"
            className={`acct-tab${accountTab === 'profile' ? ' active' : ''}`}
            onClick={() => setAccountTab('profile')}
          >
            Profile
          </button>
          <button
            type="button"
            className={`acct-tab${accountTab === 'orders' ? ' active' : ''}`}
            onClick={() => setAccountTab('orders')}
          >
            Orders
          </button>
        </div>

        {accountTab === 'profile' && (
          <div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="acct-name">Full name</label>
                <input id="acct-name" value={form.name} disabled={!editing} onChange={(e) => setField('name', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="acct-email">Email</label>
                <input
                  id="acct-email"
                  type="email"
                  value={form.email}
                  disabled={!editing}
                  onChange={(e) => setField('email', e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="acct-phone">Phone</label>
                <input id="acct-phone" value={form.phone} disabled={!editing} onChange={(e) => setField('phone', e.target.value)} />
              </div>
              <div className="field full">
                <label htmlFor="acct-address">Address</label>
                <input
                  id="acct-address"
                  value={form.address}
                  disabled={!editing}
                  onChange={(e) => setField('address', e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="acct-city">City</label>
                <input id="acct-city" value={form.city} disabled={!editing} onChange={(e) => setField('city', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="acct-pin">Pincode</label>
                <input id="acct-pin" value={form.pin} disabled={!editing} onChange={(e) => setField('pin', e.target.value)} />
              </div>
            </div>
            <div className="modal-actions">
              {!editing && (
                <button className="btn outline full" onClick={() => setEditing(true)}>
                  Edit details
                </button>
              )}
              {editing && (
                <button className="btn full" onClick={handleSave}>
                  Save details
                </button>
              )}
            </div>
            <p className="coupon-msg ok">{savedMsg}</p>
          </div>
        )}

        {accountTab === 'orders' && (
          <div>
            {orders.length === 0 && (
              <p className="acct-empty">No orders yet &mdash; your placed orders will show up here.</p>
            )}
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="oc-head">
                  <span>#{order.id}</span>
                  <span className="status-chip">{order.status}</span>
                </div>
                <div className="oc-meta">
                  {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' \u00b7 '}
                  {order.payment === 'cod' ? 'Cash on delivery' : order.payment === 'upi' ? 'UPI' : 'Card'}
                </div>
                <div className="oc-items">
                  {order.items.map((it, i) => (
                    <div key={i}>
                      {it.name} &times; {it.qty} (UK {it.size})
                    </div>
                  ))}
                </div>
                <div className="oc-total">
                  <span>Total</span>
                  <span>{fmt(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

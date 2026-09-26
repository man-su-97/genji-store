'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import { COUPONS } from '@/lib/coupons';
import { loadJSON, saveJSON } from '@/lib/storage';

const CART_KEY = 'genjis_cart_v1';
const COUPON_KEY = 'genjis_coupon_v1';
const PROFILE_KEY = 'genjis_profile_v1';
const ORDERS_KEY = 'genjis_orders_v1';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Core data
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Overlay / navigation state
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [productModalId, setProductModalId] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState('profile');

  // In-flight checkout state (shared between CheckoutModal steps)
  const [checkoutShipping, setCheckoutShipping] = useState(null);
  const [checkoutPayment, setCheckoutPayment] = useState('cod');
  const [lastOrder, setLastOrder] = useState(null);

  // Load persisted data once on mount (client only — avoids SSR/hydration mismatches)
  useEffect(() => {
    setCart(loadJSON(CART_KEY, []));
    setAppliedCoupon(loadJSON(COUPON_KEY, null));
    setProfile(loadJSON(PROFILE_KEY, null));
    setOrders(loadJSON(ORDERS_KEY, []));
    setHydrated(true);
  }, []);

  // Persist on change (skip the very first render so we don't clobber storage with defaults)
  useEffect(() => { if (hydrated) saveJSON(CART_KEY, cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) saveJSON(COUPON_KEY, appliedCoupon); }, [appliedCoupon, hydrated]);
  useEffect(() => { if (hydrated) saveJSON(PROFILE_KEY, profile); }, [profile, hydrated]);
  useEffect(() => { if (hydrated) saveJSON(ORDERS_KEY, orders); }, [orders, hydrated]);

  const addToCart = useCallback((id, size) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.id === id && c.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { id, size, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((index, delta) => {
    setCart((prev) => {
      const next = [...prev];
      if (!next[index]) return prev;
      next[index] = { ...next[index], qty: next[index].qty + delta };
      if (next[index].qty <= 0) next.splice(index, 1);
      return next;
    });
  }, []);

  const removeItem = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const computeTotals = useCallback(() => {
    let subtotal = 0;
    cart.forEach((item) => {
      const p = PRODUCTS[item.id];
      if (p) subtotal += p.price * item.qty;
    });

    let discount = 0;
    let couponLabel = '';

    if (appliedCoupon && COUPONS[appliedCoupon]) {
      const c = COUPONS[appliedCoupon];
      couponLabel = `(${appliedCoupon})`;
      if (c.appliesTo === 'all') {
        if (c.type === 'percent') discount = (subtotal * c.value) / 100;
        else if (c.type === 'flat' && subtotal >= (c.minOrder || 0)) discount = c.value;
      } else {
        let applicable = 0;
        cart.forEach((item) => {
          if (item.id === c.appliesTo) applicable += PRODUCTS[item.id].price * item.qty;
        });
        if (c.type === 'percent') discount = (applicable * c.value) / 100;
        else if (c.type === 'flat') discount = Math.min(c.value, applicable);
      }
    }

    discount = Math.min(discount, subtotal);
    return { subtotal, discount, total: subtotal - discount, couponLabel };
  }, [cart, appliedCoupon]);

  const applyCoupon = useCallback((code) => {
    const upper = code.trim().toUpperCase();
    if (!upper) return { ok: false, message: 'Enter a coupon code.' };
    if (!COUPONS[upper]) return { ok: false, message: 'That code isn\u2019t valid.' };
    setAppliedCoupon(upper);
    return { ok: true };
  }, []);

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  const placeOrder = useCallback(
    (saveToProfile) => {
      const totals = computeTotals();
      const orderId = 'GJ' + Math.floor(100000 + Math.random() * 900000);
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart.map((item) => ({
          id: item.id,
          name: PRODUCTS[item.id].name,
          size: item.size,
          qty: item.qty,
          price: PRODUCTS[item.id].price,
        })),
        shipping: checkoutShipping,
        payment: checkoutPayment,
        coupon: appliedCoupon,
        subtotal: totals.subtotal,
        discount: totals.discount,
        total: totals.total,
        status: 'Placed',
      };
      setOrders((prev) => [order, ...prev]);
      if (saveToProfile && checkoutShipping) setProfile(checkoutShipping);
      setCart([]);
      setAppliedCoupon(null);
      setLastOrder(order);
      return order;
    },
    [cart, checkoutShipping, checkoutPayment, appliedCoupon, computeTotals]
  );

  const closeAll = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(false);
    setProductModalId(null);
    setAccountOpen(false);
  }, []);

  const anyOverlayOpen = cartOpen || checkoutOpen || !!productModalId || accountOpen;

  const value = {
    PRODUCTS,
    COUPONS,
    cart,
    appliedCoupon,
    profile,
    orders,
    cartOpen,
    setCartOpen,
    checkoutOpen,
    setCheckoutOpen,
    checkoutStep,
    setCheckoutStep,
    productModalId,
    setProductModalId,
    accountOpen,
    setAccountOpen,
    accountTab,
    setAccountTab,
    checkoutShipping,
    setCheckoutShipping,
    checkoutPayment,
    setCheckoutPayment,
    lastOrder,
    addToCart,
    updateQty,
    removeItem,
    computeTotals,
    applyCoupon,
    removeCoupon,
    placeOrder,
    setProfile,
    closeAll,
    anyOverlayOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
}

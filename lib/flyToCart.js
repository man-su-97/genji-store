// Animates a clone of a shoe SVG flying from `sourceEl` to the header cart icon,
// then pulses the cart icon. Purely decorative — never gates the actual add-to-cart
// action or its "Added" text feedback, and does nothing (beyond the pulse) when the
// viewer prefers reduced motion.
export function flyShoeToCart(sourceEl) {
  if (typeof window === 'undefined' || !sourceEl) return;

  const cartBtn = document.getElementById('header-cart-button');
  if (!cartBtn) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    pulseCart(cartBtn);
    return;
  }

  const svg = sourceEl.querySelector('svg');
  if (!svg) return;

  const startRect = sourceEl.getBoundingClientRect();
  const endRect = cartBtn.getBoundingClientRect();
  if (startRect.width === 0 || startRect.height === 0) return;

  const flyer = document.createElement('div');
  flyer.className = 'fly-shoe';
  flyer.style.left = `${startRect.left}px`;
  flyer.style.top = `${startRect.top}px`;
  flyer.style.width = `${startRect.width}px`;
  flyer.style.height = `${startRect.height}px`;
  flyer.appendChild(svg.cloneNode(true));
  document.body.appendChild(flyer);

  const dx = endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2);
  const dy = endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2);

  requestAnimationFrame(() => {
    flyer.style.transform = `translate(${dx}px, ${dy}px) scale(0.12)`;
    flyer.style.opacity = '0';
  });

  let done = false;
  const cleanup = () => {
    if (done) return;
    done = true;
    flyer.remove();
    pulseCart(cartBtn);
  };
  flyer.addEventListener('transitionend', cleanup, { once: true });
  setTimeout(cleanup, 900);
}

function pulseCart(cartBtn) {
  cartBtn.classList.remove('cart-pulse');
  void cartBtn.offsetWidth;
  cartBtn.classList.add('cart-pulse');
  setTimeout(() => cartBtn.classList.remove('cart-pulse'), 450);
}

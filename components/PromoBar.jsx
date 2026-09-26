const ITEMS = [
  <>🔥 <strong>WELCOME10</strong> — 10% off your first order</>,
  <>🌧️ <strong>MONSOON10</strong> — 10% off The Monsoon Slip</>,
  <>📦 Free shipping, every order, every city</>,
  <>💸 <strong>FLAT200</strong> — ₹200 off on orders above ₹2,000</>,
];

export default function PromoBar() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="promo-bar" role="note" aria-label="Current offers">
      <div className="promo-track">
        {doubled.map((el, i) => (
          <span className="promo-item" key={i}>
            {el}
          </span>
        ))}
      </div>
    </div>
  );
}

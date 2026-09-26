export default function FeaturesSection() {
  return (
    <section className="section" style={{ paddingBottom: 0, borderBottom: 'none' }}>
      <div className="wrap" style={{ paddingBottom: 0 }}>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <h2 style={{ maxWidth: '16ch' }}>Why people switch to Genjis</h2>
        </div>

        <div className="feature-grid" style={{ marginTop: 32 }}>
          <div className="feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 12h6M3 8h10M3 16h8" />
              <path d="M17 6c2 1 3 3 3 6s-1 5-3 6" />
            </svg>
            <h3>Breathable weave</h3>
            <p>Open-weave canvas built for 35°C afternoons, not for a European autumn.</p>
          </div>

          <div className="feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 18l6-11 4 7 3-4 3 8H4z" />
            </svg>
            <h3>Vulcanized grip sole</h3>
            <p>Heat-bonded rubber that holds on wet stairs, station platforms and gravel alike.</p>
          </div>

          <div className="feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3c4 3 7 7 7 11a7 7 0 11-14 0c0-4 3-8 7-11z" />
            </svg>
            <h3>100% vegan</h3>
            <p>No leather, no animal glue — canvas, natural rubber and plant-based dye only.</p>
          </div>

          <div className="feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="1.4" />
              <path d="M4 12c2-4 6-6 8-6s6 2 8 6c-2 4-6 6-8 6s-6-2-8-6z" />
            </svg>
            <h3>Hand-checked finish</h3>
            <p>Every pair is inspected by hand for stitch quality before it leaves the workshop.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

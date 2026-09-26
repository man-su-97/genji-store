import Link from 'next/link';
import ShoeIllustration from './ShoeIllustration';

export default function Hero() {
  return (
    <section className="hero weave">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow-note">New in — the monsoon collection</p>
          <h1>
            <span className="line"><span>Built on</span></span>
            <span className="line"><span>canvas.</span></span>
            <span className="line"><span>Made for Indian roads.</span></span>
          </h1>
          <p className="sub">
            Genjis makes hand-stitched canvas sneakers for the way India actually moves — packed trains, midday
            heat, sudden rain. Light on your feet, tough on the commute.
          </p>
          <div className="hero-ctas">
            <Link className="btn" href="/shop">Shop the collection</Link>
            <a className="btn outline" href="#craft">See how they're made</a>
          </div>
          <div className="stat-row">
            <div>
              <strong>10,000+</strong>
              <span>pairs on Indian streets</span>
            </div>
            <div>
              <strong>28</strong>
              <span>cities we ship to</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>vegan, no leather</span>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <ShoeIllustration color="#202B41" accent="#D4952B" />
        </div>
      </div>
    </section>
  );
}

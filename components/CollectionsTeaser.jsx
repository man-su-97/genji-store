import Image from 'next/image';
import Link from 'next/link';

export default function CollectionsTeaser() {
  return (
    <section className="section collections-teaser">
      <div className="wrap">
        <Link href="/shop" className="shop-banner">
          <div className="shop-banner-media">
            <Image
              src="/images/truck-art-shop.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              className="shop-banner-photo"
              priority
            />
          </div>
          <div className="shop-banner-caption">
            <span className="teaser-eyebrow">The full range</span>
            <h3>Shop the collection</h3>
            <p>Three canvas builds for three kinds of Indian day — filter and sort the whole catalogue.</p>
            <span className="teaser-cta">Browse the shop</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';

const CITIES = [
  { name: 'Jaipur', src: '/images/collage-jaipur.jpg' },
  { name: 'Kolkata', src: '/images/showcase-kolkata.jpg' },
  { name: 'Varanasi', src: '/images/collage-varanasi.jpg' },
  { name: 'Chennai', src: '/images/showcase-chennai.jpg' },
  { name: 'Hyderabad', src: '/images/showcase-hyderabad.jpg' },
  { name: 'Kerala', src: '/images/showcase-kerala.jpg' },
];

export default function CityCollage() {
  return (
    <section className="section city-collage">
      <div className="wrap">
        <Link href="/city-editions" className="collage-link" aria-label="Explore the six city editions">
          <div className="collage-strip">
            {CITIES.map((c) => (
              <div className="collage-slice" key={c.name}>
                <Image
                  src={c.src}
                  alt={`${c.name}, India`}
                  fill
                  sizes="(max-width: 640px) 100vw, 16vw"
                  className="collage-photo"
                />
                <div className="collage-slice-scrim" />
                <span className="collage-city-name">{c.name}</span>
              </div>
            ))}
          </div>
          <p className="collage-caption">City Collection India</p>
        </Link>
      </div>
    </section>
  );
}

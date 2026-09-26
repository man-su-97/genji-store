const STEPS = [
  {
    num: '01',
    title: 'Woven in Kannur',
    text: 'Raw cotton canvas woven on traditional handlooms in Kerala, then washed and dyed in small batches.',
  },
  {
    num: '02',
    title: 'Cut by hand',
    text: 'Panels are hand-cut to reduce fabric waste, checked for weave consistency before stitching.',
  },
  {
    num: '03',
    title: 'Stitched in Bhiwandi',
    text: 'Uppers are hand-stitched at our partner workshop, with double seams at every stress point.',
  },
  {
    num: '04',
    title: 'Soled and tested',
    text: 'Vulcanized rubber soles are heat-bonded on, then every batch is tested wet and dry.',
  },
];

export default function CraftSection() {
  return (
    <section className="section" id="craft">
      <div className="wrap">
        <div className="section-head">
          <h2>How a Genjis pair gets made</h2>
          <p>Every pair passes through four hands before it reaches yours.</p>
        </div>
        <div className="process">
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

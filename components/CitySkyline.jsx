const GROUND_Y = 176;

function SkylineFrame({ uid, skyTop, skyBottom, sun, road, lane, bird, tree, ground = 'road', children }) {
  return (
    <svg
      className="city-skyline"
      viewBox="0 0 400 200"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="200" fill={`url(#sky-${uid})`} />
      <circle cx="298" cy="66" r="44" fill={sun} opacity="0.55" />

      <g stroke={bird} strokeWidth="1.6" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M36,28 q5,-6 10,0 q5,-6 10,0" />
        <path d="M108,48 q4,-5 8,0 q4,-5 8,0" />
        <path d="M344,36 q4,-5 8,0 q4,-5 8,0" />
      </g>

      <g>{children}</g>

      {ground === 'water' ? (
        <>
          <g opacity="0.28" transform={`translate(0, ${GROUND_Y * 2}) scale(1,-1)`}>
            {children}
          </g>
          <rect x="0" y={GROUND_Y} width="400" height={200 - GROUND_Y} fill={skyBottom} opacity="0.35" />
          <g stroke={lane} strokeWidth="1.2" opacity="0.3">
            <line x1="0" y1={GROUND_Y + 8} x2="400" y2={GROUND_Y + 8} />
            <line x1="0" y1={GROUND_Y + 16} x2="400" y2={GROUND_Y + 16} />
          </g>
          <g transform={`translate(250, ${GROUND_Y + 9})`}>
            <ellipse cx="0" cy="5" rx="22" ry="3" fill="none" stroke={lane} strokeWidth="1" opacity="0.3" />
            <path d="M-15,2 Q0,-6 15,2 L13,6 L-13,6 Z" fill={road} />
            <line x1="0" y1="2" x2="0" y2="-11" stroke={road} strokeWidth="1.3" />
          </g>
        </>
      ) : (
        <>
          {[26, 76, 322, 372].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${GROUND_Y})`}>
              <rect x="-1.5" y="-10" width="3" height="10" fill="#5b4a3a" opacity="0.5" />
              <circle cx="0" cy="-14" r="8" fill={tree} opacity="0.75" />
            </g>
          ))}
          <rect x="0" y={GROUND_Y} width="400" height={200 - GROUND_Y} fill={road} />
          <line x1="0" y1={GROUND_Y + 12} x2="400" y2={GROUND_Y + 12} stroke={lane} strokeWidth="2" strokeDasharray="10 8" opacity="0.7" />
          {[126, 254].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${GROUND_Y + 6})`}>
              <rect x="-16" y="-7" width="32" height="9" rx="3" fill={i === 0 ? sun : lane} opacity="0.9" />
              <circle cx="-9" cy="3" r="3" fill="#17130E" />
              <circle cx="9" cy="3" r="3" fill="#17130E" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

function JaipurArt() {
  return (
    <g>
      <rect x="18" y="110" width="72" height="66" fill="#8A3B2C" />
      <rect x="310" y="110" width="72" height="66" fill="#8A3B2C" />
      {[0, 1, 2].map((i) => (
        <rect key={'lw' + i} x={31 + i * 22} y="122" width="12" height="16" rx="6" fill="#F6E7C9" opacity="0.85" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={'rw' + i} x={323 + i * 22} y="122" width="12" height="16" rx="6" fill="#F6E7C9" opacity="0.85" />
      ))}

      <rect x="108" y="72" width="184" height="104" fill="#C15B4A" />

      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${128 + i * 34}, 56)`}>
          <circle cx="0" cy="6" r="9" fill="#C79A3E" />
          <rect x="-2.5" y="10" width="5" height="10" fill="#C79A3E" />
        </g>
      ))}

      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={119 + col * 24}
            y={84 + row * 21}
            width="14"
            height="15"
            rx="7"
            fill="#F6E7C9"
            opacity="0.9"
          />
        ))
      )}

      <g stroke="#C79A3E" strokeWidth="1.4" opacity="0.7">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={'a' + i} x1={110 + i * 10} y1="176" x2={110 + i * 10 + 5} y2="169" />
        ))}
      </g>
    </g>
  );
}

function KolkataArt() {
  return (
    <g>
      <g stroke="#1c3b36" strokeWidth="2" opacity="0.4" fill="none">
        <line x1="14" y1="176" x2="14" y2="64" />
        <line x1="86" y1="176" x2="86" y2="64" />
        <line x1="14" y1="64" x2="86" y2="64" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={'lb' + i} x1={14 + i * 14.4} y1={64 + i * 4} x2={14 + (i + 1) * 14.4} y2={64 + (i + 1) * 4} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={'lc' + i} x1={14 + i * 14.4} y1={64 + (i + 1) * 4} x2={14 + (i + 1) * 14.4} y2={64 + i * 4} />
        ))}
        <line x1="314" y1="176" x2="314" y2="64" />
        <line x1="386" y1="176" x2="386" y2="64" />
        <line x1="314" y1="64" x2="386" y2="64" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={'rb' + i} x1={314 + i * 14.4} y1={64 + i * 4} x2={314 + (i + 1) * 14.4} y2={64 + (i + 1) * 4} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={'rc' + i} x1={314 + i * 14.4} y1={64 + (i + 1) * 4} x2={314 + (i + 1) * 14.4} y2={64 + i * 4} />
        ))}
      </g>

      <g transform="translate(112,0)">
        <rect x="0" y="90" width="34" height="86" fill="#2B5C4B" />
        <path d="M-2,90 L17,50 L36,90 Z" fill="#2B5C4B" />
        <path d="M4,80 L17,64 L30,80 Z" fill="#3f7767" />
        {[0, 1, 2].map((r) => (
          <rect key={r} x="8" y={98 + r * 20} width="18" height="12" fill="#EDE6D3" opacity="0.55" />
        ))}
      </g>

      <rect x="158" y="100" width="112" height="76" fill="#E3A825" />
      <rect x="158" y="100" width="112" height="10" fill="#A63B29" opacity="0.7" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={168 + i * 20} y="116" width="12" height="30" fill="#A63B29" opacity="0.35" />
      ))}
      <path d="M188,100 A26,26 0 0 1 240,100 Z" fill="#E3A825" />
      <path d="M194,100 A20,20 0 0 1 234,100 Z" fill="#F2C879" opacity="0.7" />
      <rect x="209" y="74" width="6" height="18" fill="#E3A825" />
      <circle cx="212" cy="72" r="5" fill="#E3A825" />

      <g stroke="#A63B29" strokeWidth="1.3" opacity="0.5">
        <line x1="0" y1="44" x2="400" y2="44" />
      </g>
    </g>
  );
}

function VaranasiArt() {
  return (
    <g>
      <g fill="#8C7A63">
        <rect x="0" y="150" width="400" height="8" opacity="0.9" />
        <rect x="0" y="158" width="400" height="8" opacity="0.75" />
        <rect x="0" y="166" width="400" height="10" opacity="0.6" />
      </g>

      <g fill="#1F2C52">
        <path d="M60,150 L60,86 Q68,72 76,86 L76,150 Z" />
        <path d="M150,150 L150,66 Q160,48 170,66 L170,150 Z" />
        <path d="M300,150 L300,96 Q308,82 316,96 L316,150 Z" />
      </g>
      <g fill="#D9622B" opacity="0.85">
        <rect x="63" y="80" width="10" height="8" />
        <rect x="154" y="60" width="12" height="8" />
        <rect x="303" y="90" width="10" height="8" />
      </g>

      {[40, 100, 200, 260, 340].map((x, i) => (
        <ellipse key={i} cx={x} cy={168 - (i % 2) * 4} rx="3" ry="2" fill="#F2994A" opacity="0.85" />
      ))}
    </g>
  );
}

function ChennaiArt() {
  return (
    <g>
      <g fill="#5B3A29">
        <path d="M46,176 L46,140 L64,140 L64,176 Z" opacity="0.9" />
        <path d="M40,140 L70,140 L64,122 L46,122 Z" />
        <path d="M44,122 L66,122 L60,106 L50,106 Z" />
        <path d="M48,106 L62,106 L58,92 L52,92 Z" />
        <path d="M52,92 L58,92 L55,78 Z" />
      </g>
      <g fill="#3F5B3F" opacity="0.8">
        <rect x="42" y="139" width="26" height="3" />
        <rect x="45" y="121" width="20" height="3" />
        <rect x="49" y="105" width="12" height="3" />
      </g>

      <g fill="#7A4A34">
        <rect x="182" y="92" width="14" height="84" />
        <rect x="176" y="82" width="26" height="12" />
        <circle cx="189" cy="88" r="6.5" fill="#EDE0C8" />
        <circle cx="189" cy="88" r="6.5" fill="none" stroke="#5B3A29" strokeWidth="1.2" />
        <path d="M183,82 L189,68 L195,82 Z" />
      </g>

      <g fill="#EDE0C8" stroke="#B7CFC4" strokeWidth="1">
        <rect x="316" y="98" width="34" height="78" fill="#EFE7DA" stroke="none" />
        <path d="M325,98 L333,72 L341,98 Z" fill="#EFE7DA" stroke="none" />
        <line x1="333" y1="72" x2="333" y2="58" stroke="#B7CFC4" />
        <path d="M328,60 L333,54 L338,60 Z" fill="none" />
      </g>

      <g transform="translate(300,168)">
        <path d="M-6,4 Q-6,-8 0,-8 Q6,-8 6,4 Z" fill="#5B3A29" opacity="0.9" />
        <rect x="-8" y="4" width="16" height="3" rx="1.4" fill="#3a2a1e" />
        <path d="M14,2 Q14,-6 18,-6 Q22,-6 22,2 Z" fill="#5B3A29" opacity="0.9" />
      </g>
    </g>
  );
}

function HyderabadArt() {
  return (
    <g>
      <rect x="30" y="120" width="90" height="56" fill="#7C9186" opacity="0.85" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${44 + i * 20},152 q6,-12 12,0 Z`} fill="#EDEAE3" opacity="0.7" />
      ))}

      <rect x="150" y="46" width="14" height="130" fill="#55565A" />
      <circle cx="157" cy="42" r="7" fill="#D98E3F" />
      <rect x="154" y="34" width="6" height="10" fill="#55565A" />

      <rect x="236" y="46" width="14" height="130" fill="#55565A" />
      <circle cx="243" cy="42" r="7" fill="#D98E3F" />
      <rect x="240" y="34" width="6" height="10" fill="#55565A" />

      <rect x="168" y="88" width="64" height="88" fill="#55565A" />
      <path d="M168,88 Q200,52 232,88 Z" fill="#55565A" />
      <path d="M180,88 Q200,64 220,88 Z" fill="#EDEAE3" opacity="0.75" />
      <rect x="172" y="96" width="56" height="6" fill="#D98E3F" opacity="0.8" />

      {[192, 208].map((x, i) => (
        <circle key={i} cx={x} cy="166" r="3" fill="#F3EFE8" />
      ))}

      <g stroke="#8b8b8b" strokeWidth="1.4" opacity="0.55">
        <line x1="356" y1="176" x2="356" y2="58" />
        <line x1="356" y1="58" x2="384" y2="58" />
        <line x1="356" y1="66" x2="372" y2="58" />
      </g>
    </g>
  );
}

function KochiArt() {
  return (
    <g>
      <g fill="#4F8FBF">
        <path d="M16,176 L16,142 Q16,122 34,122 Q52,122 52,142 L52,176 Z" opacity="0.9" />
        <rect x="10" y="171" width="48" height="6" opacity="0.9" />
      </g>

      <g fill="#B23A2E">
        <path d="M150,176 L150,112 L168,112 L168,176 Z" />
        <path d="M144,112 L174,112 L159,66 Z" />
        <path d="M196,176 L196,112 L214,112 L214,176 Z" />
        <path d="M190,112 L220,112 L205,66 Z" />
        <rect x="160" y="140" width="44" height="36" />
      </g>
      <g stroke="#E3A825" strokeWidth="1.4" opacity="0.85" fill="none">
        <line x1="150" y1="132" x2="168" y2="132" />
        <line x1="196" y1="132" x2="214" y2="132" />
        <line x1="159" y1="66" x2="159" y2="52" />
        <line x1="154" y1="56" x2="164" y2="56" />
      </g>
      <path d="M172,176 Q182,152 192,176 Z" fill="#E3A825" opacity="0.4" />

      <rect x="230" y="114" width="58" height="62" fill="#3F7A4A" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={236 + c * 13} y={122 + r * 18} width="7" height="10" fill="#EDE6D3" opacity="0.5" />
        ))
      )}

      <rect x="294" y="130" width="44" height="46" fill="#D9822B" />
      <path d="M294,130 L316,112 L338,130 Z" fill="#D9822B" />
    </g>
  );
}

const THEMES = {
  'jaipur-jaali': {
    skyTop: '#F7E3C4', skyBottom: '#F0B27A', sun: '#C79A3E',
    road: '#8A3B2C', lane: '#F6E7C9', bird: '#6b3a2c', tree: '#7c8a52',
    ground: 'road', Art: JaipurArt,
  },
  'kolkata-tram': {
    skyTop: '#DCEEEA', skyBottom: '#AFDACE', sun: '#F2C879',
    road: '#1F3B36', lane: '#E3A825', bird: '#1c3b36', tree: '#3f7767',
    ground: 'road', Art: KolkataArt,
  },
  'varanasi-ghat': {
    skyTop: '#3A4A7A', skyBottom: '#D9622B', sun: '#F2994A',
    road: '#2A3B6B', lane: '#F2994A', bird: '#1a2447', tree: '#8C7A63',
    ground: 'water', Art: VaranasiArt,
  },
  'chennai-filter': {
    skyTop: '#F3E6D3', skyBottom: '#D8B98C', sun: '#C4472B',
    road: '#3a2a1e', lane: '#EDE0C8', bird: '#5B3A29', tree: '#3F5B3F',
    ground: 'road', Art: ChennaiArt,
  },
  'hyderabad-pearl': {
    skyTop: '#E7E5E2', skyBottom: '#C7C3BE', sun: '#D98E3F',
    road: '#4a4b4e', lane: '#F3EFE8', bird: '#55565A', tree: '#8fae9c',
    ground: 'road', Art: HyderabadArt,
  },
  'kochi-backwater': {
    skyTop: '#E4F0EA', skyBottom: '#BFE0D2', sun: '#A9784F',
    road: '#2F6659', lane: '#EDE6D3', bird: '#1f4a40', tree: '#7c8a52',
    ground: 'road', Art: KochiArt,
  },
};

export default function CitySkyline({ id }) {
  const theme = THEMES[id];
  if (!theme) return null;
  const { Art, ...frameProps } = theme;
  return (
    <SkylineFrame uid={id} {...frameProps}>
      <Art />
    </SkylineFrame>
  );
}

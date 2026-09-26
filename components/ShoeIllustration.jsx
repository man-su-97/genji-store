export default function ShoeIllustration({ color = '#202B41', accent = '#D4952B' }) {
  return (
    <svg
      viewBox="0 0 640 300"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Illustration of a canvas sneaker"
    >
      <ellipse cx="330" cy="270" rx="280" ry="9" fill="#00000014" />
      <path
        d="M50,246 C44,253 46,261 60,265 C150,276 400,276 512,266 C536,263 546,255 543,245 C541,238 531,233 517,230 L78,230 C60,233 48,238 50,246 Z"
        fill="#DED1AF"
        stroke="#17130E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g stroke="#17130E" strokeWidth="2.5" opacity="0.5">
        <line x1="80" y1="248" x2="80" y2="259" />
        <line x1="125" y1="253" x2="125" y2="264" />
        <line x1="180" y1="255" x2="180" y2="267" />
        <line x1="240" y1="257" x2="240" y2="268" />
        <line x1="300" y1="257" x2="300" y2="268" />
        <line x1="360" y1="256" x2="360" y2="267" />
        <line x1="415" y1="254" x2="415" y2="265" />
        <line x1="465" y1="250" x2="465" y2="260" />
        <line x1="500" y1="245" x2="500" y2="255" />
      </g>
      <path
        d="M78,230 C68,214 70,196 84,182 C96,170 112,163 128,158 C160,140 200,124 245,113 C258,103 275,95 293,92 C308,80 326,72 345,73 C360,74 371,82 373,94 C372,103 366,110 357,114 C378,110 400,102 419,90 C433,81 448,75 463,76 C476,77 485,86 485,98 C484,109 476,118 464,124 C480,132 494,142 505,155 C517,169 524,185 526,202 C528,214 528,222 526,230 Z"
        fill={color}
        stroke="#17130E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M78,230 C68,214 70,196 84,182 C93,173 104,166 115,161 C112,180 104,199 91,215 C85,221 81,226 78,230 Z"
        fill="#ECE3CE"
        stroke="#17130E"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M464,124 C480,132 494,142 505,155 C517,169 524,185 526,202 C528,214 528,222 526,230 L505,230 C505,215 500,200 490,187 C480,172 467,160 452,151 Z"
        fill={accent}
      />
      <path d="M505,155 C516,169 523,185 525,202" fill="none" stroke="#17130E" strokeWidth="2" opacity="0.35" />
      <path d="M300,86 C315,80 330,78 344,80" fill="none" stroke="#ECE3CE" strokeWidth="2" strokeDasharray="2 6" opacity="0.6" />
      <g fill="#ECE3CE" stroke="#17130E" strokeWidth="1.5">
        <circle cx="200" cy="128" r="5.5" />
        <circle cx="245" cy="112" r="5.5" />
        <circle cx="290" cy="99" r="5.5" />
        <circle cx="335" cy="90" r="5.5" />
      </g>
      <g stroke="#ECE3CE" strokeWidth="4.5" strokeLinecap="round">
        <line x1="200" y1="128" x2="290" y2="99" />
        <line x1="245" y1="112" x2="335" y2="90" />
        <line x1="200" y1="128" x2="243" y2="148" />
        <line x1="290" y1="99" x2="332" y2="115" />
      </g>
      <path d="M419,90 C437,100 452,112 463,127" fill="none" stroke="#ECE3CE" strokeWidth="2.5" opacity="0.5" />
      <path
        d="M90,190 C115,175 150,158 190,144 C220,133 250,124 278,117"
        fill="none"
        stroke="#ECE3CE"
        strokeWidth="2"
        strokeDasharray="2 6"
        opacity="0.5"
      />
    </svg>
  );
}

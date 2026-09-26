const CORE_PRODUCTS = {
  'mumbai-low': {
    name: 'The Mumbai Low',
    price: 2499,
    color: '#202B41',
    accent: '#DED1AF',
    shortDesc: 'Low-top everyday canvas, breathable weave, cushioned insole for long platform waits.',
    tagline: 'Everyday low-top',
    description:
      'Our lightest build — an open-weave canvas upper with a cushioned footbed made for standing through a full commute. Designed for the days that start on a crowded platform and end the same way.',
    features: [
      'Breathable open-weave canvas',
      'Cushioned insole for all-day wear',
      'Vulcanized rubber sole',
      'Reinforced toe rand',
    ],
    dots: ['#202B41', '#DED1AF', '#A63B29'],
  },
  'local-high': {
    name: 'The Local High',
    price: 2799,
    color: '#A63B29',
    accent: '#202B41',
    shortDesc: 'High-top ankle support built for the 6am local and the 9pm walk home, reinforced heel.',
    tagline: 'High-top commuter',
    description:
      'A high-top built for ankle support on the 6am local and the walk home after a long shift. A reinforced heel counter and padded collar keep it comfortable through the day.',
    features: [
      'High-top ankle support',
      'Reinforced heel counter',
      'Padded collar',
      'Vulcanized grip sole',
    ],
    dots: ['#A63B29', '#202B41', '#D4952B'],
  },
  'monsoon-slip': {
    name: 'The Monsoon Slip',
    price: 2199,
    color: '#B87A1B',
    accent: '#202B41',
    shortDesc: 'Water-resistant canvas coating, quick-dry lining, grippy sole for wet stone steps.',
    tagline: 'Monsoon-ready slip-on',
    description:
      'Water-resistant canvas coating and a quick-dry lining, made for the season Indian streets dread most. A high-grip tread keeps you upright on wet stone steps and slick platforms.',
    features: [
      'Water-resistant canvas coating',
      'Quick-dry inner lining',
      'High-grip monsoon tread',
      'Slip-on — nothing to soak through',
    ],
    dots: ['#D4952B', '#202B41', '#DED1AF'],
  },
};

// City Editions — "The India Line". Same canvas-and-rubber build as the core
// range, recoloured and detailed after one specific, non-touristy material
// from each city rather than a skyline or landmark.
export const CITY_EDITIONS = {
  'jaipur-jaali': {
    city: 'Jaipur',
    code: 'JAI',
    name: 'The Jaipur Jaali',
    price: 3199,
    color: '#C15B4A',
    accent: '#C79A3E',
    shortDesc: 'Sandstone-pink canvas with a hand-block jaali lattice at the collar, Sanganer-dyed.',
    tagline: 'City Edition — Jaipur',
    description:
      'Dyed the pink of the old city’s sandstone and finished with a hand-block jaali print at the collar — a lattice pattern lifted from Jaipur’s stepwells. Each pair is block-printed by a Sanganer workshop before it’s stitched, so no two runs sit pixel-identical.',
    features: [
      'Hand-block jaali print at the collar',
      'Sandstone-pink canvas, Sanganer-dyed',
      'Same vulcanized grip sole as the core range',
      'Limited to 500 pairs',
    ],
    dots: ['#C15B4A', '#C79A3E', '#DED1AF'],
    limited: 500,
  },
  'kolkata-tram': {
    city: 'Kolkata',
    code: 'CCU',
    name: 'The Kolkata Tram',
    price: 2999,
    color: '#E3A825',
    accent: '#1D4E56',
    shortDesc: 'Taxi-yellow canvas with a dusk-teal heel, stitched for a city that still runs on rails.',
    tagline: 'City Edition — Kolkata',
    description:
      'Yellow like the Ambassadors still working the ranks outside Howrah, with a dusk-teal heel counter for the routes still running Esplanade to Gariahat. Built on the same commuter last as the rest of the range.',
    features: [
      'Taxi-yellow canvas upper',
      'Dusk-teal heel counter',
      'Reinforced toe rand for pavement wear',
      'Limited to 600 pairs',
    ],
    dots: ['#E3A825', '#1D4E56', '#17130E'],
    limited: 600,
  },
  'varanasi-ghat': {
    city: 'Varanasi',
    code: 'VNS',
    name: 'The Varanasi Ghat',
    price: 3299,
    color: '#2C9C93',
    accent: '#D9622B',
    shortDesc: 'Dawn-teal canvas dip-dyed to a diya-flame heel, the way the ghats look before sunrise.',
    tagline: 'City Edition — Varanasi',
    description:
      'Dip-dyed teal to flame-orange, the way the river looks from the ghats before sunrise — diyas still lit, sky just starting to turn. The gradient is hand-dipped, so every pair fades a little differently.',
    features: [
      'Hand dip-dyed teal-to-flame gradient',
      'Quick-dry lining for riverside humidity',
      'Vulcanized grip sole for wet stone steps',
      'Limited to 450 pairs',
    ],
    dots: ['#2C9C93', '#D9622B', '#ECE3CE'],
    limited: 450,
  },
  'chennai-filter': {
    city: 'Chennai',
    code: 'MAA',
    name: 'The Chennai Filter',
    price: 2999,
    color: '#7A3325',
    accent: '#D9C08A',
    shortDesc: 'Dark-roast filter-coffee canvas with steel-finish eyelets and a temple-cream sole trim.',
    tagline: 'City Edition — Chennai',
    description:
      'The colour of filter coffee decanted between davara and tumbler, with steel-toned eyelets and a temple-cream trim at the sole line. Made for the queue outside a Mylapore darshanam and the walk back after.',
    features: [
      'Dark-roast filter-coffee canvas',
      'Steel-finish eyelets',
      'Temple-cream sole trim',
      'Limited to 700 pairs',
    ],
    dots: ['#7A3325', '#D9C08A', '#D9A441'],
    limited: 700,
  },
  'hyderabad-pearl': {
    city: 'Hyderabad',
    code: 'HYD',
    name: 'The Hyderabad Pearl',
    price: 3199,
    color: '#D97856',
    accent: '#D98E3F',
    shortDesc: 'Coral-pink canvas with a biryani-saffron heel and pearl-white eyelet trim.',
    tagline: 'City Edition — Hyderabad',
    description:
      'Coral-pink like Charminar stone at dusk, with a saffron heel the colour of biryani steam and pearl-white eyelets standing in for the city’s old pearl trade. Built for the walk from the four arches to Necklace Road.',
    features: [
      'Coral-pink canvas upper',
      'Saffron heel counter',
      'Pearl-white eyelet trim',
      'Limited to 500 pairs',
    ],
    dots: ['#D97856', '#D98E3F', '#ECE3CE'],
    limited: 500,
  },
  'kochi-backwater': {
    city: 'Kerala',
    code: 'COK',
    name: 'The Kochi Backwater',
    price: 3099,
    color: '#2F6659',
    accent: '#A9784F',
    shortDesc: 'Backwater green with coir-brown trim, water-resistant for a city that’s half canal.',
    tagline: 'City Edition — Kochi',
    description:
      'Backwater green with a coir-brown lace and trim, coated water-resistant for a city that’s half canal. The colourway is pulled straight from the Chinese fishing nets at Fort Kochi at low tide.',
    features: [
      'Water-resistant backwater-green canvas',
      'Coir-brown lace and trim',
      'High-grip monsoon tread',
      'Limited to 550 pairs',
    ],
    dots: ['#2F6659', '#A9784F', '#ECE3CE'],
    limited: 550,
  },
};

export const CITY_EDITION_IDS = Object.keys(CITY_EDITIONS);
export const CORE_PRODUCT_IDS = Object.keys(CORE_PRODUCTS);

function withCategory(products, category) {
  return Object.fromEntries(Object.entries(products).map(([id, p]) => [id, { ...p, category }]));
}

export const PRODUCTS = {
  ...withCategory(CORE_PRODUCTS, 'core'),
  ...withCategory(CITY_EDITIONS, 'city-edition'),
};

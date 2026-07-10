import { Listing, Agent, NeighborhoodGuide, BlogPost, Review } from './types';

export const listingsData: Listing[] = [
  {
    id: 'lst_1',
    title: 'The Solitaire Waterfront Manor',
    type: 'buy',
    price: 24500000,
    beds: 6,
    baths: 8,
    sqft: 11200,
    pricePerSqft: 2187,
    lotSize: '1.4 Acres',
    yearBuilt: 2022,
    hoa: 450,
    address: '3200 Pacific Coast Highway',
    city: 'Malibu',
    description: 'Commanding over 150 feet of pristine beachfront, The Solitaire Waterfront Manor is an architectural triumph of limestone, floor-to-ceiling structural glass, and teak. Designed by world-renowned architect Richard Landry, this home seamlessly integrates organic outdoor dining spaces with state-of-the-art tech, featuring an absolute zero-edge infinity pool, professional wellness pavilion, automated salt-water aquarium, and private beach gate.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Beach Access', 'Infinity Pool', 'Home Cinema', 'Wellness Spa', 'Smart Automation', 'Wine Cellar'],
    schoolRating: 9.6,
    walkScore: 78,
    transitScore: 65,
    isFeatured: true,
    virtualTourUrl: '#',
    neighborhood: 'Malibu'
  },
  {
    id: 'lst_2',
    title: 'The Obsidian Bel Air Estate',
    type: 'buy',
    price: 18900000,
    beds: 5,
    baths: 7,
    sqft: 9800,
    pricePerSqft: 1928,
    lotSize: '0.9 Acres',
    yearBuilt: 2023,
    hoa: 380,
    address: '940 Bel Air Road',
    city: 'Beverly Hills',
    description: 'Rising from one of Bel Air’s most prestigious ridge lines, The Obsidian is an masterclass in sleek, moody minimalism. Clad in premium Italian volcanic stone and structural basalt columns, this monumental residence captures explosive 270-degree views of the LA Basin, downtown skyline, and Pacific Ocean. Highlights include a 12-foot custom stone pivot door, dual professional kitchens, auto-gallery for 6 vehicles, and a multi-level cascading water feature.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['cascading pool', 'auto gallery', 'professional kitchen', 'panoramic view', 'gymnasium', 'elevator'],
    schoolRating: 9.8,
    walkScore: 62,
    transitScore: 40,
    isFeatured: true,
    virtualTourUrl: '#',
    neighborhood: 'Beverly Hills'
  },
  {
    id: 'lst_3',
    title: 'The Crown Jewel Duplex Penthouse',
    type: 'buy',
    price: 32000000,
    beds: 4,
    baths: 5,
    sqft: 7400,
    pricePerSqft: 4324,
    lotSize: 'N/A',
    yearBuilt: 2021,
    hoa: 1800,
    address: '220 Central Park South, Apt 48B',
    city: 'New York',
    description: 'Hovering 800 feet above Central Park, this custom duplex penthouse offers the ultimate elevated lifestyle. Featuring handcrafted herringbone white oak floors, bespoke marble columns, and a custom helical bronze staircase. The master suite is a sanctuary in the clouds, spanning an entire half-floor with a boutique dressing chamber and calacatta gold marble baths overlooking the reservoir.',
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['24/7 Doorman', 'Private Elevator', 'Indoor Swimming Pool', 'Concierge Desk', 'Sky Terrace', 'Wine Vault'],
    schoolRating: 9.4,
    walkScore: 98,
    transitScore: 100,
    isFeatured: true,
    virtualTourUrl: '#',
    neighborhood: 'Downtown'
  },
  {
    id: 'lst_4',
    title: 'Amara Modern Pavilion Villa',
    type: 'rent',
    price: 45000,
    beds: 4,
    baths: 5,
    sqft: 6800,
    pricePerSqft: 6,
    lotSize: '0.7 Acres',
    yearBuilt: 2020,
    hoa: 0,
    address: '142 Biscayne Boulevard',
    city: 'Miami',
    description: 'Available for short or long-term lease, Amara Villa is an ultra-private compound designed to evoke a modern Zen floating sanctuary. Elevated columns rise from lush subtropical koi ponds, framing multiple interconnected pavilions. High-spec custom millwork, integrated surround sound systems, and premium wellness details provide an absolute resort-grade living experience steps from the Miami design district.',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Koi Ponds', 'Dock Berth', 'Outdoor Kitchen', 'Zen Garden', 'Zero-edge Pool', 'Smart Security'],
    schoolRating: 9.0,
    walkScore: 85,
    transitScore: 78,
    isFeatured: false,
    virtualTourUrl: '#',
    neighborhood: 'Malibu'
  },
  {
    id: 'lst_5',
    title: 'The Summit Alpine Sanctuary',
    type: 'buy',
    price: 14200000,
    beds: 6,
    baths: 7,
    sqft: 8900,
    pricePerSqft: 1595,
    lotSize: '2.5 Acres',
    yearBuilt: 2019,
    hoa: 220,
    address: '700 Red Mountain Road',
    city: 'Aspen',
    description: 'Draped beautifully over the mountainside of prestigious Red Mountain, The Summit Alpine Sanctuary offers ultimate mountain seclusion and architectural grandeur. Composed of reclaimed white fir, native granite boulders, and structural steel, this mountain fortress frames ski-in/ski-out capabilities with triple-pane insulated luxury window panes. A custom-built, half-buried basalt hot spring overlooks the valley below.',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Ski-in/Ski-out', 'Outdoor Hot Spring', 'Heated Driveway', 'Rustic Wine Cellar', 'Professional Sauna', 'Double Loft Office'],
    schoolRating: 9.5,
    walkScore: 40,
    transitScore: 30,
    isFeatured: false,
    virtualTourUrl: '#',
    neighborhood: 'Aspen'
  },
  {
    id: 'lst_6',
    title: 'The Obsidian Pavilion',
    type: 'rent',
    price: 32000,
    beds: 3,
    baths: 4,
    sqft: 5200,
    pricePerSqft: 6,
    lotSize: '0.4 Acres',
    yearBuilt: 2021,
    hoa: 150,
    address: '88 Diamond Street',
    city: 'Beverly Hills',
    description: 'This ultra-premium rental captures the epitome of Beverly Hills modern living. With floor-to-ceiling glass and seamless pocket doors, the main living salon merges flawlessly with an elevated pool deck. Features custom Italian lacquer cabinetry, high-end Gaggenau culinary suites, and private state-of-the-art security systems throughout.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Heated Pool', 'Smart Automation', 'Surround Sound', 'Chefs Kitchen', 'Bespoke Wardrobes', 'Security Detachment'],
    schoolRating: 9.7,
    walkScore: 84,
    transitScore: 68,
    isFeatured: false,
    virtualTourUrl: '#',
    neighborhood: 'Beverly Hills'
  }
];

export const agentsData: Agent[] = [
  {
    id: 'agt_1',
    name: 'Victoria Vance-Sloane',
    title: 'Senior Managing Partner',
    bio: 'With over two decades of experience securing transactions totaling over $1.5 billion, Victoria is the preeminent authority on residential acquisitions in Malibu and Bel Air. Known for her absolute discretion and bespoke representation, her clients include Fortune 100 CEOs, global leaders, and discerning estate collectors.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80',
    phone: '+1 (310) 555-0190',
    email: 'vance.sloane@aurora-estates.com',
    licensing: 'DRE #01489241',
    accreditations: ['CLHMS Million Dollar Guild', 'Top 100 Global Producers', 'Elite Luxury Council'],
    activeListingIds: ['lst_1', 'lst_2']
  },
  {
    id: 'agt_2',
    name: 'Christian Montgomery',
    title: 'Director of Global Acquisitions',
    bio: 'Christian leads our architectural and investment portfolio advisory desk. A graduate of Columbia Graduate School of Architecture, he couples deep technical understanding of structural engineering and architectural history with unparalleled market forecasting and asset valuation models.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80',
    phone: '+1 (212) 555-0143',
    email: 'c.montgomery@aurora-estates.com',
    licensing: 'DRE #01994821',
    accreditations: ['Licensed Real Estate Broker (NY)', 'AI Board of Appraisers', 'RICS Fellow'],
    activeListingIds: ['lst_3', 'lst_5']
  },
  {
    id: 'agt_3',
    name: 'Sienna Sterling',
    title: 'Principal Concierge & Lease Advisor',
    bio: 'Sienna manages the high-profile rental division, specializing in short-term seasonal leases for premium beachfront villas, international estate rentals, and secure corporate executive transfers. Her hyper-focused attention to detail makes every stay bespoke and flawless.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=500&q=80',
    phone: '+1 (305) 555-0188',
    email: 'sienna.sterling@aurora-estates.com',
    licensing: 'DRE #02084439',
    accreditations: ['Luxury Lease Specialist', 'Certified Relocation Representative'],
    activeListingIds: ['lst_4', 'lst_6']
  }
];

export const neighborhoodsData: NeighborhoodGuide[] = [
  {
    id: 'nh_1',
    name: 'Malibu',
    description: 'A legendary stretch of pristine Southern California coastline, Malibu is synonymous with effortless seaside grandeur. From private gates along Carbon Beach to dramatic architectural compounds over Zuma, Malibu offers ultimate seclusion, coastal beauty, and absolute luxury.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    avgPrice: 16400000,
    crimeSafetyIndex: '9.5/10 (Secure)',
    schoolRating: 9.7,
    walkability: 74,
    diningScore: 92,
    weatherSim: {
      temp: 74,
      condition: 'Sunny (Coast Breeze)',
      icon: 'Sun'
    }
  },
  {
    id: 'nh_2',
    name: 'Beverly Hills',
    description: 'An international emblem of prestige and architectural pedigree, Beverly Hills is framed by clean palatial palm lines, hyper-exclusive private security patrols, and legendary custom estates. Home to historic monuments and modern sculptural compounds.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    avgPrice: 19800000,
    crimeSafetyIndex: '9.8/10 (High Security)',
    schoolRating: 9.9,
    walkability: 82,
    diningScore: 98,
    weatherSim: {
      temp: 78,
      condition: 'Clear Sky',
      icon: 'Sun'
    }
  },
  {
    id: 'nh_3',
    name: 'Downtown',
    description: 'Dynamic urban elevation at its finest. Featuring ultra-exclusive high-rise penthouses, historical custom-refurbished lofts, and direct helicopter pad access. Offers quick connection to global financial circles, Michelin dining clubs, and cultural centers.',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=600&q=80',
    avgPrice: 9200000,
    crimeSafetyIndex: '8.8/10 (Monitored)',
    schoolRating: 9.2,
    walkability: 96,
    diningScore: 99,
    weatherSim: {
      temp: 72,
      condition: 'Overcast Skies',
      icon: 'Cloud'
    }
  }
];

export const blogData: BlogPost[] = [
  {
    id: 'blg_1',
    title: 'The Future of Residential Wellness in Architectural Design',
    summary: 'How premium structural designs are evolving to incorporate active clean-air filtration, automated circadian spectrum glass, and subterranean sensory wellness chambers.',
    content: 'Luxury real estate has officially surpassed the era of standard home gyms and saunas. Today’s premier buyers are prioritizing active botanical purification, triple-filtered medical-grade air circulation loops, and automated copper ionization indoor swimming basins. Custom architects are engineering subterranean zen chambers with acoustic dampening, creating total escape sanctuaries within metropolitan centers.',
    category: 'Design',
    readTime: '6 min read',
    date: 'July 8, 2026',
    author: 'Victoria Vance-Sloane',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'blg_2',
    title: 'Q3 Global High-Net-Worth Residential Investment Forecast',
    summary: 'An empirical analysis of monetary policy changes, cross-border equity movements, and high-prestige safe-haven real estate assets.',
    content: 'Global financial transitions are prompting high-net-worth families to reallocate fluid capital into high-prestige tangible safe-haven physical assets. Key metrics indicate that premium architectural estates on the West Coast and top-floor Manhattan penthouses have decoupled from general housing interest rate sensitivities, charting robust historical appreciation and solid long-term resilience.',
    category: 'Investing',
    readTime: '9 min read',
    date: 'July 2, 2026',
    author: 'Christian Montgomery',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'blg_3',
    title: 'The Rise of Modern Organic Minimalism in Malibu',
    summary: 'A visual exploration of raw basalt countertops, structural board-formed concrete, and native sustainable cedar claddings along the coast.',
    content: 'Modern coastal design is shedding cold corporate steel in favor of textured warm organic surfaces. We trace several monumental builds that celebrate custom-finished basalt stone slabs, custom textured plaster elements, and weathered coastal timbers that grow more beautiful as they age in the ocean air.',
    category: 'Lifestyle',
    readTime: '5 min read',
    date: 'June 28, 2026',
    author: 'Sienna Sterling',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  }
];

export const reviewsData: Review[] = [
  {
    id: 'rev_1',
    author: 'Alexander & Seraphina Sterling',
    text: 'Victoria and her team handled our Carbon Beach acquisition with absolute class and ironclad discretion. The bespoke advisory service and local off-market access made all the difference.',
    rating: 5,
    role: 'Founders, Sterling Capital Holdings',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'rev_2',
    author: 'Dr. Evelyn Rousseau',
    text: 'The investment evaluation models presented by Christian were impeccable. Highly analytical, precise, and completely customized to our trust structure. Unrivaled experience.',
    rating: 5,
    role: 'Managing Trustee, Rousseau Private Family Trust',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80'
  }
];

export interface Listing {
  id: string;
  title: string;
  type: 'buy' | 'rent';
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  pricePerSqft: number;
  lotSize: string;
  yearBuilt: number;
  hoa: number;
  address: string;
  city: string;
  description: string;
  images: string[];
  amenities: string[];
  schoolRating: number;
  walkScore: number;
  transitScore: number;
  isFeatured: boolean;
  virtualTourUrl: string;
  neighborhood: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  phone: string;
  email: string;
  licensing: string;
  accreditations: string[];
  activeListingIds: string[];
}

export interface NeighborhoodGuide {
  id: string;
  name: string;
  description: string;
  image: string;
  avgPrice: number;
  crimeSafetyIndex: string; // e.g. "Excellent (9.4/10)"
  schoolRating: number;      // e.g. 9.5
  walkability: number;       // e.g. 88
  diningScore: number;       // e.g. 96
  weatherSim: {
    temp: number;
    condition: string;
    icon: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Market Trends' | 'Design' | 'Lifestyle' | 'Investing';
  readTime: string;
  date: string;
  author: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  role: string;
  image: string;
}

export interface AppState {
  page: 'home' | 'listings' | 'details' | 'about' | 'services' | 'neighborhoods' | 'blog' | 'contact';
  selectedListingId: string | null;
  savedListingIds: string[];
  searchFilters: {
    city: string;
    type: 'buy' | 'rent' | 'all';
    minPrice: number;
    maxPrice: number;
    beds: string;
    baths: string;
    propertyType: string;
    sortBy: string;
  };
  theme: 'light' | 'dark';
}

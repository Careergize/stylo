export interface Service {
  id: string;
  name: string;
  category: 'Haircut' | 'Beard' | 'Hair Spa' | 'Skin Care' | 'Hair Fixing' | 'Package';
  price: number;
  originalPrice?: number;
  duration: string;
  suitableFor: string;
  description: string;
  includes: string[];
  image: string;
  iconName: string;
  isPopular?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewCount: string;
  experience: string;
  speciality: string;
  image: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  stylistId: string;
  stylistName: string;
  stylistImage: string;
  date: string;
  dayLabel: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export const SALON_INFO = {
  name: "Stylo Gents Beauty Parlor",
  tagline: "Your Style, Our Passion",
  secondaryTagline: "Elevate Your Grooming",
  locationHeader: "Avenue City, Central Hub",
  fullAddress: "123 Sample Street, Suite 400, Avenue City, State 123456",
  rating: 4.9,
  reviewsCount: "6,400+",
  yearsOfService: "18+",
  businessHours: "Daily 9:00 AM – 10:00 PM",
  phone: "+91 91234 56789",
  whatsapp: "+91 91234 56789",
  googleMapsUrl: "https://maps.google.com/?q=Avenue+City",
  perks: [
    "Ample Car & Bike Parking",
    "Sterilized & UV-Treated Tools",
    "Premium Air-Conditioned Ambience",
    "High-Speed Free Wi-Fi",
    "Complimentary Espresso & Refreshments",
    "Private Grooming Suite Available"
  ]
};

export const SERVICES: Service[] = [
  {
    id: "haircut-styling",
    name: "Precision Haircut & Restyling",
    category: "Haircut",
    price: 350,
    originalPrice: 450,
    duration: "45 min",
    suitableFor: "All Hair Types",
    description: "A personalized haircut with expert styling tailored to your face shape, posture, and hair density. Includes head wash & premium matte pomade finish.",
    includes: [
      "Custom Face-Shape Consultation",
      "Precision Scissor & Fade Work",
      "Refreshing Scalp Wash & Conditioning",
      "Blow Dry & Matte Clay Styling",
      "Neck Shave & Razor Clean-up"
    ],
    image: "/images/service_haircut.jpg",
    iconName: "Scissors",
    isPopular: true
  },
  {
    id: "beard-sculpting",
    name: "Beard Sculpting & Trimming",
    category: "Beard",
    price: 200,
    originalPrice: 250,
    duration: "30 min",
    suitableFor: "Stubble to Full Beard",
    description: "Sharp symmetrical edging with beard conditioning, steam towel treatment, and nourishing botanical beard oil massage.",
    includes: [
      "Beard Length Reduction & Gradient",
      "Hot Steam Herbal Towel",
      "Straight Razor Precision Lining",
      "Almond & Argan Beard Oil Massage",
      "Cool Astringent Touch-up"
    ],
    image: "/images/service_haircut.jpg",
    iconName: "Flame",
    isPopular: true
  },
  {
    id: "hair-spa-treatment",
    name: "Hair Spa & Scalp Therapy",
    category: "Hair Spa",
    price: 750,
    originalPrice: 950,
    duration: "60 min",
    suitableFor: "Dry, Thinning & Stressed Scalp",
    description: "Deep nourishing argan infusion accompanied by gentle pressure-point scalp massage to stimulate hair follicles and eliminate dandruff.",
    includes: [
      "Clarifying Shampoo Wash",
      "Deep Protein Infusion Mask",
      "20-Min Acupressure Head Massage",
      "Ozone Nano-Steam Treatment",
      "Strengthening Serum Coat"
    ],
    image: "/images/welcome_hero.jpg",
    iconName: "Droplets",
    isPopular: true
  },
  {
    id: "detan-face-cleanup",
    name: "De-Tan & Face Clean-Up",
    category: "Skin Care",
    price: 550,
    originalPrice: 700,
    duration: "40 min",
    suitableFor: "All Skin Types & Sun Tan",
    description: "Instant botanical de-tan exfoliation that lifts away deep impurities, road dust, and dead skin cells, restoring a radiant masculine glow.",
    includes: [
      "Deep Pore Cleansing Wash",
      "Volcanic Walnut Particle Scrub",
      "Active Oxygen De-Tan Pack",
      "Chilled Ice-Globe Lymphatic Massage",
      "Matte SPF 50 Hydrating Gel"
    ],
    image: "/images/promo_model.jpg",
    iconName: "ShieldCheck",
    isPopular: true
  },
  {
    id: "hair-fixing-weaving",
    name: "Hair Fixing & Non-Surgical Weaving",
    category: "Hair Fixing",
    price: 4500,
    originalPrice: 5500,
    duration: "90 min",
    suitableFor: "Thinning Crown / Receding Hairline",
    description: "100% natural virgin human hair patch custom matched to your hair texture, density, and natural flow with breathable scalp mesh.",
    includes: [
      "Private Consultation & Scalp Mapping",
      "Hypoallergenic Medical-Grade Bonding",
      "Custom Hairpiece Blending & Haircut",
      "Seamless Natural Crown Flow",
      "Maintenance & Styling Kit Guide"
    ],
    image: "/images/service_haircut.jpg",
    iconName: "Crown",
    isPopular: true
  },
  {
    id: "groom-complete-makeover",
    name: "The Royal Groom Package",
    category: "Package",
    price: 1800,
    originalPrice: 2400,
    duration: "120 min",
    suitableFor: "Weddings, Receptions & Milestones",
    description: "Our signature luxury gentleman experience covering complete hair, beard, skin radiance, and relaxing spa therapy.",
    includes: [
      "Stylo Master Haircut & Restyling",
      "Royal Beard Shave & Hot Towel",
      "O3+ Radiance Face Clean-Up",
      "Intense Nourishing Hair Spa",
      "Head, Neck & Shoulder Acupressure"
    ],
    image: "/images/promo_model.jpg",
    iconName: "Award",
    isPopular: true
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: "akhil",
    name: "Akhil",
    role: "Master Stylist & Lead",
    rating: 4.9,
    reviewCount: "3,400+",
    experience: "16+ Yrs Exp",
    speciality: "Precision Scissor Fades & Beard Architecture",
    image: "/images/stylist_deepu.jpg",
    isAvailable: true
  },
  {
    id: "vishnu",
    name: "Vishnu",
    role: "Senior Stylist & Fade Specialist",
    rating: 4.8,
    reviewCount: "1,980+",
    experience: "9+ Yrs Exp",
    speciality: "Textured Crops, Taper Fades & Modern Styling",
    image: "/images/stylist_senior.jpg",
    isAvailable: true
  },
  {
    id: "hari",
    name: "Hari",
    role: "Hair Spa & Treatment Lead",
    rating: 4.9,
    reviewCount: "1,120+",
    experience: "7+ Yrs Exp",
    speciality: "Scalp Therapies, Keratin & Hair Fixing",
    image: "/images/promo_model.jpg",
    isAvailable: true
  }
];

export const INITIAL_UPCOMING_BOOKING: Booking = {
  id: "BK-8842",
  serviceId: "haircut-styling",
  serviceName: "Precision Haircut & Beard Sculpting",
  servicePrice: 350,
  stylistId: "akhil",
  stylistName: "Akhil",
  stylistImage: "/images/stylist_deepu.jpg",
  date: "2026-05-20",
  dayLabel: "Wed, May 20",
  timeSlot: "11:00 AM",
  customerName: "Rahul Krishna",
  customerPhone: "+91 91234 56789",
  status: "Confirmed",
  createdAt: "2026-05-18T10:30:00"
};

export const TIME_SLOTS = [
  "09:30 AM",
  "10:00 AM",
  "10:45 AM",
  "11:30 AM",
  "12:15 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:30 PM",
  "07:30 PM",
  "08:30 PM"
];

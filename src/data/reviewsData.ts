export interface CustomerReview {
  id: string;
  customerName: string;
  avatarColor: string;
  rating: number;
  date: string;
  serviceName: string;
  comment: string;
  photos: string[];
  likes: number;
  isVerified: boolean;
}

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    customerName: "Rahul Nair",
    avatarColor: "from-amber-600 to-amber-800",
    rating: 5,
    date: "2 days ago",
    serviceName: "The Royal Groom Package",
    comment: "Booked Stylo for my wedding ceremony makeover. Akhil was an absolute master! The traditional Kasavu mundu styling, chin contouring, and side pompadour fade turned out beyond expectations. Every guest complimented the look!",
    photos: [
      "/images/groom_kerala_silk_makeover.jpg"
    ],
    likes: 38,
    isVerified: true
  },
  {
    id: "rev-2",
    customerName: "Arjun Menon",
    avatarColor: "from-blue-600 to-indigo-800",
    rating: 5,
    date: "5 days ago",
    serviceName: "Precision Haircut & Restyling",
    comment: "Hands down the best fade in Avenue City. The hot steam towel and argan oil finish were so refreshing. Super clean shop with sterilized UV equipment and great espresso while waiting.",
    photos: [
      "/images/service_haircut.jpg"
    ],
    likes: 24,
    isVerified: true
  },
  {
    id: "rev-3",
    customerName: "Siddharth Varma",
    avatarColor: "from-emerald-600 to-teal-800",
    rating: 5,
    date: "1 week ago",
    serviceName: "The Royal Groom Package",
    comment: "Got ready here for my grand wedding reception. The velvet tuxedo look paired with their O3+ de-tan facial and sculpted beard trim gave me the exact red-carpet confidence I needed. Worth every rupee!",
    photos: [
      "/images/groom_tuxedo_makeover.jpg",
      "/images/groom_royal_makeover.jpg"
    ],
    likes: 42,
    isVerified: true
  },
  {
    id: "rev-4",
    customerName: "Karthik Ravindran",
    avatarColor: "from-purple-600 to-violet-800",
    rating: 5,
    date: "2 weeks ago",
    serviceName: "Beard Sculpting & Trimming",
    comment: "Vishnu gave my beard the sharpest straight-razor lines I've ever had. Clean edges, no razor burns, and the botanical oil massage was incredible. Stylo has become my permanent grooming spot.",
    photos: [
      "/images/welcome_hero.jpg"
    ],
    likes: 19,
    isVerified: true
  }
];

const LOCAL_STORAGE_KEY = 'stylo_customer_reviews';

export function getSavedReviews(): CustomerReview[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to load reviews from localStorage", err);
  }
  return INITIAL_REVIEWS;
}

export function saveReviews(reviews: CustomerReview[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error("Failed to save reviews to localStorage", err);
  }
}

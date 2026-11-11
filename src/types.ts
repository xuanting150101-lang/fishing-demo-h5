export interface Spot {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  fishTypes: string[];
  rating: number;
  price: string;
  bringOwn: { gear: boolean; bait: boolean };
  description: string;
  images: string[];
  distance: string;
  crowd: "少" | "适中" | "多" | "爆满";
  fishCondition: "没口" | "一般" | "有口" | "爆护";
  bookingSlots?: BookingSlot[];
  lat: number;
  lng: number;
}

export interface BookingSlot {
  id: string;
  date: string;
  timeRange: string;
  available: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  createdAt: string;
  views: number;
  likes: number;
  follows: number;
  favorites: number;
  hotComment?: Comment;
  comments: Comment[];
  category?: string;
  postType?: "daily" | "technique";
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  images?: string[];
  createdAt?: string;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  author: User;
  content: string;
  likes: number;
  createdAt?: string;
  replyTo?: string;
}

export interface User {
  id: string;
  avatar: string;
  nickname: string;
  userId?: string;
  followers?: number;
  following?: number;
  postsCount?: number;
  favorites?: number;
  bio?: string;
  recentSpots?: Spot[];
  recentPosts?: Post[];
  savedSpots?: Spot[];
  savedPosts?: Post[];
}

export interface Weather {
  temp: number;
  condition: string;
  wind: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  wind: string;
}

export type PostType = "daily" | "technique";

export const TECHNIQUE_CATEGORIES = [
  "钓技巧",
  "钓具",
  "饵料",
  "选位",
  "调漂",
  "天气",
  "其他",
];
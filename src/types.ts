export interface BookingSlot {
  id: string;
  date: string;
  timeRange: string;
  available: boolean;
}

export interface Reply {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: Reply[];
}

export interface Spot {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
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
}

export interface User {
  id: string;
  userId: string;
  nickname: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  favorites: number;
  likes?: number;
  recentPosts?: Post[];
  recentSpots?: Spot[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images: string[];
  createdAt: string;
  category: string;
  likes: number;
  comments: Comment[];
  views: number;
}

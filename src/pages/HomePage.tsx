import DiscoverPage from "./DiscoverPage";
import type { Post } from "@/types";

interface HomePageProps {
  onPostClick: (post: Post) => void;
}

export default function HomePage({ onPostClick }: HomePageProps) {
  return <DiscoverPage onPostClick={onPostClick} />;
}

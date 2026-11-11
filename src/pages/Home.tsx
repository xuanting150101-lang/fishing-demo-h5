import { useState } from "react";
import DiscoverPage from "./DiscoverPage";
import SpotsPage from "./SpotsPage";
import SavedSpotsPage from "./SavedSpotsPage";
import UserPage from "./UserPage";
import type { Spot, Post } from "@/types";

interface HomeProps {
  activeTab: "discover" | "spots" | "saved" | "profile";
  onSpotClick: (spot: Spot) => void;
  onPostClick: (post: Post) => void;
  onPublish: () => void;
}

export default function Home({
  activeTab,
  onSpotClick,
  onPostClick,
  onPublish,
}: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {activeTab === "discover" && <DiscoverPage onPostClick={onPostClick} />}
      {activeTab === "spots" && (
        <SpotsPage onSpotClick={onSpotClick} searchQuery={searchQuery} />
      )}
      {activeTab === "saved" && (
        <SavedSpotsPage onSpotClick={onSpotClick} />
      )}
      {activeTab === "profile" && (
        <UserPage onPublish={onPublish} />
      )}
    </div>
  );
}

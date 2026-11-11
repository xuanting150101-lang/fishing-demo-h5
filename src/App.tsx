import { useState, useCallback } from "react";
import { HomePage } from "./pages/HomePage";
import { SpotsPage } from "./pages/SpotsPage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UserPage } from "./pages/UserPage";
import { SavedSpotsPage } from "./pages/SavedSpotsPage";
import { BottomNav } from "./components/BottomNav";
import { SpotDetail } from "./components/SpotDetail";
import { PostDetail } from "./components/PostDetail";
import { PublishPage } from "./components/PublishPage";
import { FullScreenGallery } from "./components/FullScreenGallery";
import { ToastProvider } from "./components/Toast";
import type { Spot, Post, User } from "./types";

type View =
  | "home"
  | "spots"
  | "discover"
  | "profile"
  | "spotDetail"
  | "postDetail"
  | "userPage"
  | "savedSpots"
  | "publish";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [gallery, setGallery] = useState<{
    images: string[];
    startIndex: number;
  } | null>(null);

  const handleSpotClick = useCallback((spot: Spot) => {
    setSelectedSpot(spot);
    setCurrentView("spotDetail");
  }, []);

  const handlePostClick = useCallback((post: Post) => {
    setSelectedPost(post);
    setCurrentView("postDetail");
  }, []);

  const handleUserClick = useCallback((user: User) => {
    setSelectedUser(user);
    setCurrentView("userPage");
  }, []);

  const handleBack = useCallback(() => {
    if (currentView === "spotDetail") {
      setCurrentView("spots");
      setSelectedSpot(null);
    } else if (currentView === "postDetail") {
      setCurrentView("discover");
      setSelectedPost(null);
    } else if (currentView === "userPage") {
      setCurrentView("discover");
      setSelectedUser(null);
    } else if (currentView === "savedSpots") {
      setCurrentView("profile");
    } else if (currentView === "publish") {
      setCurrentView("discover");
    } else {
      setCurrentView("home");
    }
  }, [currentView]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        setCurrentView("home");
        break;
      case "spots":
        setCurrentView("spots");
        break;
      case "discover":
        setCurrentView("discover");
        break;
      case "profile":
        setCurrentView("profile");
        break;
    }
  }, []);

  const showGallery = useCallback((images: string[], startIndex: number) => {
    setGallery({ images, startIndex });
  }, []);

  return (
    <ToastProvider>
    <div className="min-h-[100dvh] bg-[#030508] flex flex-col max-w-md mx-auto relative overflow-hidden">
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        {currentView === "home" && (
          <HomePage onSpotClick={handleSpotClick} />
        )}
        {currentView === "spots" && (
          <SpotsPage onSpotClick={handleSpotClick} />
        )}
        {currentView === "discover" && (
          <DiscoverPage
            onPostClick={handlePostClick}
            onPublishClick={() => setCurrentView("publish")}
          />
        )}
        {currentView === "profile" && (
          <ProfilePage
            onUserClick={handleUserClick}
            onPostClick={handlePostClick}
            onSpotClick={handleSpotClick}
            onSavedSpotsClick={() => setCurrentView("savedSpots")}
          />
        )}
        {currentView === "spotDetail" && selectedSpot && (
          <SpotDetail spot={selectedSpot} onBack={handleBack} />
        )}
        {currentView === "postDetail" && selectedPost && (
          <PostDetail
            post={selectedPost}
            onBack={handleBack}
            onUserClick={handleUserClick}
            onSpotClick={handleSpotClick}
            onShowGallery={showGallery}
          />
        )}
        {currentView === "userPage" && selectedUser && (
          <UserPage
            user={selectedUser}
            onBack={handleBack}
            onPostClick={handlePostClick}
            onSpotClick={handleSpotClick}
          />
        )}
        {currentView === "savedSpots" && (
          <SavedSpotsPage onBack={handleBack} onSpotClick={handleSpotClick} />
        )}
        {currentView === "publish" && (
          <PublishPage onBack={handleBack} />
        )}
      </main>

      {!["spotDetail", "postDetail", "userPage", "savedSpots", "publish"].includes(
        currentView
      ) && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}

      {gallery && (
        <FullScreenGallery
          images={gallery.images}
          startIndex={gallery.startIndex}
          onClose={() => setGallery(null)}
        />
      )}
    </div>
    </ToastProvider>
  );
}

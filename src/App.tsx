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
import type { Spot, Post, User } from "./types";

type Tab = "home" | "spots" | "discover" | "profile";
type View =
  | { type: "tab"; tab: Tab }
  | { type: "spot"; spot: Spot }
  | { type: "post"; post: Post }
  | { type: "user"; user: User }
  | { type: "publish" }
  | { type: "savedSpots" };

function App() {
  const [view, setView] = useState<View>({ type: "tab", tab: "home" });
  const [gallery, setGallery] = useState<{ images: string[]; startIndex: number } | null>(null);

  const goToTab = useCallback((tab: Tab) => {
    setView({ type: "tab", tab });
    window.scrollTo(0, 0);
  }, []);

  const goToSpot = useCallback((spot: Spot) => {
    setView({ type: "spot", spot });
    window.scrollTo(0, 0);
  }, []);

  const goToPost = useCallback((post: Post) => {
    setView({ type: "post", post });
    window.scrollTo(0, 0);
  }, []);

  const goToUser = useCallback((user: User) => {
    setView({ type: "user", user });
    window.scrollTo(0, 0);
  }, []);

  const goToPublish = useCallback(() => {
    setView({ type: "publish" });
    window.scrollTo(0, 0);
  }, []);

  const goToSavedSpots = useCallback(() => {
    setView({ type: "savedSpots" });
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    setView((v) => {
      if (v.type === "user") return { type: "tab", tab: "profile" };
      if (v.type === "spot") return { type: "tab", tab: "spots" };
      if (v.type === "post") return { type: "tab", tab: "discover" };
      if (v.type === "publish") return { type: "tab", tab: "discover" };
      if (v.type === "savedSpots") return { type: "tab", tab: "profile" };
      return v;
    });
    window.scrollTo(0, 0);
  }, []);

  const currentTab: Tab =
    view.type === "tab"
      ? view.tab
      : view.type === "user"
      ? "profile"
      : view.type === "spot"
      ? "spots"
      : view.type === "publish"
      ? "discover"
      : view.type === "savedSpots"
      ? "profile"
      : "discover";

  const showNav = view.type === "tab";

  return (
    <div className="min-h-[100dvh] bg-[#030508] flex flex-col max-w-md mx-auto relative overflow-hidden">
      <main className={`flex-1 overflow-y-auto scrollbar-hide ${showNav ? "pb-20" : ""}`}>
        {view.type === "tab" && view.tab === "home" && (
          <HomePage onSpotClick={goToSpot} />
        )}
        {view.type === "tab" && view.tab === "spots" && (
          <SpotsPage onSpotClick={goToSpot} />
        )}
        {view.type === "tab" && view.tab === "discover" && (
          <DiscoverPage onPostClick={goToPost} onPublishClick={goToPublish} />
        )}
        {view.type === "tab" && view.tab === "profile" && (
          <ProfilePage
            onUserClick={goToUser}
            onPostClick={goToPost}
            onSpotClick={goToSpot}
            onSavedSpotsClick={goToSavedSpots}
          />
        )}
        {view.type === "spot" && (
          <SpotDetail spot={view.spot} onBack={goBack} />
        )}
        {view.type === "post" && (
          <PostDetail
            post={view.post}
            onBack={goBack}
            onUserClick={goToUser}
          />
        )}
        {view.type === "user" && (
          <UserPage
            user={view.user}
            onBack={goBack}
            onPostClick={goToPost}
            onSpotClick={goToSpot}
          />
        )}
        {view.type === "publish" && (
          <PublishPage onBack={goBack} onPublish={() => goToTab("discover")} />
        )}
        {view.type === "savedSpots" && (
          <SavedSpotsPage onBack={goBack} onSpotClick={goToSpot} />
        )}
      </main>

      {showNav && (
        <BottomNav active={currentTab} onChange={goToTab} />
      )}

      {gallery && (
        <FullScreenGallery
          images={gallery.images}
          startIndex={gallery.startIndex}
          onClose={() => setGallery(null)}
        />
      )}
    </div>
  );
}

export default App;
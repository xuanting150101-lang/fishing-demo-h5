import { useState } from "react";
import Home from "./pages/Home";
import SpotDetail from "./components/SpotDetail";
import PostDetail from "./components/PostDetail";
import PublishPage from "./components/PublishPage";
import BottomNav from "./components/BottomNav";
import { ToastProvider } from "./components/Toast";
import type { Spot } from "./types";
import type { Post } from "./types";

type View =
  | { type: "home"; tab: "discover" | "spots" | "saved" | "profile" }
  | { type: "spotDetail"; spot: Spot }
  | { type: "postDetail"; post: Post }
  | { type: "publish" };

function App() {
  const [view, setView] = useState<View>({ type: "home", tab: "discover" });

  const navigateToSpot = (spot: Spot) => setView({ type: "spotDetail", spot });
  const navigateToPost = (post: Post) => setView({ type: "postDetail", post });
  const navigateHome = (tab: "discover" | "spots" | "saved" | "profile") =>
    setView({ type: "home", tab });
  const navigatePublish = () => setView({ type: "publish" });

  const currentTab =
    view.type === "home" ? view.tab : ("discover" as const);

  return (
    <ToastProvider>
      <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#0B1628] text-white overflow-hidden">
        <div className="pb-20">
          {view.type === "home" && (
            <Home
              activeTab={view.tab}
              onSpotClick={navigateToSpot}
              onPostClick={navigateToPost}
              onPublish={navigatePublish}
            />
          )}
          {view.type === "spotDetail" && (
            <SpotDetail
              spot={view.spot}
              onBack={() => navigateHome(currentTab)}
            />
          )}
          {view.type === "postDetail" && (
            <PostDetail
              post={view.post}
              onBack={() => navigateHome(currentTab)}
            />
          )}
          {view.type === "publish" && (
            <PublishPage onBack={() => navigateHome(currentTab)} />
          )}
        </div>
        {view.type === "home" && (
          <BottomNav activeTab={view.tab} onNavigate={navigateHome} />
        )}
      </div>
    </ToastProvider>
  );
}

export default App;

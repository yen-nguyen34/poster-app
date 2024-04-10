import { useState } from "react";
import "./App.css";
import NewPost from "./components/NewPost";
import PostList from "./components/PostList";
import Header from "./components/Header";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header onCreatePost={handleShowModal} />
      <main>
        <PostList isPosting={showModal} onStopPosting={handleHideModal} />
      </main>
    </>
  );
}

export default App;

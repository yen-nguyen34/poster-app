import { useEffect, useState } from "react";
import classes from "./PostList.module.css";
import Post from "./Post";
import NewPost from "./NewPost";
import Modal from "./Modal";

export default function PostList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/posts");
        const resData = await response.json();
        setPosts(resData.posts);
        setIsDataFetching(false);
        console.log(resData);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchData();
  }, []);

  const addPostHandler = (postData) => {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    // update current state and existingData from previous state (old state)
    setPosts((existingData) => [postData, ...existingData]);
  };

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onClose={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.author} author={post.author} text={post.text} />
          ))}
        </ul>
      )}
      {!isDataFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some posts here!</p>
        </div>
      )}
      {isDataFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading Posts ...</p>
        </div>
      )}
    </>
  );
}

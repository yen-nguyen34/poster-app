import { useEffect, useState } from "react";
import classes from "./PostList.module.css";
import Post from "./Post";
import NewPost from "../routes/NewPost";
import Modal from "./Modal";

export default function PostList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);

  useEffect(() => {
    // GET data
    // dùng useEffect() với tham số phụ thuộc [] rỗng vì ta chỉ cần Get data 1 lần
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/posts");
        const result = await response.json();
        setPosts(result.posts);
        setIsDataFetching(false);
        console.log("Success : ", result, "1"); // resData return array of object json
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchData();
  }, []);

  // In POST method: not using useEffect() bcoz 'create Post' có thể thực hiện liên tục, dùng trực tiếp fetch() để gọi sẽ
  // update the UI with the new post without waiting for a response from the server
  const addPostHandler = async (postData) => {
    // POST method
    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      console.log("Success : ", result);
    } catch (error) {
      console.log("Error: ", error);
    }
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

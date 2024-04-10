import { useRef, useState } from "react";
import classes from "./NewPost.module.css";

export default function NewPost({ onAddPost }) {
  const [bodyData, setBodyData] = useState("");
  const [authorData, setAuthorData] = useState("");

  const handleBodyChange = (event) => {
    setBodyData(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthorData(event.target.value);
  };

  const handleSubmitData = (event) => {
    event.preventDefault();
    const postData = {
      text: bodyData,
      author: authorData,
    };
    onAddPost(postData);
    console.log(postData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitData}>
      <p>
        <label htmlFor="text">Text</label>
        <textarea id="text" required rows={3} onChange={handleBodyChange} />
      </p>
      <p>
        <label htmlFor="author">Your name</label>
        <input id="author" type="text" required onChange={handleAuthorChange} />
      </p>
      <p className={classes.actions}>
        <button type="button">Cancel</button>
        <button>Submit</button>
      </p>
    </form>
  );
}

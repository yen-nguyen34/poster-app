import classes from "./Post.module.css";

export default function Post({ author, text }) {
  return (
    <li className={classes.post}>
      <p className={classes.author}>{author}</p>
      <p className={classes.text}>{text}</p>
    </li>
  );
}

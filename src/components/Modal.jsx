import classes from "./Modal.module.css";

export default function Modal({ children, onClose }) {
    // children tương đương props truyền vào, chính là 
    // <Modal></Modal> trong component cha <PostList PostList ></PostList >
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}/>
      <dialog open={true} className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

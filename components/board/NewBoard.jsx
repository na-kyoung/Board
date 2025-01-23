import { useRef } from 'react';

import classes from './NewBoard.module.css';

function NewBoard(props) {
  const titleInputRef = useRef();
  const writerInputRef = useRef();
  const contentInputRef = useRef();
  const dateInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredWriter = writerInputRef.current.value;
    const enteredContent = contentInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    const boardData = {
      title: enteredTitle,
      writer: enteredWriter,
      content: enteredContent,
      date: enteredDate,
    };

    props.onAddBoard(boardData);
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='writer'>Writer</label>
          <input type='text' id='writer' ref={writerInputRef} required />
        </div>
        {/* <div className={classes.control}>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date' ref={dateInputRef} required />
        </div> */}
        <div className={classes.control}>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            rows='20'
            ref={contentInputRef}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Write</button>
        </div>
      </form>
    </>
  );
}

export default NewBoard;

import { useRef, useState } from 'react';

import classes from './ModifyBoard.module.css';

function ModifyBoard(props) {
  const modifyData = props.modifyData;
  console.log(modifyData);

  const [content, setContent] = useState(modifyData.content);

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

    props.onModifyBoard(boardData);
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleInputRef} defaultValue={modifyData.title} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='writer'>Writer</label>
          <input type='text' id='writer' ref={writerInputRef} defaultValue={modifyData.writer} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date' ref={dateInputRef} defaultValue={modifyData.date} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            rows='10'
            ref={contentInputRef}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          >
          </textarea>
        </div>
        <div className={classes.actions}>
          <button>Modify</button>
        </div>
      </form>
    </>
  );
}

export default ModifyBoard;

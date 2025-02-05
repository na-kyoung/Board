"use client"; // CSR

import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './ModifyBoard.module.css';
import ModifyFile from '../file/ModifyFile';

function ModifyBoard(props) {
  const modifyData = props.modifyData;
  
  const [content, setContent] = useState(modifyData.content);

  const titleInputRef = useRef();
  const writerInputRef = useRef();
  const contentInputRef = useRef();

  const router  = useRouter();
  const boardID = router.query.boardID;
  // console.log(boardID);

  function submitHandler(event) {
    event.preventDefault();
    modifyBoard();
  }

  const modifyBoard = async () => {
    const title = titleInputRef.current.value;
    const user_id = writerInputRef.current.value;
    const content = contentInputRef.current.value;

    console.log('글 수정 중 ...');
    try {
      const response = await fetch(`http://localhost:5000/modifyboard/${boardID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, user_id, content }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('글 수정 완료!');
        router.push(`/${boardID}`);
        // router.push(window.location.origin + `/${boardID}`);  // 절대 경로
      } else {
        console.log('글 수정 실패 : ' + result.message);
      }
    } catch (error) {
      console.error('Error updating data :', error);
    }
  };

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
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            rows='15'
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
      <ModifyFile postID={boardID} />
    </>
  );
}

export default ModifyBoard;

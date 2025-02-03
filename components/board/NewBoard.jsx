import { useRef } from 'react';

import classes from './NewBoard.module.css';
import { useRouter } from 'next/router';

function NewBoard(props) {
  const titleInputRef = useRef();
  const writerInputRef = useRef();
  const contentInputRef = useRef();

  const router  = useRouter();

  function submitHandler(event) {
    event.preventDefault();
    createBoard();
  }

  // 글 생성
  const createBoard = async () => {
    const title = titleInputRef.current.value;
    const user_id = writerInputRef.current.value;
    const content = contentInputRef.current.value;

    console.log('글 생성 중 ...');
    try {
      const response = await fetch(`http://localhost:5000/createboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, user_id, content }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('글 생성 완료!');
        router.push(`/`); // 메인화면 이동
        // router.push(window.location.origin + `/${boardID}`);  // 절대 경로
      } else {
        console.log('글 생성 실패 : ' + result.message);
      }
    } catch (error) {
      console.error('Error creating data :', error);
    }
  };

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
            rows='15'
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

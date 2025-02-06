"use client"; // CSR

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ModifyFile from '../file/ModifyFile';
import classes from './ModifyBoard.module.css';

function ModifyBoard(props) {
  const modifyData = props.modifyData;
  
  const [content, setContent] = useState(modifyData.content);
  const [completedSave, setCompletedSave] = useState(false); // DB 수정 완료

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
        setCompletedSave((completedSave) => !completedSave); // 수정완료여부 자식 컴포넌트에 전달
      } else {
        console.log('글 수정 실패 : ' + result.message);
      }
    } catch (error) {
      console.error('Error updating data :', error);
    }
  };

  // 파일 업로드까지 완료시 화면 이동
  function handleRouting(){
    router.push(`/${boardID}`);
    // router.push(window.location.origin + `/${boardID}`);  // 절대 경로
  }

  // textarea 입력 초과시 높이 조절
  function handleTextareaChange(e){
    setContent(e.target.value);
    resizeTextarea();
  }

  // textarea 높이 조절
  const resizeTextarea = () => {
    const textarea = contentInputRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이 초기화 후 다시 계산
      textarea.style.height = textarea.scrollHeight + "px";
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
            onChange={handleTextareaChange}
            required
          >
          </textarea>
        </div>
        <div className={classes.actions}>
          <button>Modify</button>
        </div>
      </form>
      <ModifyFile postID={boardID} completedSave={completedSave} onUpload={handleRouting} />
    </>
  );
}

export default ModifyBoard;

import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import NewFile from '../file/NewFile';
import classes from './NewBoard.module.css';

function NewBoard(props) {
  const titleInputRef = useRef();
  const writerInputRef = useRef();
  const contentInputRef = useRef();

  const router  = useRouter();

  const [content, setContent] = useState(); // textarea 내용
  const [completedSave, setCompletedSave] = useState(false); // DB 수정 완료
  const [insertID, setInsertID] = useState(false); // 저장 후 가져온 key값

  function submitHandler(event) {
    event.preventDefault();
    createBoard();
  }

  // 글 생성
  async function createBoard(){
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
        setCompletedSave((completedSave) => !completedSave); // 저장완료여부 자식 컴포넌트에 전달
        setInsertID(result.rows.insertId); // key값 변경
      } else {
        console.log('글 생성 실패 : ' + result.message);
      }
    } catch (error) {
      console.error('Error creating data :', error);
    }
  };

  // 파일 업로드까지 완료시 화면 이동
  function handleRouting(){
    router.replace(`/`); // 메인화면 이동
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
          <input type='text' id='title' ref={titleInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='writer'>Writer</label>
          <input type='text' id='writer' ref={writerInputRef} required />
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
          ></textarea>
        </div>
        <div>
          
        </div>
        <div className={classes.actions}>
          <button>Write</button>
        </div>
      </form>
      <NewFile postID={insertID} completedSave={completedSave} onUpload={handleRouting} />
    </>
  );
}

export default NewBoard;

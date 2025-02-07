"use client"; // CSR

import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Comment from '../comment/MainComment';
import File from '../file/File';
import classes from './Board.module.css';

function Board(props) {
  console.log('Board Start!');
  const [boardData, setBoardData] = useState([]); // DB에서 가져온 데이터
  const [content, setContent] = useState(); // textarea 내용

  const contentInputRef = useRef();

  // 파라미터에서 id 가져오기
  const router  = useRouter();
  const boardID = router.query.boardID;
  // console.log(boardID);

  // 글 조회
  useEffect(() => {
    console.log('Fetching Board Data...');

    async function fetchBoard() {
      const response = await fetch(`http://localhost:5000/board/${boardID}`);
      const resData = await response.json();
      // console.log(resData);
      const data = await dateFormat(resData[0]);
      setBoardData(data);
      setContent(data.content);
    }

    fetchBoard();
  }, []);

  // 날짜 포맷 변경
  function dateFormat(data){
    const createdDate = new Date(data.created_at);
    const date = createdDate.toISOString().split("T")[0];

    data = {
      ...data,
      created_at: date
    }

    return data;
  }

  // 글 삭제
  const handleDelete = async () => {
    const isConfirmed = window.confirm('헤당 글을 삭제하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/deleteboard/${boardID}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        alert('글 삭제 완료!');
        router.push(`/`);
      } else {
        alert(`글 삭제 실패 : ${result.message}`);
      }
    } catch (error) {
      console.error('글 삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // textarea 입력 초과시 높이 조절
  function handleTextareaChange(e){
    // setContent(e.target.value);
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

  // textarea 높이 조절
  useEffect(() => {
    resizeTextarea();
  }, [content]);

  return (
    <>
      <form className={classes.form}>
      <div className={classes.control}>
        <h2> {boardData.title} </h2>
      </div>
      <div className={classes.control}>
        <h4 className={classes.controldate}> {boardData.created_at} </h4>
        <h4 className={classes.controlwriter}> {boardData.user_id} </h4>
      </div>
      <div className={classes.control}>
        <textarea id="content" rows="1" value={content} ref={contentInputRef} onChange={handleTextareaChange} readOnly />
      </div>
      <div className={classes.actions}>
        <button type='button'>
        <Link href={{
            pathname: `/modifyboard/${boardID}`,
            query: {
            title: boardData.title,
            writer: boardData.user_id,
            date: boardData.created_at,
            content: boardData.content
            },
            }}
            as={`/modifyboard/${boardID}`}>
            Modify
        </Link>
        </button>
        <button type='button' onClick={() => handleDelete()}>Delete</button>
      </div>
      </form>
      <File postID={boardID} />
      <Comment postID={boardID} />
    </>
  );
}

export default Board;

"use client"; // CSR

import { useRouter } from 'next/router';
import classes from './Board.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Comment from '../comment/MainComment';
import FileUpload from '../FileUpload';

function Board(props) {
  console.log('Board Start! ');
  const [boardData, setBoardData] = useState([]); // DB에서 가져온 데이터

  // 파라미터에서 id 가져오기
  const router  = useRouter();
  const boardID = router.query.boardID;
  console.log(boardID);

  // 데이터 가져오기
  useEffect(() => {
    console.log('Fetching Board Data...');

    async function fetchBoard() {
      const response = await fetch(`http://localhost:5000/board/${boardID}`);
      const resData = await response.json();
      // console.log(resData);
      const data = await dateFormat(resData[0]);
      setBoardData(data);
    }

    fetchBoard();
  }, []);

  // 날짜 포맷 변경
  function dateFormat(data){
    // console.log(data.created_at);
    const createdDate = new Date(data.created_at);
    const date = createdDate.toISOString().split("T")[0];

    data = {
      ...data,
      created_at: date
    }
    // console.log(data.created_at);

    return data;
  }

  function submitHandler(event) {
    event.preventDefault();
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

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <h2> {boardData.title} </h2>
        </div>
        <div className={classes.control}>
          <h4 className={classes.controldate}> {boardData.created_at} </h4>
          <h4 className={classes.controlwriter}> {boardData.user_id} </h4>
        </div>
        <div className={classes.control}>
          <textarea id="content" rows="15" value={boardData.content} readOnly />
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
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      </form>
      {/* <FileUpload postID={boardID} /> */}
      <Comment postID={boardID} />
    </>
  );
}

export default Board;

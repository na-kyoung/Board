import { useRouter } from 'next/router';
import classes from './Board.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Board(props) {
  console.log('Board Start! ');
  const [boardData, setBoardData] = useState([]); // DB에서 가져온 데이터

  // 파라미터에서 id 가져오기
  const router  = useRouter();
  const boardID = router.query.boardID;
  console.log(boardID);

  // const boardData = props.boardData[0];
  // console.log(boardData);

  // 데이터 가져오기
  useEffect(() => {
    console.log('Fetching Data...');

    async function fetchBoard() {
      const response = await fetch(`http://localhost:5000/board/${boardID}`);
      const resData = await response.json();
      // console.log(resData);
      const data = dateFormat(resData[0]);
      setBoardData(data); 
    }

    fetchBoard();
  }, []);

  // 날짜 포맷 변경
  function dateFormat(data){
    console.log(data.created_at);

    const createdDate = new Date(data.created_at);
    const date = createdDate.toISOString().split("T")[0];
    // setBoardData((prevData) => ({
    //   ...prevData,
    //   created_at: createdDate
    //   // createdDate.toISOString().split("T")[0]
    // }));

    data = {
      ...data,
      created_at: date
    }
    console.log(data.created_at);

    return data;
  }

  function submitHandler(event) {
    event.preventDefault();
  }

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
          <textarea id="content" rows="20" value={boardData.content} readOnly />
        </div>
        <div className={classes.actions}>
          <button type='button'>
            <Link href={{
              pathname: `/modifyboard/${boardData.boardID}`,
              query: {title: boardData.title,
                      writer: boardData.user_id,
                      date: boardData.created_at,
                      content: boardData.content
              },
              }}
              as={`/modifyboard/${boardData.boardID}`}>
                Modify
            </Link>
          </button>
          <button>Delete</button>
        </div>
      </form>
    </>
  );
}

export default Board;

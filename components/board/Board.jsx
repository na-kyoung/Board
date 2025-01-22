import { useRouter } from 'next/router';
import classes from './Board.module.css';
import Link from 'next/link';
import { useEffect } from 'react';

function Board(props) {
  console.log('Board Start! ', props);
  const router  = useRouter();

  const boardData = props.boardData[0];
  // console.log(boardData);

  useEffect(() => {
    console.log('Fetching Data...');
    fetch('http://localhost:5000/testSelect', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Fetch Error : ', err);
    })
  }, []);


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
          <h4 className={classes.controldate}> {boardData.date} </h4>
          <h4 className={classes.controlwriter}> {boardData.writer} </h4>
        </div>
        <div className={classes.control}>
          <textarea id="content" rows="20" value={boardData.content} readOnly />
        </div>
        <div className={classes.actions}>
          <button type='button'>
            <Link href={{
              pathname: `/modifyboard/${boardData.boardID}`,
              query: {title: boardData.title,
                      writer: boardData.writer,
                      date: boardData.date,
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
      {/* <div>
        <textarea></textarea>
      </div> */}
      <ul>
        <li>댓글</li>
        <li>댇글</li>
        <li>댓ㄱ들ㅇ</li>
      </ul>
    </>
  );
}

export default Board;

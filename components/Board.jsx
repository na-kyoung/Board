import { useRouter } from 'next/router';
import classes from './Board.module.css';
import Link from 'next/link';

function Board(props) {
  const router  = useRouter();

  const boardData = props.boardData[0];
  console.log(boardData);


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
          <h4> 작성자 : {boardData.writer} </h4>
        </div>
        <div className={classes.control}>
          <h4> 작성일 : {boardData.date} </h4>
        </div>
        <div className={classes.control}>
          <textarea id="content" rows="10" value={boardData.content} readOnly />
        </div>
        <div className={classes.actions}>
          <Link href={{
            pathname: `/modifyboard/${boardData.boardID}`,
            query: {title: boardData.title,
                    writer: boardData.writer,
                    date: boardData.date,
                    content: boardData.content
            },
            }}
            as={`/modifyboard/${boardData.boardID}`}>
              Modify Board
          </Link>
        </div>
      </form>
    </>
  );
}

export default Board;

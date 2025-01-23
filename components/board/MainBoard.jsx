import Link from "next/link";
import classes from './MainBoard.module.css';
import { useState } from "react";

function MainBoard(props){
    console.log('MainBoard Start! ');
    console.log('props.boards : ', props.boards);
    const boardData = props.boards;

    // 데이터 가져오기
    // useEffect(() => {
    //     console.log('Fetching Data...');

    //     async function fetchBoard() {
    //     const response = await fetch(`http://localhost:5000/board`);
    //     const resData = await response.json();
    //     // console.log(resData);
    //     const data = dateFormat(resData[0]);
    //     setBoardData(data); 
    //     }

    //     fetchBoard();
    // }, []);

    
    return (
    <>
        {/* <h1>The MainPage</h1>
        <ul className={classes.list}>
            <li>
                <Link href="/1">ReactJS Is A Great Framework</Link>
            </li>
            <li>
                <Link href="/2">NextJS Is A Great Framework</Link>
            </li>
            <li>
                <Link href={`/${boardID}`}>Testing...</Link>
            </li>
        </ul> */}

        <table className={classes.table}>
            <thead>
                <tr className={classes.thead}>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {boardData.map((board) => {
                    return (
                        <tr className={classes.tbody} key={board.post_id}>
                            <td>{board.no}</td>
                            <td><Link href={`/${board.post_id}`}>{board.title}</Link></td>
                            <td>{board.content}</td>
                            <td>{new Date(board.created_at).toISOString().split("T")[0]}</td>
                        </tr>)
                })}
                {/* <tr className={classes.tbody}>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                </tr> */}
            </tbody>
        </table>
    </>);
}

export default MainBoard;
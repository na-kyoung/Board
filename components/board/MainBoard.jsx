import Link from "next/link";
import classes from './MainBoard.module.css';

function MainBoard(props){
    console.log('MainBoard Start!');
    // console.log('props.boards : ', props.boards);
    const boardData = props.boards;
    
    return (
    <>
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

            </tbody>
        </table>
    </>
    );
}

export default MainBoard;
import { useEffect, useState } from "react";
import classes from './Comment.module.css';
import { format } from "date-fns";

function Comment(props){
    console.log('Comment Start', props.postID);

    const [commentData, setCommentData] = useState([]); // DB에서 가져온 데이터
    // const [newComment, setNewComment] = useState(false);
    const boardID = props.postID;

    // 데이터 가져오기
    useEffect(() => {
        console.log('Fetching Comment Data...');

        async function fetchComment() {
        const response = await fetch(`http://localhost:5000/comment/${boardID}`);
        const resData = await response.json();
        // console.log(resData);
        const data = await dateFormat(resData);
        setCommentData(data);
        }

        fetchComment();
    }, []);

    // 날짜 포맷 변경
    function dateFormat(data){
        for(let i=0; i<data.length; i++){
            // console.log(i.created_at);
            const formattedDate = format(new Date(data[i].created_at), "yyyy-MM-dd HH:mm:ss");
            // console.log(formattedDate);
            data[i].created_at = formattedDate;
        }
        
        return data;
    }

    return (
        <>
            <hr />
            {/* <p onClick={handleNewComment}>New Comment</p>
            {newComment &&
                <div>
                    작성자 : <input />
                    <textarea />
                    <button>작성</button>
                </div>
            } */}

            <div className={classes.commentBox}>
                {commentData.map((comment) => {
                    return (
                        <div className={classes.comment} key={comment.comment_id} style={{ paddingLeft: `${0.5 + (comment.depth || 0) * 3}rem` }}>
                            <p className={classes.user}>{comment.user_id}</p>
                            <input className={classes.content} value={comment.content} readOnly />
                            <div className={classes.btn}>
                                <p className={classes.date}>{comment.created_at}</p>
                                <button>답글</button>
                                <button>수정</button>
                                <button>삭제</button>
                            </div>
                            <hr/>
                        </div>
                )})}
            </div>

            {/* <div>
                <p>New Comment</p>
                <input />
                <button>작성</button>
            </div> */}
        </>
    );
}

export default Comment;
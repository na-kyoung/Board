import { useEffect, useRef, useState } from "react";
import classes from './MainComment.module.css';
import { format } from "date-fns";
import NewComment from "./NewComment";
import Comment from "./Comment";
import { useRouter } from "next/router";

function MainComment(props){
    // console.log('MainComment Start', props.postID);

    const [commentData, setCommentData] = useState([]); // DB에서 가져온 데이터
    // const [replyBtn, setReplyBtn] = useState(Array(commentData.length).fill(false));
    const [newComment, setNewComment] = useState(false);
    const boardID = props.postID;

    const userInputRef = useRef();
    const commentInputRef = useRef();

    // const router  = useRouter();

    // 데이터 가져오기
    useEffect(() => {
        console.log('Fetching Comment Data...');
        async function fetchComment() {
        const response = await fetch(`http://localhost:5000/comment/${boardID}`);
        const resData = await response.json();
        const data = await dateFormat(resData);
        setCommentData(data);
        setNewComment(false);
        }

        fetchComment();
    }, [newComment]);

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

    function submitHandler(event) {
        event.preventDefault();
        createComment();
        event.target.reset(); // 초기화
    }

    // 글 생성
    const createComment = async () => {
        const user_id = userInputRef.current.value;
        const content = commentInputRef.current.value;
        const depth = 0;
        const post_id = boardID;
        const parent_id = null;

        try {
        const response = await fetch(`http://localhost:5000/createcomment`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post_id, user_id, parent_id, content, depth }),
        });

        const result = await response.json();

        if (result.success) {
            console.log('댓글 생성 완료!');
            setNewComment(true);
        } else {
            console.log('댓글 생성 실패 : ' + result.message);
        }
        } catch (error) {
        console.error('Error creating data :', error);
        }
    };
  
    return (
        <>
            <hr />
            <div className={classes.commentBox}>
                {commentData.map((comment) => {
                    return (
                        <Comment key={comment.comment_id} comment={comment}/>
                        // <div className={classes.comment} key={comment.comment_id} style={{ paddingLeft: `${0.5 + (comment.depth || 0) * 3}rem` }}>
                        //     <p className={classes.user}>{comment.user_id}</p>
                        //     <input className={classes.content} value={comment.content} readOnly />
                        //     <div className={classes.btn}>
                        //         <p className={classes.date}>{comment.created_at}</p>
                        //         <button>답글</button>
                        //         <button>수정</button>
                        //         <button>삭제</button>
                        //     </div>
                        //     <hr/>
                        // </div>
                )})}
            </div>
            {/* <div className={classes.newcomment}>
                <p>New Comment</p>
                <NewComment depth={-1} boardID={boardID} />
            </div> */}
            <form onSubmit={submitHandler} className={classes.newcomment} style={{ paddingLeft: '0.5rem' }}>
                <p>New Comment</p>
                User : <input type='text' id='user' ref={userInputRef} className={classes.user} />
                <br/>
                Comment : <input type='text' id='comment' ref={commentInputRef} className={classes.content} />
                <div className={classes.btn}>
                    <button>작성</button>
                </div>
                <hr/>
            </form>
        </>
    );
}

export default MainComment;
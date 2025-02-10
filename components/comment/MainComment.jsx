import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import Comment from "./Comment";
import classes from './MainComment.module.css';

function MainComment(props){
  // console.log('MainComment Start', props.postID);
  const [commentData, setCommentData] = useState([]); // DB에서 가져온 데이터
  const [newComment, setNewComment] = useState(false); // 새로운 댓글 작성시 댓글 조회 트리거
  const [changeComment, setChangeComment] = useState(false); // 댓글 변화 시(수정, 삭제, 답글 작성) 조회 트리거
  const boardID = props.postID;

  const userInputRef = useRef();
  const commentInputRef = useRef();

  // 데이터 가져오기
  useEffect(() => {
    console.log('Fetching Comment Data...');
    async function fetchComment() {
    const response = await fetch(`http://localhost:5000/comment/${boardID}`);
    const resData = await response.json();
    const data = dateFormat(resData);
    setCommentData(data);
    }

    fetchComment();
  }, [newComment, changeComment]);

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

  // 댓글 생성
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
        setNewComment((newComment) => !newComment);
      } else {
        alert('댓글 생성 실패 : ' + result.message);
      }
    } catch (error) {
      console.error('Error creating data :', error);
    }
  };

  // 댓글 변화시 재조회 (대댓글 작성, 댓글 수정/삭제)
  function handleChangeComment(){
    setChangeComment((changeComment) => !changeComment);
  }

  return (
    <>
      <hr className={classes.hr} />
      <div className={classes.commentBox}>
        {commentData.map((comment) => {
          return (
            <Comment key={comment.comment_id}
                    comment={comment}
                    onChangeComment={handleChangeComment} />
        )})}
      </div>
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
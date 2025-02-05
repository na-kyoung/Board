import { useRef } from 'react';
import classes from './ReplyComment.module.css';

function ReplyComment({ onNewReply, ...props }){
  const replydepth = props.depth+1;

  const userInputRef = useRef();
  const commentInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    createReply();
    event.target.reset(); // 초기화
  }

  // 대댓글 생성
  const createReply = async () => {
    const post_id = props.post_id;
    const user_id = userInputRef.current.value;
    const parent_id = props.parent_id;
    const depth = replydepth;
    const content = commentInputRef.current.value;

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
        console.log('대댓글 생성 완료!');
        onNewReply(); // 상태끌어올리기
      } else {
        console.log('대댓글 생성 실패 : ' + result.message);
      }
    } catch (error) {
      console.error('Error creating data :', error);
    }
  };

  return(
    <form onSubmit={submitHandler} className={classes.reply} style={{ paddingLeft: '0.5rem' }}>
      <p>Reply</p>
      User : <input type='text' id='user' ref={userInputRef} className={classes.user} required />
      <br/>
      Comment : <input type='text' id='comment' ref={commentInputRef} className={classes.content} required />
      <div className={classes.btn}>
        <button>작성</button>
      </div>
      <hr/>
    </form>
  );
}

export default ReplyComment;
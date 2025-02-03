import { useRef } from 'react';
import classes from './NewComment.module.css';

function NewComment(props){
    const depth = props.depth;
    // console.log(props);

    const userInputRef = useRef();
    const commentInputRef = useRef();
  
    // 날짜형식 변경
    // const createdDate = new Date(modifyData.date);
    // const date = createdDate.toISOString().split("T")[0];
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredUser = userInputRef.current.value;
      const enteredComment = commentInputRef.current.value;
      // const enteredDate = dateInputRef.current.value;
  
      const commentData = {
        user: enteredUser,
        comment: enteredComment,
        depth: depth+1,
        post: props.boardID
      };

      console.log(commentData);
    //   props.onAddComment(commentData);
    }

    return(
        <>
            {/* <div className={classes.comment} style={{ paddingLeft: `${0.5 + ({depth} || 0) * 3}rem` }}>
                User : <input type='text' id='user' className={classes.user} /><br/>
                Comment : <input type='text' id='comment' className={classes.content} />
                <div className={classes.btn}>
                    <button>작성</button>
                </div>
                <hr/>
            </div> */}
            <form onSubmit={submitHandler} className={classes.comment} style={{ paddingLeft: `${0.5 + ({depth} || 0) * 3}rem` }}>
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

export default NewComment;
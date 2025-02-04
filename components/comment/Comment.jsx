import { useState } from 'react';
import classes from './Comment.module.css';
import ReplyComment from './ReplyComment';

function Comment({ onNewReply, ...props }){
    console.log('Comment', props.comment.comment_id);
    // console.log(props.comment);
    const comment = props.comment;

    const [ showReply, setShowReply ] = useState(false); // 대댓글

    function handleReplyClick(){
        setShowReply((showReply) => !showReply);
    }

    // 대댓글 생성시 
    function handleNewReply(){
        setShowReply((showReply) => !showReply); // 답글창 닫기
        // console.log('handleNewReply');
        onNewReply(); // 상태 끌어올리기
    }

    return (
        <>
            <div className={classes.comment} key={comment.comment_id} style={{ paddingLeft: `${0.5 + (comment.depth || 0) * 3.5}rem` }}>
                <p className={classes.user}>{comment.user_id}</p>
                <input className={classes.content} value={comment.content} readOnly />
                <div className={classes.btn}>
                    <p className={classes.date}>{comment.created_at}</p>
                    <button onClick={handleReplyClick}>답글</button>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <hr/>
            </div>
            <div>
                {showReply && 
                    <ReplyComment depth={comment.depth} 
                                post_id={comment.post_id}
                                parent_id={comment.comment_id}
                                onNewReply={handleNewReply} />
                }
            </div>
        </>
    );
}

export default Comment;
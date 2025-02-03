import classes from './Comment.module.css';

function Comment(props){
    // console.log(props.comment);
    const comment = props.comment;

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
    );
}

export default Comment;
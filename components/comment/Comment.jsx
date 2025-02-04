import { useRef, useState } from 'react';
import classes from './Comment.module.css';
import ReplyComment from './ReplyComment';

function Comment({ onChangeComment, ...props }){
    console.log('Comment', props.comment.comment_id);
    // console.log(props.comment);

    const comment = props.comment;
    // console.log(comment.user_id, comment.content);

    // const userInputRef = useRef(comment.user_id);
    // const commentInputRef = useRef(comment.content);

    const [showReply, setShowReply] = useState(false); // 대댓글
    const [showModify, setShowModify] = useState(false); // 수정창
    const [userInput, setUserInput] = useState(comment.user_id);
    const [contentInput, setContentInput] = useState(comment.content);

    // 대댓글 창 생성
    function handleReplyClick(){
        setShowReply((showReply) => !showReply);
    }

    // 대댓글 생성시 상태 끌어올리기
    function handleNewReply(){
        setShowReply((showReply) => !showReply); // 답글창 닫기
        onChangeComment(); // 상태 끌어올리기
    }

    // 댓글 삭제
    const handleDelete = async () => {
        const isConfirmed = window.confirm('헤당 댓글을 삭제하시겠습니까?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:5000/deletecomment/${comment.comment_id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                // alert('댓글 삭제 완료!');
                onChangeComment(); // 상태 끌어올리기
            } else {
                alert(`댓글 삭제 실패 : ${result.message}`);
            }
        } catch (error) {
            console.error('댓글 삭제 오류:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    // 수정 상태로 변경
    function handleModifyClick(){
        setShowModify((showModify) => !showModify);
    }

    // 댓글 수정
    function handleModify(){
        console.log('제출 : ', userInput, contentInput);

        modifyComment();
        // setShowModify((showModify) => !showModify); // 수정 창 닫기
    }

    // 댓글 수정
    const modifyComment = async () => {
        console.log('댓글 수정 중 ...');
        try {
          const response = await fetch(`http://localhost:5000/modifycomment/${comment.comment_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput, contentInput }),
          });
    
          const result = await response.json();
    
          if (result.success) {
            console.log('댓글 수정 완료!');
            setShowModify((showModify) => !showModify); // 수정 창 닫기
            onChangeComment(); // 상태 끌어올리기
          } else {
            console.log('댓글 수정 실패 : ' + result.message);
          }
        } catch (error) {
          console.error('Error updating data :', error);
        }
    };

    // 일반 댓글창 & 댓글 수정창
    let commentBox = (
            <div className={classes.comment} key={comment.comment_id} style={{ paddingLeft: `${0.5 + (comment.depth || 0) * 3.5}rem` }}>
                <p className={classes.user}>{comment.user_id}</p>
                <input className={classes.content} value={comment.content} readOnly />
                <div className={classes.btn}>
                    <p className={classes.date}>{comment.created_at}</p>
                    <button onClick={handleReplyClick}>답글</button>
                    <button onClick={handleModifyClick}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
                <hr/>
            </div>
    );
    if(showModify) {
        commentBox = (
            <div className={classes.modi_comment} key={comment.comment_id} style={{ paddingLeft: `${0.5 + (comment.depth || 0) * 3.5}rem` }}>
                User : <input type='text' className={classes.modi_user} value={userInput} onChange={(e) => setUserInput(e.target.value)} required />
                <br />
                Comment : <input type='text' className={classes.modi_content} value={contentInput} onChange={(e) => setContentInput(e.target.value)} required />
                <div className={classes.btn}>
                    <p className={classes.date}>{comment.created_at}</p>
                    <button onClick={handleModify}>수정</button>
                </div>
                <hr/>
            </div>
        );
    }

    return (
        <>
            {commentBox}
            {/* <div className={classes.comment} key={comment.comment_id} style={{ paddingLeft: `${0.5 + (comment.depth || 0) * 3.5}rem` }}>
                <p className={classes.user}>{comment.user_id}</p>
                <input className={classes.content} value={comment.content} readOnly />
                <div className={classes.btn}>
                    <p className={classes.date}>{comment.created_at}</p>
                    <button onClick={handleReplyClick}>답글</button>
                    <button onClick={handleModify}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
                <hr/>
            </div> */}
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
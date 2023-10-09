import React, { useState } from "react";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import reply from "./images/icon-reply.svg";
import deleteIcon from "./images/icon-delete.svg";
import editIcon from "./images/icon-edit.svg";
import juliusomo from "./images/avatars/image-juliusomo.webp";
import { data } from "./data.js";

export default function InteractiveComments() {
  const [isData, setIsData] = useState(data);
  const [replyText, setReplyText] = useState("");
  const [isClickedMap, setIsClickedMap] = useState({});
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);

  function handleReplyClick(commentId) {
    setIsClickedMap((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId] || false,
    }));

    if (replyingToCommentId === commentId) {
      setReplyingToCommentId(null);
    } else {
      setReplyingToCommentId(commentId);
    }
  }

  function handleReply(parentId, replyText, commentId) {
    const newReply = {
      id: new Date().getTime(),
      user: {
        username: 'juliusomo',
        image: {
          png: juliusomo,
        },
      },
      createdAt: new Date().toLocaleString(),
      replyingTo: parentId,
      content: replyText,
      score: 0,
    };

    const updateData = isData.map((commentData) => {
      if (commentData.comments.some((comment) => comment.id === parentId)) {
        return {
          ...commentData,
          comments: commentData.comments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...comment.replies, newReply],
              };
            }
            return comment;
          }),
        };
      }
      return commentData;
    });

    setIsData(updateData);
    setIsClickedMap((prevState) => ({
      ...prevState,
      [commentId]: false
    }));
  }

  return (
    <div className="interactive-comments">
      {isData.map((commentData) => (
        <div key={commentData.currentUser.username}>
          <Comment
            isData={isData}
            onReply={handleReplyClick}
            isClickedMap={isClickedMap}
            replyingToCommentId={replyingToCommentId}
          />
          <Reply
            isData={isData}
            onReply={handleReplyClick}
            isClickedMap={isClickedMap}
            replyingToCommentId={replyingToCommentId}
            replyText={replyText}
            setReplyText={setReplyText}
            onReplySend={handleReply}
          />
          <AddComment onReply={handleReply} />
        </div>
      ))}
    </div>
  );
}

function Comment({ isData, onReply, isClickedMap, replyingToCommentId }) {
  return (
    <div>
      {isData.map((commentData) => (
        <div key={commentData.currentUser.username}>
          {commentData.comments.map((comment) => (
            <div className="margin-ax" key={comment.id}>
              <CommentComponent
                score={comment.score}
                username={comment.user.username}
                createdAt={comment.createdAt}
                userImage={comment.user.image.png}
                content={comment.content}
                commentId={comment.id}
                onReply={onReply}
                isClickedMap={isClickedMap}
                replyingToCommentId={replyingToCommentId}
              />
              <div>
                {comment.replies.length > 0 ? (
                  <ReplyComponent />
                ) : null}
              </div>
              {replyingToCommentId === comment.id && (
                <div className="reply-input-field">
                  <AddComment />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CommentComponent({
  score,
  onReply,
  content,
  username,
  createdAt,
  userImage,
  commentId,
}) {
  return (
    <div className="comment">
      <Score score={score} />
      <div className="comment-left">
        <UserName
          onReply={onReply}
          username={username}
          createdAt={createdAt}
          userImage={userImage}
          commentId={commentId}
        />{" "}
        <p>{content}</p>
      </div>
    </div>
  );
}

function Reply({
  isData,
  onReply,
  isClickedMap,
  replyingToCommentId,
  replyText,
  setReplyText,
  onReplySend,
}) {
  return (
    <div>
      {isData.map((commentData) => (
        <div key={commentData.currentUser.username}>
          {commentData.comments.map((comment) => (
            <div key={comment.id}>
              {comment.replies.map((reply) => (
                <div className="margin-ax">
                  <ReplyComponent
                    score={reply.score}
                    username={reply.user.username}
                    createdAt={reply.createdAt}
                    userImage={reply.user.image.png}
                    replyingTo={reply.replyingTo}
                    content={reply.content}
                    commentId={reply.id}
                    onReply={onReply}
                    isClickedMap={isClickedMap}
                    replyingToCommentId={replyingToCommentId}
                  />
                  <div>
                  </div>
                  {replyingToCommentId === reply.id && (
                    <div className="reply-input-field">
                      <AddReplyComment
                        replyingTo={reply.user.username}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        onReplySend={(text) => onReplySend(reply.id, text, reply.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ReplyComponent({
  score,
  onReply,
  username,
  createdAt,
  userImage,
  replyingTo,
  content,
  commentId,
}) {
  return (
    <div className="reply">
      <Score score={score} />
      <div className="reply-left">
        {username !== "juliusomo" ? (
          <UserName
            username={username}
            createdAt={createdAt}
            userImage={userImage}
            onReply={onReply}
            commentId={commentId}
          />
        ) : (
          <YouUsername
            username={username}
            createdAt={createdAt}
            userImage={userImage}
          />
        )}
        <h4>
          <span>@{replyingTo}</span> {content}
        </h4>
      </div>
    </div>
  );
}

function Score({ score }) {
  return (
    <div className="score">
      <img src={plus} alt="plus" />
      <p>{score}</p>
      <img src={minus} alt="minus" />
    </div>
  );
}

function UserName({ username, createdAt, userImage, onReply, commentId }) {
  const handleReplyClick = () => {
    onReply(commentId);
  };

  return (
    <div className="username">
      <div className="username-left">
        <img src={userImage} alt={username} />
        <h2>{username}</h2>
        <p>{createdAt}</p>
      </div>
      <button onClick={handleReplyClick} className="username-right">
        <img src={reply} alt="reply" />
        <p>Reply</p>
      </button>
    </div>
  );
}

function YouUsername({ username, createdAt, userImage }) {
  return (
    <div className="you-username">
      <div className="you-username-left">
        <img src={userImage} alt={username} />
        <h2>{username}</h2>
        <h6>you</h6>
        <p>{createdAt}</p>
      </div>
      <div className="you-username-right">
        <button className="delete-section">
          <img src={deleteIcon} alt="delete" />
          <p>Delete</p>
        </button>
        <button className="edit-section">
          <img src={editIcon} alt="edit" />
          <p>Edit</p>
        </button>
      </div>
    </div>
  );
}

function AddComment() {
  return (
    <div className="add-comment">
      <img src={juliusomo} alt="juliusomo" />
      <textarea placeholder="Add a comment..." />
      <button>Send</button>
    </div>
  );
}

function AddReplyComment({ replyText, setReplyText, onReplySend }) {
  function handleTextChange(e) {
    setReplyText(e.target.value);
  }
  function handleSendclick() {
    if (replyText) {
      onReplySend(replyText);
      setReplyText('');
    }
  }

  return (
    <div className="add-reply">
      <img src={juliusomo} alt="juliusomo" />
      <textarea
        placeholder="Add a reply..."
        value={replyText}
        onChange={handleTextChange}
      />
      <button onClick={handleSendclick}>Send</button>
    </div>
  );
}

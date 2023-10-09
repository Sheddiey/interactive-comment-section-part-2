import React, { useState } from "react";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import reply from "./images/icon-reply.svg";
import deleteIcon from "./images/icon-delete.svg";
import editIcon from "./images/icon-edit.svg";
import juliusomo from "./images/avatars/image-juliusomo.webp";
import { data } from "./data.js";
import { Comment } from "./Comment";
import { Reply } from "./Reply";

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

  function handleReply(parentId, replyText, commentId, serial) {
    const newReply = {
      serial: serial,
      id: new Date().getTime(),
      user: {
        username: "juliusomo",
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
      [commentId]: false,
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



export function Score({ score }) {
  return (
    <div className="score">
      <img src={plus} alt="plus" />
      <p>{score}</p>
      <img src={minus} alt="minus" />
    </div>
  );
}

export function UserName({ username, createdAt, userImage, onReply, commentId }) {
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

export function YouUsername({ username, createdAt, userImage }) {
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

export function AddComment({ replyText, setReplyText, onReplySend, commentId, onReply }) {
  function handleTextChange(e) {
    setReplyText(e.target.value);
  }
  function handleSendclick() {
    if (replyText) {
      onReplySend(replyText);
      setReplyText("");
    }
  }
  const handleReplyClick = () => {
    onReply(commentId);
  };



  return (
    <div className="add-comment">
      <img src={juliusomo} alt="juliusomo" />
      <textarea
        placeholder="Add a comment..."
        value={replyText}
        onChange={handleTextChange}
      />
      <button onClick={ handleSendclick}>Send</button>
    </div>
  );
}

export function AddReplyComment({ replyText, setReplyText, onReplySend }) {
  function handleTextChange(e) {
    setReplyText(e.target.value);
  }
  function handleSendclick() {
    if (replyText) {
      onReplySend(replyText);
      setReplyText("");
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

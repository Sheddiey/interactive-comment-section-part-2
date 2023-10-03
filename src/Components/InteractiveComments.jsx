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
  return (
    <div>
      <Comment isData={isData} />
      <Reply isData={isData} />
      <AddComment />
    </div>
  );
}

function Comment({ isData }) {
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
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CommentComponent({ score, content, username, createdAt, userImage }) {
  return (
    <div className="comment">
      <Score score={score} />
      <div className="comment-left">
        <UserName
          username={username}
          createdAt={createdAt}
          userImage={userImage}
        />{" "}
        <p>{content}</p>
      </div>
    </div>
  );
}

function Reply({ isData }) {
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
                  />
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
  username,
  createdAt,
  userImage,
  replyingTo,
  content,
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

function UserName({ username, createdAt, userImage }) {
  return (
    <div className="username">
      <div className="username-left">
        <img src={userImage} alt={username} />
        <h2>{username}</h2>
        <p>{createdAt}</p>
      </div>
      <div className="username-right">
        <img src={reply} alt="reply" />
        <p>Reply</p>
      </div>
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
        <div className="delete-section">
          <img src={deleteIcon} alt="delete" />
          <p>Delete</p>
        </div>
        <div className="edit-section">
          <img src={editIcon} alt="edit" />
          <p>Edit</p>
        </div>
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

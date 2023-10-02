import React, { useState } from "react";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import reply from "./images/icon-reply.svg";
import { data } from "./data.js";

export default function InteractiveComments() {
  return (
    <div>
      <Score />
      <Comment />
      <Reply />
    </div>
  );
}

function Comment() {
  const [isData, setIsData] = useState(data);
  return (
    <div>
      {data.map((commentData) => (
        <div key={commentData.currentUser.username}>
          {commentData.comments.map((comment) => (
            <div key={comment.id}>
              <Score score={comment.score} />
              <div>
                <UserName
                  username={comment.user.username}
                  createdAt={comment.createdAt}
                  userImage={comment.user.image.png}
                />
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
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
    <div>
      <div>
        <img src={userImage} alt={username} />
        <h2>{username}</h2>
        <p>{createdAt}</p>
      </div>
      <div>
        <img src={reply} alt="reply" />
        <p>Reply</p>
      </div>
    </div>
  );
}

function YouUsernameSection() {}

function Reply() {
  return (
    <div>
      {data.map((commentData) => (
        <div key={commentData.currentUser.username}>
          {commentData.comments.map((comment) => (
            <div key={comment.id}>
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <Score score={reply.score} />
                  <div>
                    <UserName 
                        username={reply.user.username}
                        createdAt={reply.createdAt}
                        userImage={reply.user.image.png}
                    />
                    <p><span>@{reply.replyingTo}</span> {reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AddComment() {}

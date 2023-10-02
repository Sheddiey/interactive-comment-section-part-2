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
    </div>
  );
}

function Comment() {
  const [isData, setIsData] = useState(data);
  return (
    <div>
      {data.map((commentData) => (
        <div key={commentData.comments}>
          {commentData.comments.map((comment) => (
            <div key={comment.id}>
              <Score />
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

function YouReply() {}

function Reply() {}

function AddComment() {}

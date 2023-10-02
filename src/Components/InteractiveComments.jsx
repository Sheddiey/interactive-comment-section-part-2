import React, { useState } from "react";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import reply from "./images/icon-reply.svg";
import deleteIcon from "./images/icon-delete.svg";
import editIcon from "./images/icon-edit.svg";
import juliusomo from './images/avatars/image-juliusomo.webp'
import { data } from "./data.js";

export default function InteractiveComments() {
    const [isData, setIsData] = useState(data);
  return (
    <div>
      <Comment isData={isData} />
      <Reply isData={isData}/>
      <AddComment />
    </div>
  );
}

function Comment({isData}) {
  return (
    <div>
      {isData.map((commentData) => (
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

function Reply({isData}) {
  return (
    <div>
      {isData.map((commentData) => (
        <div key={commentData.currentUser.username}>
          {commentData.comments.map((comment) => (
            <div key={comment.id}>
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <Score score={reply.score} />
                  <div>
                    <>
                      {reply.user.username !== "juliusomo" ? (
                        <UserName
                          username={reply.user.username}
                          createdAt={reply.createdAt}
                          userImage={reply.user.image.png}
                        />
                      ) : (
                        <YouUsername
                          username={reply.user.username}
                          createdAt={reply.createdAt}
                          userImage={reply.user.image.png}
                        />
                      )}
                    </>
                    <p>
                      <span>@{reply.replyingTo}</span> {reply.content}
                    </p>
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

function YouUsername({ username, createdAt, userImage }) {
  return (
    <div>
      <div>
        <img src={userImage} alt={username} />
        <h2>{username}</h2>
        <h6>you</h6>
        <p>{createdAt}</p>
      </div>
      <div>
        <div>
          <img src={deleteIcon} alt="delete" />
          <p>Delete</p>
        </div>
        <div>
          <img src={editIcon} alt="edit" />
          <p>Edit</p>
        </div>
      </div>
    </div>
  );
}

function AddComment() {
    return (
        <div>
            <img src={juliusomo} alt="juliusomo" />
            <textarea placeholder="Add a comment..." />
            <button>Send</button>
        </div>
    );
}

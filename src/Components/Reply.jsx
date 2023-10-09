import { AddReplyComment } from "./InteractiveComments";
import { Score } from "./InteractiveComments";
import { UserName } from "./InteractiveComments";
import { YouUsername } from "./InteractiveComments";

export function Reply({
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
                    <div></div>
                    {replyingToCommentId === reply.id && (
                      <div className="reply-input-field">
                        <AddReplyComment
                          replyingTo={reply.user.username}
                          replyText={replyText}
                          setReplyText={setReplyText}
                          onReplySend={(text) =>
                            onReplySend(reply.id, text, reply.id)
                          }
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
  
  export function ReplyComponent({
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
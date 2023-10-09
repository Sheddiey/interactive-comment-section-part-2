import { AddComment } from "./InteractiveComments";
import { ReplyComponent } from "./Reply";
import { Score } from "./InteractiveComments";
import { UserName } from "./InteractiveComments";

export function Comment({
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
                <div className="margin-ax">
                  {comment.replies.serial !== 1 ? (
                    <div>
                    {comment.replies.map((rp, index) => (
                      <div key={rp.id} className="margin-ax">
                        <ReplyComponent
                          score={rp.score}
                          username={rp.user.username}
                          createdAt={rp.createdAt}
                          userImage={rp.user.image.png}
                          replyingTo={rp.replyingTo}
                          content={rp.content}
                          commentId={rp.id}
                          onReply={onReply}
                          isClickedMap={isClickedMap}
                          replyingToCommentId={replyingToCommentId}
                          serial={index + 1}
                        />
                      </div>
                    ))}
                    </div>
                    ) : null}
                </div>
                {replyingToCommentId === comment.id && (
                  <div className="reply-input-field">
                    <AddComment
                      replyText={replyText}
                      setReplyText={setReplyText}
                      onReplySend={(text) =>
                        onReplySend(comment.id, text, comment.id)
                      }
                    />
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
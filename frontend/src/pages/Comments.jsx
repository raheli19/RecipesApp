import React, { useState } from "react";
import "../css/Comments.css";

function Comments({ isOpen, onClose, comments, handleDeleteComment, user, postId, setComments }) {
    //State for storing the new comment being added.
    const [newComment, setNewComment] = useState("");

  //This function is called when the user clicks the "Add Comment" button.
  const handleAddComment = () => {
    const newCommentObj = {
      postId: postId,
      id: `${Date.now()}`,
      name: user.name,
      email: user.email,
      body: newComment
    };

    //Makes a POST request to add the new comment to the server.
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentObj),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="comments-overlay">
      <div className="comments">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h3>Comments:</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>Name: {comment.name}</p>
            <p>Email: {comment.email}</p>
            <p>{comment.body}</p>
            {comment.email === user.email && (
              <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
            )}
          </div>
        ))}
        <div>
          <h3>Add Comment</h3>
          <input
            type="text"
            placeholder="New comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Comments;

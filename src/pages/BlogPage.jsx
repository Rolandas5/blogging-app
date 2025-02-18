import React, { useState } from 'react';
import { EditBlog } from './../components/EditBlog';

export const BlogPage = ({
  blogContent,
  handleBackToHomeClick,
  handleDeleteBlog,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="blog-details-buttons">
        <button onClick={handleBackToHomeClick}>Back to Home</button>
        <div className="blog-details-controls">
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDeleteBlog(blogContent.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <EditBlog
          blogContent={blogContent}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <div className="blog-details">
          <h2>{blogContent.name}</h2>
          <p>{blogContent.description}</p>
        </div>
      )}
    </>
  );
};

import axios from 'axios';
import { api } from '../constants/globalConstants';
import { useState } from 'react';
import { EditBlog } from '../components/EditBlog';

// Spaudzia Cancel -> pasako Tevui kad paslaude -> Tevas pasako ka daryt kai pagaus callback

export const BlogPage = ({ blogContent, handleBackToHomeClick }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await axios.delete(`${api}/${blogContent.id}`);
    handleBackToHomeClick();
  };

  const handleReset = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        // Priima vaika
        <EditBlog blogContent={blogContent} handleCancelClick={handleReset} />
      ) : (
        <div className="blog-page">
          <div className="blog-details-buttons">
            <button onClick={handleBackToHomeClick}>Back to Home</button>
            <div className="blog-details-controls">
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
          <div className="blog-details">
            <h2>{blogContent.name}</h2>
            <p>{blogContent.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

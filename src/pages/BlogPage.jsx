export const BlogPage = ({ blogContent, handleBackToHomeClick, handleDeleteBlog }) => {
  return (
    <>
      <div className="blog-details-buttons">
        <button onClick={handleBackToHomeClick}>Back to Home</button>
        <div className="blog-details-controls">
          <button className="edit-button">Edit</button>
          <button
            className="delete-button"
            onClick={() => handleDeleteBlog(blogContent.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="blog-details">
        <h2>{blogContent.name}</h2>
        <p>{blogContent.description}</p>
      </div>
    </>
  );
};

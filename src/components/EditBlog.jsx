import { useState } from 'react';

export const EditBlog = ({ blogContent, handleSaveEdit, handleCancelEdit }) => {
  const [title, setTitle] = useState(blogContent.name);
  const [description, setDescription] = useState(blogContent.description);

  const handleSave = () => {
    const updatedBlog = {
      ...blogContent,
      name: title,
      description: description,
    };
    handleSaveEdit(updatedBlog); // Išsaugome pakeitimus
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => handleCancelEdit(blogContent)}>Cancel</button>
    </div>
  );
};

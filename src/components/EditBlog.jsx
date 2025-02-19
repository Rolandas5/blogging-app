import { useState } from 'react';
import axios from 'axios';
import { api } from '../constants/globalConstants';

// blogContent = { id: 1, name: "asada", description: "asdas"}

export const EditBlog = ({ handleCancelClick, blogContent }) => {
  const [name, setName] = useState(blogContent.name);
  const [description, setDescription] = useState(blogContent.description);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.put(`${api}/${blogContent.id}`, {
      name,
      description,
    });

    window.location.reload();
  };

  return (
    <form className="edit-post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Blog name"
        value={name}
        required
        onChange={(event) => setName(event.target.value)}
      />
      <textarea
        placeholder="Blog description"
        value={description}
        required
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleCancelClick}>
        Cancel
      </button>
    </form>
  );
};

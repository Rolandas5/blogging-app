import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../constants/globalConstants';

export const CreateBlog = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(api, {
      name,
      description,
    });

    window.location.reload();
  };

  useEffect(() => {
    console.log('CreateBlog komponentas yra sukurtas!');
  }, []);

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Blog name"
        required
        onChange={(event) => setName(event.target.value)}
      />
      <textarea
        placeholder="Blog description"
        required
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <button type="submit">Create post</button>
    </form>
  );
};

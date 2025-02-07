// import { useState } from 'react';
// import axios from 'axios';
// import { api } from '../constants/globalConstants';

// export const CreateBlog = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     await axios.post(api, {
//       name,
//       description,
//     });

//     window.location.reload();
//   };

//   return (
//     <form className="create-post-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Blog name"
//         required
//         onChange={(event) => setName(event.target.value)}
//       />
//       <textarea
//         placeholder="Blog description"
//         required
//         onChange={(event) => setDescription(event.target.value)}
//       ></textarea>
//       <button type="submit">Create post</button>
//     </form>
//   );
// };

import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../constants/globalConstants';

export const CreateBlog = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  // Gauti visus blogo įrašus
  const fetchPosts = async () => {
    try {
      const response = await axios.get(api);
      setPosts(response.data);
    } catch (error) {
      console.error('Klaida gaunant įrašus:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Pridėti arba atnaujinti įrašą
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingPostId) {
      await axios.put(`${api}/${editingPostId}`, { name, description });
      setEditingPostId(null);
    } else {
      await axios.post(api, { name, description });
    }

    setName('');
    setDescription('');
    fetchPosts();
  };

  // Redaguoti įrašą
  const handleEdit = (post) => {
    setName(post.name);
    setDescription(post.description);
    setEditingPostId(post.id);
  };

  // Ištrinti įrašą
  const handleDelete = async (id) => {
    await axios.delete(`${api}/${id}`);
    fetchPosts();
  };

  return (
    <div>
      <form className="create-post-form" onSubmit={handleSubmit}>
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
        <button type="submit">
          {editingPostId ? 'Update post' : 'Create post'}
        </button>
      </form>

      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.name}</strong>
            <p>{post.description}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

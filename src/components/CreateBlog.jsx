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
    fetchPosts(); // Kai komponentas įsikrauna, užkrauname įrašus
  }, []);

  // Pridėti arba atnaujinti įrašą
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { name, description };

    if (editingPostId) {
      // Atnaujiname įrašą
      await axios.put(`${api}/${editingPostId}`, payload);
    } else {
      // Sukuriame naują įrašą
      await axios.post(api, payload);
    }

    // Po įrašymo arba atnaujinimo, užkrauname įrašus ir perkrauname puslapį
    fetchPosts();
    window.location.reload();

    setName('');
    setDescription('');
    setEditingPostId(null); // Pašaliname redagavimo būseną
  };

  // Redaguoti įrašą
  const handleEdit = (post) => {
    setName(post.name);
    setDescription(post.description);
    setEditingPostId(post.id);
  };

  // Ištrinti įrašą
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      // Po ištrynimo užkrauname įrašus ir perkrauname puslapį
      fetchPosts();
      window.location.reload();
    } catch (error) {
      console.error('Klaida trinant įrašą:', error);
    }
  };

  return (
    <div>
      <h2>{editingPostId ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
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
            <button className="button-edit" onClick={() => handleEdit(post)}>
              Edit
            </button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

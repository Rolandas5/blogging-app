import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from './pages/Home';
import { api } from './constants/globalConstants';
import { BlogPage } from './pages/BlogPage';
import { EditBlog } from './components/EditBlog';

export const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Pridėtas isEditing state

  const fetchBlogs = async () => {
    const response = await axios.get(api);
    setBlogs(response.data);
  };

  const handleBlogClick = (value) => {
    setSelectedBlog(value);
  };

  const resetSelectedBlog = () => {
    setSelectedBlog(null);
    setIsEditing(false); // Grąžiname isEditing į false
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      resetSelectedBlog();
    } catch (error) {
      console.error('Klaida trinant įrašą:', error);
    }
  };

  const handleEditBlog = () => {
    console.log('Edit blog clicked');
    setIsEditing(true); // Įjungiam redagavimo režimą
  };

  const handleCancelEdit = (updatedBlog) => {
    console.log('Cancel edit clicked');
    setIsEditing(false);
    setSelectedBlog(updatedBlog); // Atnaujina blogContent su redaguotais duomenimis
  };

  // Atnaujiname serverio duomenis
  const handleSaveEdit = async (updatedBlog) => {
    try {
      // Atlikti PUT užklausą, kad atnaujinti blogą serverio pusėje
      await axios.put(`${api}/${updatedBlog.id}`, updatedBlog);

      // Atnaujiname React būsenoje
      setSelectedBlog(updatedBlog);

      // Užbaigiame redagavimą
      setIsEditing(false);
    } catch (error) {
      console.error('Klaida išsaugant blogą:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app">
      {selectedBlog ? (
        isEditing ? (
          <EditBlog
            blogContent={selectedBlog}
            setSelectedBlog={setSelectedBlog}
            handleCancelEdit={handleCancelEdit}
          />
        ) : (
          <BlogPage
            blogContent={selectedBlog}
            handleBackToHomeClick={resetSelectedBlog}
            handleDeleteBlog={deleteBlog}
            handleEditBlog={handleEditBlog}
          />
        )
      ) : (
        <Home blogs={blogs} onBlogClick={handleBlogClick} />
      )}
    </div>
  );
};

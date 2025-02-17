import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from './pages/Home';
import { api } from './constants/globalConstants';
import { BlogPage } from './pages/BlogPage';

export const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    const response = await axios.get(api);
    setBlogs(response.data);
  };

  const handleBlogClick = (value) => {
    setSelectedBlog(value);
  };

  const resetSelectedBlog = () => {
    setSelectedBlog(null);
  };

  // Funkcija blog'ui ištrinti
  const deleteBlog = async (id) => {
    try {
      // DELETE užklausa
      await axios.delete(`${api}/${id}`);

      // Atnaujinam state – pašalinam ištrintą blog'ą iš sąrašo
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

      // Grįžtam į pagrindinį puslapį, jei vartotojas buvo BlogPage
      resetSelectedBlog();
    } catch (error) {
      console.error('Klaida trinant įrašą:', error);
    }
  };

  // useEffect - naudojamas norint atlikti veiksmus, kai komponentas yra sugeneruojamas
  // [] - tuscias masyvas reiskias, kad veiksmai esantys useEffect viduje, but atliekami tik viena karta
  // [kintamasis] - jeigu kintamasis pasikeicias, tai useEffect bus iskvieciamas dar karta
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app">
      {/* Jeigu pasirinktas blogas, atvaizduoja BlogPage.jsx */}
      {selectedBlog ? (
        <BlogPage
          blogContent={selectedBlog}
          handleBackToHomeClick={resetSelectedBlog}
          handleDeleteBlog={deleteBlog}
        />
      ) : (
        // Jei nepasirinkus, atvaizduoja bendrini Home page
        <Home blogs={blogs} onBlogClick={handleBlogClick} />
      )}
    </div>
  );
};

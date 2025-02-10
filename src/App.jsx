import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from './pages/Home';
import { api } from './constants/globalConstants';

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

  // useEffect - naudojamas norint atlikti veiksmus, kai komponentas yra sugeneruojamas
  // [] - tuscias masyvas reiskias, kad veiksmai esantys useEffect viduje, bet atliekami tik viena karta
  // [kintamasis] - jeigu kintamasis pasikeicia, tai useEffect bus iskvieciamas dar karta
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app">
      {selectedBlog ? (
        <din>Sveiki as divas</din>
      ) : (
        <Home blogs={blogs} onBlogClick={handleBlogClick} />
      )}
    </div>
  );
};

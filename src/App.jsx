import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from './pages/Home';
import { api } from './constants/globalConstants';

export const App = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get(api);
    setBlogs(response.data);
  };

  // useEffect - naudojamas norint atlikti veiksmus, kai komponentas yra sugeneruojamas
  // [] - tuscias masyvas reiskias, kad veiksmai esantys useEffect viduje, bet atliekami tik viena karta
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app">
      <Home blogs={blogs} />
    </div>
  );
};

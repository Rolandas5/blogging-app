import { useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import { CreateBlog } from '../components/CreateBlog';
import { SearchContainer } from '../components/SearchContainer';

export const Home = ({ blogs, onBlogClick }) => {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogs = blogs.filter((blog) => {
    return blog.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="home">
      <h1>Blog posts</h1>
      {/* Keiciam isCreateFormVisible konstantos reiksme */}
      <button onClick={() => setIsCreateFormVisible(!isCreateFormVisible)}>
        {isCreateFormVisible ? 'Close Form' : 'Create New Blog'}
      </button>

      {isCreateFormVisible ? (
        // Jeigu isCreateFormVisible yra true
        <CreateBlog />
      ) : (
        <>
          <SearchContainer onSearch={handleSearch} />
          <div className="posts-container">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => {
                return (
                  <BlogCard key={index} blog={blog} onBlogClick={onBlogClick} />
                );
              })
            ) : (
              <p>No blogs found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

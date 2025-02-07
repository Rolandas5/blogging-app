import { useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import { CreateBlog } from '../components/CreateBlog';

export const Home = ({ blogs }) => {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  return (
    <div className="home">
      <h1>Blog posts</h1>
      <button onClick={() => setIsCreateFormVisible(!isCreateFormVisible)}>
        {isCreateFormVisible ? 'Close Form' : 'Create New Blog'}
      </button>
      {isCreateFormVisible ? (
        <CreateBlog />
      ) : (
        <div className="posts-container">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => {
              return <BlogCard key={index} blog={blog} />;
            })
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

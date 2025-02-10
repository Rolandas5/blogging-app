export const BlogCard = ({ blog, onBlogClick }) => {
  return (
    <div className="blog-card" onClick={() => onBlogClick(blog)}>
      <h2>{blog.name}</h2>
      <p>{blog.description}</p>
    </div>
  );
};

export const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <h2>{blog.name}</h2>
      <p>{blog.description}</p>
    </div>
  );
};

import React from 'react';
import './Blog.css';

const Blog = () => {
  const posts = [
    {
      title: 'How to Download YouTube Videos in 2025',
      excerpt: 'Complete guide to downloading YouTube videos safely and legally.',
      date: '2025-01-15'
    },
    {
      title: 'Best TikTok Downloader 2025',
      excerpt: 'Learn how to download TikTok videos without watermarks.',
      date: '2025-01-10'
    },
  ];

  return (
    <div className="blog">
      <div className="container">
        <h1>Blog</h1>
        <div className="blog-posts">
          {posts.map((post, index) => (
            <article key={index} className="blog-post">
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="post-date">{post.date}</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

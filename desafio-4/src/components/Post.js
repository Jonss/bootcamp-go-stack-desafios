import React from 'react';
import Comment from './Comment';

import './Post.css'

const Post = ({ post }) => (
  <li key={post.id} className="post-container">
    <div>
      <p>{post.date}</p>
      <p>{post.content}</p>
      <img src={post.author.avatar} alt=""/>
      <ul>
        { post.comments.map(comment => <Comment comment={comment} key={comment.id} />)}
      </ul>
    </div>
  </li>
);
  

export default Post;
import React from 'react';
import Comment from './Comment';

const Post = ({ post }) => (
  <li key={post.id}>
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
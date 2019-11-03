import React from 'react';

const Comment = ({ comment }) => (
  <li key={comment.id} >
    <img src={comment.author.avatar} alt=""/>
    <p>{comment.content}</p>
  </li>
);


export default Comment;
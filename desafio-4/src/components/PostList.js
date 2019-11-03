import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {

  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "https://api.adorable.io/avatars/285/abott"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://api.adorable.io/avatars/285/abott@adorable.png"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
    ]
  };
  
  render() {
    return (
      <ul>
        { this.state.posts.map(post => <Post post={post} key={post.id}/>)}
      </ul>
    );
  }
};

export default PostList;

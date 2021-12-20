import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind( this );
  }

  getPosts() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then((res) =>{
      this.setState({posts: res.data})
      console.log(res.data);
    })
  }
  
  componentDidMount() {
    this.getPosts()
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then((res) => {
      this.setState({posts: res.data})
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then((res)=> {
      this.setState({posts: res.data})
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then((res)=> {
      this.setState({posts:res.data})
    })
  }

  searchPost(text, posts) {
    console.log(text);
    let newPostsArr = posts.filter(post => post.text.includes(text));
    console.log(newPostsArr);
    this.setState({posts: newPostsArr})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost} posts={posts} getPosts={this.getPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
          posts.map(post=>(
            <Post key={post.id} 
            id={post.id} 
            text={post.text} 
            date={post.date} 
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}
            />
          )
          )}
        </section>
      </div>
    );
  }
}

export default App;

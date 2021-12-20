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
    this.getAllPosts = this.getAllPosts.bind( this );
  }

  getAllPosts(){
    axios.get('https://practiceapi.devmountain.com/api/posts').then((res) =>{
      this.setState({posts: res.data})
    })
  }
  
  componentDidMount() {
    this.getAllPosts()
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

  searchPost(text) {
    console.log(text);
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`).then((res)=> {
      this.setState({posts:res.data})
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost} getAllPosts={this.getAllPosts}/>

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

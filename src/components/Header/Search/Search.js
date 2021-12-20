import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };
  }

  onChange = e => {
    
      this.setState({ text: e.target.value}, () => {
        if(this.state.text !== ""){
          this.props.searchPostFn(this.state.text)
        }else{
          this.props.getAllPosts()
        }
      })
    
  }

  

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={this.onChange}/>

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}
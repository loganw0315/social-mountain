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

  updateText( text ) {
    this.setState({ text });
  }

  

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={( e ) => this.updateText( e.target.value )}/>

          <SearchIcon id="Search__icon" onClick={() => this.props.searchPostFn(this.state.text, this.props.posts)}/>
        </div>
        
      </section>
    )
  }
}
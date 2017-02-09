import React, { Component } from 'react';

export default class NewPost extends Component {

  render() {
    return (
      <div className="row">
        <textarea className="u-full-width" placeholder="I cast magic missile into the darkness!"></textarea>
        <input className="button-primary" type="submit" value="Submit" />
      </div>
    )
  }

}

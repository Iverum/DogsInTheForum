import React, { Component } from 'react';
import './index.css';
import Hand from './hand'

export default class Dice extends Component {

  render() {
    return (
      <div className="twelve columns">
        <Hand
          dice={[
            { type: 'd6', value: 5 },
            { type: 'd6', value: 3 },
            { type: 'd6', value: 2 },
            { type: 'd6', value: 4 },
            { type: 'd6', value: 5 },
            { type: 'd6', value: 3 },
            { type: 'd6', value: 2 },
            { type: 'd6', value: 4 },
            { type: 'd6', value: 1 }
          ]}
        />
      </div>
    )
  }

}

import React, { Component } from 'react'
import BasicInfo from './basic'
import Stats from './stats'
import Traits from './traits'
import Relationships from './relationships'
import Belongings from './belongings'

export default class CharacterDetails extends Component {

  render() {
    return (
      <form className='twelve columns'>
        <BasicInfo />
        <hr />
        <div className='row'>
          <Stats />
          <Traits />
        </div>
        <hr />
        <Relationships />
        <hr />
        <Belongings />
        <hr />
        <input className='button-primary' type='submit' value='Update Character' />
      </form>
    )
  }

}

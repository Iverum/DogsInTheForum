import React, { Component } from 'react'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import { connect } from 'react-redux'
import firebase from 'firebase'
import uuid from 'uuid/v4'
import _ from 'lodash'
import CharacterRow from './row'
import * as characterActions from './dux'

export class Character extends Component {
  constructor(props) {
    super(props)
    this.createCharacter = this.createCharacter.bind(this)
    this.updateCharactersFromDatabase = this.updateCharactersFromDatabase.bind(this)
  }

  componentWillMount() {
    const auth = firebase.auth()
    const database = firebase.database()
    auth.getRedirectResult()
      .then(() => {
        const id = auth.currentUser.uid
        this.characterRef = database.ref(`character/${id}`)
        this.characterRef.off()
        this.characterRef.on('child_added', this.updateCharactersFromDatabase)
        this.characterRef.on('child_changed', this.updateCharactersFromDatabase)
      })
  }

  componentWillUnmount() {
    this.characterRef.off()
    this.characterRef = null
  }

  updateCharactersFromDatabase(data) {
    const character = data.val()
    this.props.dispatch(characterActions.addCharacter(character))
  }

  createCharacter(name) {
    const newCharacter = {
      uuid: uuid(),
      name: 'New Character',
      stats: {
        'Acuity': { number: 2, size: 'd6' },
        'Body': { number: 2, size: 'd6' },
        'Heart': { number: 2, size: 'd6' },
        'Will': { number: 2, size: 'd6' }
      }
    }
    this.characterRef.child(`${newCharacter.uuid}`).set(newCharacter)
  }

  render() {
    return (
      <div className='twelve columns'>
        <header className='row'>
          <h1 className="nine columns">Characters</h1>
          <input
            onClick={this.createCharacter}
            className="button-primary three columns"
            type="button"
            value="Create New Character"
          />
        </header>
        <div className='row'>
          <ListView
            initData={this.props.characters}
            perPage={5}
          >
            <ListRows><CharacterRow /></ListRows>
            <Pagination className='pagination' />
          </ListView>
        </div>
      </div>
    )
  }

}

export default connect(state => ({
  characters: _.values(state.characters)
}))(Character)

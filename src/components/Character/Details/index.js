import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import './index.css'
import BasicInfo from './basic'
import Stats from './stats'
import Traits from './traits'
import Relationships from './relationships'
import Belongings from './belongings'
import * as characterActions from '../dux'

const emptyCharacter = {
  name: '',
  description: '',
  background: 'Well-Rounded',
  stats: {
    Acuity: { size: 'd6', number: 2 },
    Body: { size: 'd6', number: 2 },
    Heart: { size: 'd6', number: 2 },
    Will: { size: 'd6', number: 2 }
  },
  traits: [],
  relationships: [],
  belongings: []
}

const backgrounds = {
  'Well-Rounded': {
    'stats': { size: 'd6', number: 17 },
    'traits': [
      { size: 'd4', number: 1 },
      { size: 'd6', number: 4 },
      { size: 'd8', number: 2 }
    ],
    'relationships': [
      { size: 'd6', number: 4 },
      { size: 'd8', number: 2 }
    ]
  },
  'Strong History': {
    'stats': { size: 'd6', number: 13 },
    'traits': [
      { size: 'd6', number: 3 },
      { size: 'd8', number: 4 },
      { size: 'd10', number: 3 }
    ],
    'relationships': [
      { size: 'd4', number: 1 },
      { size: 'd6', number: 3 },
      { size: 'd8', number: 2 }
    ]
  },
  'Complicated History': {
    'stats': { size: 'd6', number: 15 },
    'traits': [
      { size: 'd4', number: 4 },
      { size: 'd6', number: 2 },
      { size: 'd10', number: 2 }
    ],
    'relationships': [
      { size: 'd6', number: 5 },
      { size: 'd8', number: 2 }
    ]
  },
  'Strong Community': {
    'stats': { size: 'd6', number: 13 },
    'traits': [
      { size: 'd4', number: 1 },
      { size: 'd6', number: 3 },
      { size: 'd8', number: 2 }
    ],
    'relationships': [
      { size: 'd6', number: 4 },
      { size: 'd8', number: 4 },
      { size: 'd10', number: 3 }
    ]
  },
  'Complicated Community': {
    'stats': { size: 'd6', number: 15 },
    'traits': [
      { size: 'd6', number: 6 },
      { size: 'd8', number: 2 }
    ],
    'relationships': [
      { size: 'd4', number: 4 },
      { size: 'd6', number: 2 },
      { size: 'd8', number: 2 },
      { size: 'd10', number: 2 }
    ]
  }
}

export class CharacterDetails extends Component {
  constructor(props) {
    super(props)
    this.updateCharacterFromDatabase = this.updateCharacterFromDatabase.bind(this)
    this.changeProperty = this.changeProperty.bind(this)
    this.state = { character: emptyCharacter }
  }

  componentWillMount() {
    const auth = firebase.auth()
    const database = firebase.database()
    auth.getRedirectResult()
      .then(() => {
        const id = auth.currentUser.uid
        this.characterRef = database.ref(`characters/${id}/${this.props.params.uuid}`)
        this.characterRef.off()
        this.characterRef.on('value', this.updateCharacterFromDatabase)
      })
  }

  componentWillUnmount() {
    this.characterRef.off()
    this.characterRef = null
  }

  updateCharacterFromDatabase(data) {
    const character = {
      ...emptyCharacter,
      ...data.val()
    }
    this.props.dispatch(characterActions.addCharacter(character))
    this.setState({ character })
  }

  changeProperty(property, value) {
    const newCharacter = {
      ...this.state.character,
      [property]: value
    }
    this.setState({
      character: newCharacter
    })
  }

  saveCharacter() {
    this.characterRef.set(this.state.character)
  }

  render() {
    const { background: characterBackground } = this.state.character
    return (
      <form className='twelve columns'>
        <BasicInfo
          {...this.state}
          onChange={this.changeProperty}
          backgrounds={backgrounds}
        />
        <hr />
        <div className='row'>
          <Stats
            {...this.state.character.stats}
            backgroundStats={backgrounds[characterBackground].stats}
            onChange={this.changeProperty}
          />
          <Traits
            attributes={this.state.character.traits}
            attributeDice={backgrounds[characterBackground].traits}
            onChange={this.changeProperty}
          />
        </div>
        <hr />
        <Relationships
          attributes={this.state.character.relationships}
          attributeDice={backgrounds[characterBackground].relationships}
          onChange={this.changeProperty}
        />
        <hr />
        <Belongings
          noDiceLimits
          attributes={this.state.character.belongings}
          onChange={this.changeProperty}
        />
        <hr />
        <input
          className='button-primary'
          type='submit'
          value='Update Character'
          onClick={this.saveCharacter.bind(this)}
        />
      </form>
    )
  }

}

export default connect()(CharacterDetails)

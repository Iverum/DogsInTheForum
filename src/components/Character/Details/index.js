import React, { Component } from 'react'
import firebase from 'firebase'
import BasicInfo from './basic'
import Stats from './stats'
import Traits from './traits'
import Relationships from './relationships'
import Belongings from './belongings'

const emptyCharacter = {
  name: '',
  description: '',
  background: ''
}

export default class CharacterDetails extends Component {
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
        this.characterRef = database.ref(`character/${id}/${this.props.params.uuid}`)
        this.characterRef.off()
        this.characterRef.on('value', this.updateCharacterFromDatabase)
      })
  }

  updateCharacterFromDatabase(data) {
    const character = {
      ...emptyCharacter,
      ...data.val()
    }
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

  render() {
    console.log(this.state.character)
    return (
      <form className='twelve columns'>
        <BasicInfo {...this.state} onChange={this.changeProperty}  />
        <hr />
        <div className='row'>
          <Stats {...this.state} />
          <Traits {...this.state} />
        </div>
        <hr />
        <Relationships {...this.state} />
        <hr />
        <Belongings {...this.state} />
        <hr />
        <input className='button-primary' type='submit' value='Update Character' />
      </form>
    )
  }

}

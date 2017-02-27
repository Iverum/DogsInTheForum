import _ from 'lodash'
import firebase from 'firebase'
import store from '../../../store'

const characterCommandRegexes = [
  /(acuity|body|heart|will)/i
]

const characterCommands = {
  [characterCommandRegexes[0]]: getCharacterStat
}

const commandRegexes = [
  /roll (\d*)(d\d+)/,
  /!(.+)/
]

function getCharacterStat(character, command) {
  const statName = characterCommandRegexes[0].exec(command)[1]
  return [character.stats[_.upperFirst(statName)]]
}

function internalRollDice(number, size) {
  const sides = parseInt(size.substring(1), 10)
  const rolledDice = []
  for (let i = 0; i < number; i++) {
    rolledDice.push({
      type: size,
      value: (1 + Math.floor(Math.random() * sides))
    })
  }
  return rolledDice
}

function rollDice(command) {
  const regex = commandRegexes[0]
  const match = regex.exec(command)
  const number = (match[1] || 1)
  const size = match[2]
  return internalRollDice(number, size)
}

function executeCharacterCommand(command, character) {
  let dice = []
  characterCommandRegexes.forEach(regex => {
    if (regex.test(command)) {
      const newDice = characterCommands[regex](character, command)
      newDice.forEach(newDie => {
        const rolled = internalRollDice(newDie.number, newDie.size)
        dice = [
          ...dice,
          ...rolled
        ]
      })
    }
  })
  return dice
}

const commands = {
  [commandRegexes[0]]: rollDice,
  [commandRegexes[1]]: executeCharacterCommand
}

export default function handleCommands(text, thread, character) {
  const playerCharacter = store.getState().characters.player[character]
  return firebase.database().ref(`hands/${character}/${thread}`).once('value')
    .then(data => {
      const bindingRegex = /\[\[(.+)\]\]/g
      let dice = {
        rolledDice: [],
        hand: data.val() || []
      }
      let possibleCommandMatch = bindingRegex.exec(text)
      while (possibleCommandMatch !== null) {
        // eslint-disable-next-line no-loop-func
        commandRegexes.forEach(regex => {
          if (regex.test(possibleCommandMatch[1])) {
            const newDice = commands[regex](possibleCommandMatch[1], playerCharacter)
            if (regex === commandRegexes[0]) {
              dice.rolledDice = [
                ...dice.rolledDice,
                ...newDice
              ]
            } else if (regex === commandRegexes[1]) {
              dice.hand = [
                ...dice.hand,
                ...newDice
              ]
            }
          }
        })
        possibleCommandMatch = bindingRegex.exec(text)
      }
      const newText = text.replace(bindingRegex, '').trim()
      return { dice, character, text: newText }
    })
}

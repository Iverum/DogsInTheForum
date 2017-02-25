import _ from 'lodash'
import store from '../../../store'

const characterCommandRegexes = [
  /(acuity|body|heart|will)/i
]

const characterCommands = {
  [characterCommandRegexes[0]]: getCharacterStat
}

const commandRegexes = [
  /roll (\d*)(d\d+)/,
  /(.+)!(.+)/
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

function findCharacter(command) {
  const { characters } = store.getState()
  const name = commandRegexes[1].exec(command)[1]
  return _.find(characters, character => character.name === name)
}

function executeCharacterCommand(command) {
  let dice = []
  const character = findCharacter(command)
  characterCommandRegexes.forEach(regex => {
    if (regex.test(command)) {
      const newDice = characterCommands[regex](character, command)
      console.log(newDice)
      newDice.forEach(newDie => {
        const rolled = internalRollDice(newDie.number, newDie.size)
        console.log(rolled)
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

export default function handleCommands(text) {
  const bindingRegex = /\[\[(.+)\]\]/g
  let dice = []
  let possibleCommandMatch = bindingRegex.exec(text)
  while (possibleCommandMatch !== null) {
    // eslint-disable-next-line no-loop-func
    commandRegexes.forEach(regex => {
      if (regex.test(possibleCommandMatch[1])) {
        const newDice = commands[regex](possibleCommandMatch[1])
        dice = [
          ...dice,
          ...newDice
        ]
      }
    })
    possibleCommandMatch = bindingRegex.exec(text)
  }
  const newText = text.replace(bindingRegex, '').trim()
  return { dice, text: newText }
}

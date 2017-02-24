const commandRegexes = [
  /roll (\d*)(d\d+)/,
  /(.+)!(.+)/
]

function rollDice(command) {
  const regex = commandRegexes[0]
  const match = regex.exec(command)
  const number = (match[1] || 1)
  const size = match[2]
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

const commands = {
  [commandRegexes[0]]: rollDice,
  [commandRegexes[1]]: () => { console.log('Character function!') }
}

export default function handleCommands(text) {
  const bindingRegex = /\[\[(.+)\]\]/g
  let dice = []
  let possibleCommandMatch = bindingRegex.exec(text)
  while (possibleCommandMatch !== null) {
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

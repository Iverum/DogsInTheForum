import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NewPost, { parseText, rollDice } from '../new_post'

test('new post is rendered', () => {
  const component = renderer.create(
    <NewPost />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('expects to parse unadorned text', () => {
  const textToParse = "Hello, this is a normal post"
  const parsedText = parseText(textToParse)
  const expected = {
    dice: [],
    text: textToParse
  }
  expect(parsedText).toEqual(expected)
})

it('expects to parse text with dice roll', () => {
  const textToParse = "This post rolls dice. [[roll d20]]"
  const parsedText = parseText(textToParse)
  const expected = {
    dice: [{ number: 1, size: "d20" }],
    text: "This post rolls dice."
  }
  expect(parsedText).toEqual(expected)
})

it('expects dice to be rolled', () => {
  const dice = [
    { number: 1, size: "d20" },
    { number: 1, size: "d6" }
  ]
  const rolledDice = rollDice({ dice })
  expect(rolledDice[0].value).toBeGreaterThanOrEqual(1)
  expect(rolledDice[0].value).toBeLessThanOrEqual(20)
  expect(rolledDice[0].type).toEqual('d20')
  expect(rolledDice[1].value).toBeGreaterThanOrEqual(1)
  expect(rolledDice[1].value).toBeLessThanOrEqual(6)
  expect(rolledDice[1].type).toEqual('d6')
})

it('expects a post with dice to generate rolled dice', () => {
  const textToParse = "This post rolls dice. [[roll d20]]"
  const parsedText = parseText(textToParse)
  parsedText.dice = rollDice(parsedText)
  expect(parsedText.text).toEqual("This post rolls dice.")
  expect(parsedText.dice[0].type).toEqual("d20")
  expect(parsedText.dice[0].value).toBeGreaterThanOrEqual(1)
  expect(parsedText.dice[0].value).toBeLessThanOrEqual(20)
})

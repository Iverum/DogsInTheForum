import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NewPost from '../new_post'
import handleCommands from '../new_post/commands'

test('new post is rendered', () => {
  const component = renderer.create(
    <NewPost
      user={{ name: 'Test User' }}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('expects to parse unadorned text and create a post', () => {
  const textToParse = "Hello, this is a normal post"
  const parsedText = handleCommands(textToParse)
  const expected = {
    dice: [],
    text: textToParse
  }
  expect(parsedText).toEqual(expected)
})

it('expects a post with dice to generate rolled dice', () => {
  const textToParse = "This post rolls dice. [[roll d20]]"
  const parsedText = handleCommands(textToParse)
  expect(parsedText.text).toEqual("This post rolls dice.")
  expect(parsedText.dice[0].type).toEqual('d20')
  expect(parsedText.dice[0].value).toBeGreaterThanOrEqual(1)
  expect(parsedText.dice[0].value).toBeLessThanOrEqual(20)
})

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Board from '../index'

test('board is rendered correctly', () => {
  const component = renderer.create(
    <Board />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

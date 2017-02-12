import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NewThread from '../new_thread'

test('NewThread is rendered correctly', () => {
  const component = renderer.create(
    <NewThread />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Thread } from '../index'

test('thread is rendered correctly', () => {
  const component = renderer.create(
    <Thread
      thread={[
        { username: 'Anonymous', text: 'Lorem Ipsum' },
        { username: 'Nonymous', text: 'Dolor set amet' }
      ]}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

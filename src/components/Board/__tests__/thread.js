import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Thread from '../thread'

test('thread is rendered correctly', () => {
  const component = renderer.create(
    <Thread
      data={{
        name: 'Test Thread',
        postCount: 0
      }}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

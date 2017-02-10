import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NewPost from './new_post'

test('new post is rendered', () => {
  const component = renderer.create(
    <NewPost />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

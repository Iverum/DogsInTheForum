import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Menu } from '../index'

test('menu is rendered correctly', () => {
  const component = renderer.create(
    <Menu user={{ name: 'Test User' }} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

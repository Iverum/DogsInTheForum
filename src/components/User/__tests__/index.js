import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { User } from '../index'

jest.mock('firebase')
jest.mock('../../Character')

test('user detail is rendered correctly', () => {
  const component = renderer.create(
    <User user={{ name: 'Test User' }}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

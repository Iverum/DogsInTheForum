import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Base from '../index'

jest.mock('../../Menu')

test('base is rendered correctly', () => {
  const component = renderer.create(
    <Base />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

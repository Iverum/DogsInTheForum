import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Character } from '../index'

jest.mock('firebase', () => {
  return {
    auth: () => {
      return {
        currentUser: { uid: 'testUser' },
        getRedirectResult: () => { return Promise.resolve(true) }
      }
    },
    database: () => {
      return {
        ref: () => {
          return {
            off: () => {},
            on: () => {}
          }
        }
      }
    }
  }
})

test('character is rendered correctly', () => {
  const component = renderer.create(
    <Character
      characters={[
        { name: 'Test Character' },
        { name: 'Test Character 2' }
      ]}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Character from '../index'

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

test('character details are rendered correctly', () => {
  const component = renderer.create(
    <Character params={{ uuid: 'test' }} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

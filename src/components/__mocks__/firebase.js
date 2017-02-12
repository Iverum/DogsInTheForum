const firebase = jest.genMockFromModule('firebase')

firebase.database = () => {
  return {
    ref: () => {
      return {
        off: () => {},
        on: () => {}
      }
    }
  }
}

export default firebase

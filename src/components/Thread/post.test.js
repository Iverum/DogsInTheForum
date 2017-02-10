import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Post from './post';

test('post is rendered with username and text', () => {
  const component = renderer.create(
    <Post username="Anonymous" text="Lorem ipsum" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Post username="Anonymous" text="Lorem ipsum" />, div);
});

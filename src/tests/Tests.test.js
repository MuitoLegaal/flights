import { render, cleanup, fireEvent, getByTestId, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import PagiNation from '../components/Pagination';
import Checkbox from '../components/Checkbox';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
});

it('should be Tarmac Technologies', () => {
  const {getByTestId} = render(<App/>);
  expect(getByTestId('title')).toHaveTextContent('Tarmac Technologies')
});

test('Filter that checkbox landed is checked at initialization', () => {
  const {getByTestId} = render(<App><Checkbox/></App>);
  expect(getByTestId('checkbox')).toBeChecked();
});



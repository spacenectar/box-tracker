/* global it expect */
import { ChangeEvent } from 'react';
import filterItemsByInput from './filter-items-by-input';

const event1 = {
  target: {
    value: 'test-2'
  }
} as ChangeEvent<HTMLInputElement>;

const event2 = {
  target: {
    value: 'test-'
  }
} as ChangeEvent<HTMLInputElement>;

const objArrayMock = [
  {
    id: 1,
    name: 'test-1'
  },
  {
    id: 2,
    name: 'test-2'
  }
];

it('Returns an array with a single object (test-2) from objArrayMock', () => {
  expect(filterItemsByInput(event1, 'name', objArrayMock)).toEqual([
    objArrayMock[1]
  ]);
});

it('Returns an array with both objects in objArrayMock', () => {
  expect(filterItemsByInput(event2, 'name', objArrayMock)).toEqual(
    objArrayMock
  );
});

import { render, screen } from '@testing-library/react';

import Homepage from './HomePage';

test('renders Welcome to MyBatch', () => {
  render(<Homepage />);
  const text = screen.getByText(/Welcome to MyBatch Home Page/i);
  expect(text).toBeInTheDocument();
});
test('renders 2 headings', () => {
  render(<Homepage />);
  const headings = screen.getAllByRole('heading');
  expect(headings).toHaveLength(2);
});
test('renders 3 paragraphs', () => {
  render(<Homepage />);
  const paragraphs = screen.getAllByTestId('custom-element');
  expect(paragraphs).toHaveLength(3);
});
test('renders title', () => {
  render(<Homepage />);
  const title = screen.getByTitle('intro');
  expect(title.textContent).toBe('Welcome to MyBatch Home Page');
});

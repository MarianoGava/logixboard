import { render, screen } from '@testing-library/react';
import LogixboardPoc from './LogixboardPoc';

test('renders learn react link', () => {
  render(<LogixboardPoc />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

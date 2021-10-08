import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('renders navbar movie mania text', () => {
    render(<NavBar />);
    const logoElement = screen.getByText(/movie mania/i);
    expect(logoElement).toBeInTheDocument();
  });

  it('renders hi if user signed in', () => {
    render(<NavBar />);
    const hiElement = screen.getByText(/Login/);
    expect(hiElement).toBeInTheDocument();
  });
})
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

describe('Dashboard', () => {
  it('renders the Dashboard page', () => {
    render(<Dashboard />);
    // Check for a heading or text unique to Dashboard
    expect(screen.getByText(/dashboard/i)).toBeTruthy();
  });
});

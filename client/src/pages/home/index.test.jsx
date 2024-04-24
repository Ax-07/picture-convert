import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Home } from './Home';

describe('Home', () => {
    test('renders Home component', () => {
        render(<Home />);
        const home = screen.getByTestId('home');
        expect(home).toBeInTheDocument();
        const h1 = screen.getByRole('heading-home-title');
        expect(h1).toBeInTheDocument();
    });
});
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import {Footer} from './Footer';

describe('Footer', () => {
    test('renders Footer component', () => {
        render(<Footer />);
        const footer = screen.getByTestId('footer');
        expect(footer).toBeInTheDocument();
        const p = screen.getByRole('paragraph');
        expect(p).toBeInTheDocument();
        const a = screen.getByRole('link');
        expect(a).toBeInTheDocument();
    });
    });
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Guide } from './Guide';

describe('Guide', () => {
    test('renders Guide component', () => {
        render(<Guide />);
        const guide = screen.getByTestId('guide');
        expect(guide).toBeInTheDocument();
        const header = screen.getByRole('heading-guide');
        expect(header).toBeInTheDocument();
        const mainTitle = screen.getByRole('heading-guide-title');
        expect(mainTitle).toBeInTheDocument();
        const intro = screen.getByRole('guide-intro');
        expect(intro).toBeInTheDocument();
        const sectionTitle = screen.getAllByRole('section-title');
        expect(sectionTitle).toHaveLength(7);
        const sectionDesc = screen.getAllByRole('section-description');
        expect(sectionDesc).toHaveLength(7);
        const list = screen.getAllByRole('liste');
        expect(list).toHaveLength(3);
        const listItem = screen.getAllByRole('liste-item');
        expect(listItem).toHaveLength(17);
    });
});
import { test, expect, describe } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { SizeSelector } from './SizeSelector';

describe('renders sizeSelector component and checks DOM elements', () => {
    let sizes = {
        mobile: 0,
        tablet: 0,
        desktop: 0,
    };
    const setSize = (size) => {
        sizes = size;
    };
    test('a sizeSelector component is displayed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const sizeSelector = screen.getByTestId('sizeSelector');
        expect(sizeSelector).toBeInTheDocument();
    });

    test('a label for mobile is displayed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const label = screen.getByText('Mobile');
        expect(label).toBeInTheDocument();
    });

    test('a label for tablet is displayed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const label = screen.getByText('Tablet');
        expect(label).toBeInTheDocument();
    });

    test('a label for desktop is displayed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const label = screen.getByText('Desktop');
        expect(label).toBeInTheDocument();
    });

    test('an input for mobile is displayed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const input = screen.getByRole('spinbutton', { name: 'Mobile' });
        expect(input).toBeInTheDocument();
    });

    test('an input for tablet is displayed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const input = screen.getByRole('spinbutton', { name: 'Tablet' });
        expect(input).toBeInTheDocument();
    });

    test('an input for desktop is displayed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const input = screen.getByRole('spinbutton', { name: 'Desktop' });
        expect(input).toBeInTheDocument();
    });

    test('when the value of mobile is changed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const input = screen.getByRole('spinbutton', { name: 'Mobile' });
        fireEvent.change(input, { target: { value: '100' } });
        expect(sizes.mobile).toBe('100');
    });

    test('when the value of tablet is changed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const input = screen.getByRole('spinbutton', { name: 'Tablet' });
        fireEvent.change(input, { target: { value: '100' } });
        expect(sizes.tablet).toBe('100');
    });

    test('when the value of desktop is changed', () => {
        render(<SizeSelector sizes={sizes} setSize={setSize} />);
        const input = screen.getByRole('spinbutton', { name: 'Desktop' });
        fireEvent.change(input, { target: { value: '100' } });
        expect(sizes.desktop).toBe('100');
    });
});
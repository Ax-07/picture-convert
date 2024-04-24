import { test, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { StepByStep } from './StepByStep';

test('renders StepByStep component', () => {
    render(<StepByStep />);
    const stepByStep = screen.getByTestId('stepByStep');
    expect(stepByStep).toBeInTheDocument();
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(4);
});
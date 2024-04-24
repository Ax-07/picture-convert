import { test, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { SeparateLine } from './SeparateLine';
import { SeparateLines } from './SeparateLines';

test('renders SeparateLine component', () => {
    render(<SeparateLine />);
    const separateLine = screen.getByTestId('separateLine');
    expect(separateLine).toBeInTheDocument();
    const line1 = screen.getByTestId('line1');
    expect(line1).toBeInTheDocument();
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    const line2 = screen.getByTestId('line2');
    expect(line2).toBeInTheDocument();
});

test('renders one line when type is simple', () => {
    render(<SeparateLines type='simple' />);
    const lines = screen.getAllByRole('separator');
    expect(lines.length).toBe(1);
  });
  
  test('renders two lines when type is double', () => {
    render(<SeparateLines type='double' />);
    const lines = screen.getAllByRole('separator');
    expect(lines.length).toBe(2);
  });
  
  test('renders three lines when type is triple', () => {
    render(<SeparateLines type='triple' />);
    const lines = screen.getAllByRole('separator');
    expect(lines.length).toBe(3);
  });
  
  test('renders one line when type is not defined', () => {
    render(<SeparateLines />);
    const lines = screen.getAllByRole('separator');
    expect(lines.length).toBe(1);
  });
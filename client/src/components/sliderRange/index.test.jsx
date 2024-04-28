import { test, expect } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { SliderRange } from './SliderRange';

test('renders SliderRange component', () => {
    render(<SliderRange min={0} max={100} value={50} setValue={()=>{}} />);
    const sliderRange = screen.getByTestId('sliderRange');
    expect(sliderRange).toBeInTheDocument();
    const input1 = screen.getByRole('spinbutton');
    expect(input1).toBeInTheDocument();
    const input2 = screen.getByRole('slider');
    expect(input2).toBeInTheDocument();
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toBeInTheDocument();
    const p = screen.getAllByRole('paragraph');
    expect(p.length).toBe(11);
});

test('when value is changed with the slider', () => {
    let testValue = 50;
    const setValue = (value) => testValue = value;
    
    render(<SliderRange min={0} max={100} value={50} setValue={setValue} />);
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '20' } });
    expect(testValue).toBe(20);
});

test('when value is changed with the input', () => {
    let testValue = 50;
    const setValue = (value) => testValue = value;
    
    render(<SliderRange min={0} max={100} value={50} setValue={setValue} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '20' } });
    expect(testValue).toBe(20);
});
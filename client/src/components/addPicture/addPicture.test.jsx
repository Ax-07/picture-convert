import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { AddPicture } from './AddPicture';

// Tests d'intégration
test('renders AddPicture component and checks DOM elements', () => {
    const setImages = vi.fn();
    const file = new File(['image'], 'image.png', { type: 'image/png' });
    render(<AddPicture setImages={setImages} />);

    const addPicture = screen.getByTestId('addPicture');
    expect(addPicture).toBeInTheDocument();

    const input = screen.getByRole('addPictureButton');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { files: [file] } });

    const preview = screen.getByTestId('preview');
    expect(preview).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();

    const close = screen.getByRole('closebutton');
    expect(close).toBeInTheDocument();

    const closeText = screen.getByText('✖️');
    expect(closeText).toBeInTheDocument();
});
// Tests unitaires
test('checks setImages function call', () => {
    const setImages = vi.fn();
    const file = new File(['image'], 'image.png', { type: 'image/png' });
    render(<AddPicture setImages={setImages} />);
    const input = screen.getByRole('addPictureButton');
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(input);

    expect(setImages).toHaveBeenCalledTimes(1);
});
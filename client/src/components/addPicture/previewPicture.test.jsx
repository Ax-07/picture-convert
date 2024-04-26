import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { PreviewPicture } from './PreviewPicture';

// Tests d'intégration
describe('PreviewPicture component', () => {
    test('renders PreviewPicture component and checks DOM elements', () => {
        const onCancel = vi.fn();
        render(<PreviewPicture previewPicture="image.png" onCancel={onCancel} isDisplayPreviewPicture={true} />);

        // vérifie si l'élément preview est présent dans le DOM
        const preview = screen.getByTestId('preview');
        expect(preview).toBeInTheDocument();

        // vérifie si l'élément img est présent dans le DOM
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();

        // vérifie si l'élément closebutton est présent dans le DOM
        const close = screen.getByRole('closebutton');
        expect(close).toBeInTheDocument();

        // vérifie si le texte ✖️ est présent dans le DOM
        const closeText = screen.getByText('✖️');
        expect(closeText).toBeInTheDocument();
    });
});

// Tests unitaires
describe('PreviewPicture component', () => {
    test('checks onCancel function call', () => {
        const onCancel = vi.fn();
        render(<PreviewPicture previewPicture="image.png" onCancel={onCancel} isDisplayPreviewPicture={true} />);
        const close = screen.getByRole('closebutton');
        fireEvent.click(close);

        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test('checks onCancel function call on keydown', () => {
        const onCancel = vi.fn();
        render(<PreviewPicture previewPicture="image.png" onCancel={onCancel} isDisplayPreviewPicture={true} />);
        const close = screen.getByRole('closebutton');
        fireEvent.keyDown(close, { key: 'Enter', code: 13 });

        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});

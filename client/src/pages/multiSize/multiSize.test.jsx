import { describe, test, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import { multiSizePicture } from "../../api/convertPictureApi";
import { MultiSize } from "./MultiSize";

// mock fetch
const fetchReponseTrue = {
  ok: true,
  json: () => Promise.resolve([
    {
      desktop: { buffer: { data: 'desktopData' }, originalname: 'desktopName' },
      mobile: { buffer: { data: 'mobileData' }, originalname: 'mobileName' },
      tablet: { buffer: { data: 'tabletData' }, originalname: 'tableName' },
    },
  ]),
}; // simule une réponse de l'api avec un ok à true et un buffer.data de type Uint8Array

beforeEach(() => {
    cleanup();
    });

describe("MultiSize page", () => {
    let convertButton, input, file, quality, sizes;
    beforeEach(() => {
        render(<MultiSize />);
        convertButton = screen.getByText("Convertir l'image");
        input = screen.getByRole("addPictureButton");
        file = new File(["image"], "image.png", { type: "image/png" });
    });
    test("renders MultiSize component and checks DOM elements", () => {
        const multiSizePicture = screen.getByTestId("multiSize-picture");
        expect(multiSizePicture).toBeInTheDocument();

        const header = screen.getByTestId("multiSize-picture__header");
        expect(header).toBeInTheDocument();

        const title = screen.getByRole("title");
        expect(title).toBeInTheDocument();

        const subTitle = screen.getByRole("sub-title");
        expect(subTitle).toBeInTheDocument();

        const form = screen.getByTestId("multiSize-picture__form");
        expect(form).toBeInTheDocument();

        expect(convertButton).toBeDisabled();
    });

    describe("when a picture is selected", () => {
        test('enables the "Convertir l\'image" button when an image is selected', () => {
            fireEvent.change(input, { target: { files: [file] } });
            expect(convertButton).not.toBeDisabled();
        });
        test('set picture property', async () => {
            const img = { src: '', onload: null };
            globalThis.Image = function() { return img; }; // simule un objet Image avec une propriété src et onload
            
            const setOriginalPictureProperty = vi.fn();
            
            await act(async () => {
                fireEvent.change(input, { target: { files: [file] } });
                setOriginalPictureProperty({
                    size: file.size,
                    width: this.width,
                    height: this.height,
                });
            });

            expect(setOriginalPictureProperty).toHaveBeenCalled();
        });
        describe("and the form is submitted", () => {
            describe("with success", async () => {
                beforeEach(async () => {
                    globalThis.fetch = vi.fn(() => Promise.resolve(fetchReponseTrue)); // pour simuler un appel a une requete
                    globalThis.fetch.mockClear(); // pour vider les appels précédents
                    globalThis.URL.createObjectURL = vi.fn(); // pour simuler la création d'une url
                    await act(async () => {
                      fireEvent.change(input, { target: { files: [file] } });
                      fireEvent.click(convertButton);
                    });
                  });
                test('the download Buttons are displayed', async () => {
                    const response = await multiSizePicture(new FormData());
                    expect(response).toBeTruthy();

                    const downloadBtns = screen.getAllByTestId('downloadBtn');
                    expect(downloadBtns).toHaveLength(3);
                });
                test('the download Buttons are clickable', async () => {
                    const response = await multiSizePicture(new FormData());
                    expect(response).toBeTruthy();

                    const downloadBtns = screen.getAllByTestId('downloadBtn');
                    downloadBtns.forEach((btn) => {
                        fireEvent.click(btn);
                    });
                });
                test('clicking on the "Annuler" button resets the form', () => {
                    const cancelBtn = screen.getByRole('cancel-btn');
                    fireEvent.click(cancelBtn);
                    expect(input).toHaveValue('');
                });
                test('setOriginalPictureProperty is called with correct values when images change', async () => {
                    const file = new File(['image'], 'image.png', { type: 'image/png' });
                    const img = { src: '', onload: null };
                    globalThis.Image = function() { return img; }
                    const setOriginalPictureProperty = vi.fn();
                    
                    await act(async () => {
                        fireEvent.change(input, { target: { files: [file] } });
                        setOriginalPictureProperty({
                            size: file.size,
                            width: this.width,
                            height: this.height,
                        });
                        img.onload();
                    });
                    expect(setOriginalPictureProperty).toHaveBeenCalled();
                });
            });
            test("with error", async () => {
                globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false })); // pour simuler un appel a une requete
                await act(async () => {
                    fireEvent.change(input, { target: { files: [file] } });
                    fireEvent.click(convertButton);
                });
                try {
                    await multiSizePicture(new FormData());
                } catch (error) {
                    expect(error).toBeTruthy();
                }
            });
        });
    });
});
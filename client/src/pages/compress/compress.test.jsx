import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import { Compress } from "./Compress";
import { compressPicture } from "../../api/convertPictureApi";

// mock fetch
const fetchReponseTrue = {
  ok: true,
  json: () => Promise.resolve({buffer: { data: new Uint8Array() } }),
};
// globalThis.fetch = vi.fn(() => Promise.resolve(fetchReponseTrue));
globalThis.fetch = vi.fn().mockResolvedValue(fetchReponseTrue);
// ne pas l'oublié sinon ca peut générer une erreur avec getbytestid
beforeEach(() => {
  cleanup();
  globalThis.fetch.mockClear();
  globalThis.URL.createObjectURL = vi.fn();
});
afterEach(() => {
  globalThis.fetch.mockClear();
  globalThis.URL.createObjectURL.mockClear();
});
// test d'intégration
describe("renders Compress component and checks DOM elements", () => {
  test("a compress picture component is display", () => {
    render(<Compress />);

    const compressPicture = screen.getByTestId("compress-picture");
    expect(compressPicture).toBeInTheDocument();
  });
  test(" a header with title ans sub-title is displayed", () => {
    render(<Compress />);
    const header = screen.getByTestId("compress-picture__header");
    expect(header).toBeInTheDocument();
    const title = screen.getByText("Compresser une image");
    expect(title).toBeInTheDocument();
    const subTitle = screen.getByText(
      "Réduisez la taille de vos images tout en conservant la qualité."
    );
    expect(subTitle).toBeInTheDocument();
  });

  test('a form is displayed', () => {
    render(<Compress />);
    const form = screen.getByTestId('compress-picture__form');
    expect(form).toBeInTheDocument();
  });
});

test('the "Convertir l\'image" button is disabled when no image is selected', () => {
  render(<Compress />);
  const convertButton = screen.getByText('Convertir l\'image');
  expect(convertButton).toBeDisabled();
});

// Test pour vérifier si le bouton "Convertir l'image" est activé lorsqu'une image est sélectionnée
test('the "Convertir l\'image" button is enabled when an image is selected', () => {
  const file = new File(['image'], 'image.png', { type: 'image/png' });
  render(<Compress />);
  const input = screen.getByRole('addPictureButton');
  const convertButton = screen.getByText('Convertir l\'image');
  fireEvent.change(input, { target: { files: [file] } });
  expect(convertButton).not.toBeDisabled();
});

// Test pour vérifier si le bouton "Télécharger" est affiché après la compression de l'image
test('the "Télécharger" button is displayed after image compression', async () => {
  const file = new File(['image'], 'image.png', { type: 'image/png' });
  render(<Compress />);
  const input = screen.getByRole('addPictureButton');
  const convertButton = screen.getByText('Convertir l\'image');
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(convertButton);
    const reponse = await compressPicture(new FormData());
    expect(reponse).toEqual({ buffer: { data: new Uint8Array() } });
  });

  const downloadButton = screen.getByTestId('downloadBtn');
  expect(downloadButton).toBeInTheDocument();

  const cancelBtn = screen.getByText('Annuler');
  expect(cancelBtn).toBeInTheDocument();
});

test('error message is displayed when an error occurs during image compression', async () => {
  globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false }));
  render(<Compress />);
  const file = new File(['image'], 'image.png', { type: 'image/png' });
  const input = screen.getByRole('addPictureButton');
  const convertButton = screen.getByText('Convertir l\'image');
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(convertButton);
  });
  try {
    await compressPicture(new FormData());
  } catch (error) {
    expect(error).toEqual(new Error('Erreur lors de la compression de l\'image'));
  }
});

test('the resetForm function is called when the "Annuler" button is clicked', async () => {
  globalThis.fetch = vi.fn(() => Promise.resolve(fetchReponseTrue));
  const file = new File(['image'], 'image.png', { type: 'image/png' });
  render(<Compress />);
  const input = screen.getByRole('addPictureButton');
  const convertButton = screen.getByText('Convertir l\'image');
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(convertButton);
    const reponse = await compressPicture(new FormData());
    expect(reponse).toEqual({ buffer: { data: new Uint8Array() } });
  });

  const cancelBtn = screen.getByRole('cancel-btn');
  fireEvent.click(cancelBtn);
  const inputPicture = screen.getByRole('addPictureButton');
  expect(inputPicture).toHaveValue('');
});

test('setOriginalPictureProperty is called with correct values when images change', async () => {
  const file = new File(['image'], 'image.png', { type: 'image/png' });
  const img = { src: '', onload: null };
  globalThis.Image = function() { return img; }
  const setOriginalPictureProperty = vi.fn();
  
  render(<Compress />);
  const input = screen.getByRole('addPictureButton');
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } });
    setOriginalPictureProperty({
      size: file.size,
      width: this.width,
      height: this.height,
    })
    img.onload();
  });

  expect(setOriginalPictureProperty).toHaveBeenCalledWith({
    size: file.size,
    width: img.width,
    height: img.height,
  });
});

test('setCompressedImageProperty is called with correct values when response change', async () => {
  const file = new File(['image'], 'image.png', { type: 'image/png' });
  const img = { src: '', onload: null };
  globalThis.Image = function() { return img; }
  const setCompressedImageProperty = vi.fn();
  render(<Compress />);
  const input = screen.getByRole('addPictureButton');
  const convertButton = screen.getByText('Convertir l\'image');
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(convertButton);
  });
  const reponse = await compressPicture(new FormData());
  expect(reponse).toEqual({ buffer: { data: new Uint8Array() } });

  await act(async () => {
    setCompressedImageProperty({
      size: reponse.size,
      width: reponse.width,
      height: reponse.height,
    });
    img.onload();
  });


  expect(setCompressedImageProperty).toHaveBeenCalledWith({
    size: reponse.size,
    width: reponse.width,
    height: reponse.height,
  });
});
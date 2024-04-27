import { describe, test, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import { Convert } from "./Convert";
import { convertPicture } from "../../api/convertPictureApi";

// mock fetch
const fetchReponseTrue = {
  ok: true,
  json: () => Promise.resolve({ buffer: { data: new Uint8Array() } }),
};

beforeEach(() => {
  cleanup();
});

describe("Convert page", () => {
  let convertButton, input, file;
  beforeEach(() => {
    render(<Convert />);
    convertButton = screen.getByText("Convertir l'image");
    input = screen.getByRole("addPictureButton");
    file = new File(["image"], "image.png", { type: "image/png" });
  });

  test("renders Convert component and checks DOM elements", () => {
    const convertPicture = screen.getByTestId("convert-picture");
    expect(convertPicture).toBeInTheDocument();

    const header = screen.getByTestId("convert-picture__header");
    expect(header).toBeInTheDocument();

    const title = screen.getByText("Convertir une image");
    expect(title).toBeInTheDocument();

    const subTitle = screen.getByText(
      "Réduisez la taille de vos images tout en conservant la qualité."
    );
    expect(subTitle).toBeInTheDocument();

    const form = screen.getByTestId("convert-picture__form");
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
      globalThis.Image = function() { return img; }
      const setOriginalPictureProperty = vi.fn();
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
        setOriginalPictureProperty({
          size: file.size,
          width: this.width,
          height: this.height,
        })
        img.onload();
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
        test("converts the image", async () => {
          const reponse = await convertPicture(new FormData());
          expect(reponse).toEqual({ buffer: { data: new Uint8Array() } });
        });
        test("displays the download and cancel buttons", () => {
          const downloadButton = screen.getByTestId("downloadBtn");
          expect(downloadButton).toBeInTheDocument();

          const cancelBtn = screen.getByText("Annuler");
          expect(cancelBtn).toBeInTheDocument();
        });
        test('clicking on the "Annuler" button resets the form', () => {
          const cancelBtn = screen.getByRole('cancel-btn');
          fireEvent.click(cancelBtn);
          const inputPicture = screen.getByRole('addPictureButton');
          expect(inputPicture).toHaveValue('');
        });
        test('reset form when download button is clicked', async () => {
          const downloadButton = screen.getByTestId('downloadBtn');
          fireEvent.click(downloadButton);
          const inputPicture = screen.getByRole('addPictureButton');
          expect(inputPicture).toHaveValue('');
        });
      });
      test("with error, displays an error message", async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false }));
        await act(async () => {
          fireEvent.change(input, { target: { files: [file] } });
          fireEvent.click(convertButton);
        });
        try {
          await convertPicture(new FormData());
        } catch (error) {
          expect(error).toEqual(
            new Error("Erreur lors de la conversion de l'image")
          );
        }
      });
    });
  });
});

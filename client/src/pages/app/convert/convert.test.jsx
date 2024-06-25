import { describe, test, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import { Convert } from "./Convert";
import { convertPicture } from "../../../api/convertPictureApi";
import { useImageProcessing } from "../../../utils/hooks/useImageProcessing";
import { MemoryRouter } from "react-router-dom";
import { PictureContext } from "../../../context/PicturesContext";

// Mock du hook personnalisé useImageProcessing pour simuler un appel a un hook personnalisé
vi.mock("../../utils/hooks/useImageProcessing", () => ({
  useImageProcessing: vi.fn(),
}));
const initialSetupComponent = () => {
  render(
    <MemoryRouter>
      <PictureContext.Provider
        value={{
          images: "image1.png",
          setImages: vi.fn(),
          quality: 80,
          setQuality: vi.fn(),
          sizes: { mobile: 430, tablet: 768, desktop: 1024 },
          setSizes: vi.fn(),
          originalPictureProperty: { size: 0, width: 0, height: 0 },
          setOriginalPictureProperty: vi.fn(),
          comparedImageProperty: { size: 0, width: 0, height: 0 },
          setComparedImageProperty: vi.fn(),
          imgWidth: 0,
          setImgWidth: vi.fn(),
          resetPictures: vi.fn(),
        }}
      >
        <Convert />
      </PictureContext.Provider>
    </MemoryRouter>
  );
};
const AfterProcessComponent = () => {
  render(
    <MemoryRouter>
      <PictureContext.Provider
        value={{
          images: "image1.png",
          setImages: vi.fn(),
          quality: 80,
          setQuality: vi.fn(),
          sizes: { mobile: 430, tablet: 768, desktop: 1024 },
          setSizes: vi.fn(),
          originalPictureProperty: { size: 100, width: 150, height: 50 },
          setOriginalPictureProperty: vi.fn(),
          comparedImageProperty: { size: 100, width: 150, height: 50 },
          setComparedImageProperty: vi.fn(),
          imgWidth: 150,
          setImgWidth: vi.fn(),
          resetPictures: vi.fn(),
        }}
      >
        <Convert />
      </PictureContext.Provider>
    </MemoryRouter>
  );
};
// mock fetch simule une réponse de l'api avec un ok à true et un buffer.data de type Uint8Array
const fetchReponseTrue = {
  ok: true,
  json: () => Promise.resolve({ buffer: { data: new Uint8Array() } }),
}; //
beforeEach(() => {
  cleanup();
});

describe("Convert page", () => {
  let convertButton, input, file;
  const onSubmitSpy = vi.fn();

  beforeEach(() => {
    useImageProcessing.mockReturnValue({
      downloadUrls: null,
      isError: false,
      isLoading: false,
      onSubmit: onSubmitSpy,
      onReset: vi.fn(),
    });
    initialSetupComponent();
    convertButton = screen.getByText("Convertir l'image");
    input = screen.getByRole("addPictureButton");
    file = new File(["image"], "image.png", { type: "image/png" });
    globalThis.URL.createObjectURL = vi.fn();
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

    expect(convertButton).toBeInTheDocument();
  });
  describe("when a picture is selected", () => {
    test('enables the "Convertir l\'image" button when an image is selected', () => {
      fireEvent.change(input, { target: { files: [file] } });
      expect(convertButton).not.toBeDisabled();
    });
    test("set picture property", async () => {
      const img = { src: "", onload: null };
      globalThis.Image = function () {
        return img;
      };
      globalThis.URL.createObjectURL = vi.fn();
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
      beforeEach(async () => {
        globalThis.Image = () => ({ src: "", onload: null });
        useImageProcessing.mockReturnValue({
          downloadUrl: "url",
          isError: false,
          isLoading: false,
          onSubmit: onSubmitSpy,
          onReset: vi.fn(),
        });
      });
      test("the useImageProcessing hook is called on form submit", async () => {
        await act(async () => {
          fireEvent.change(input, { target: { files: [file] } });
          fireEvent.click(convertButton);
        });

        expect(onSubmitSpy).toHaveBeenCalled();
      });

      describe("with success", async () => {
        beforeEach(() => {
          AfterProcessComponent();
        });

        test("displays the download and cancel buttons are displayed", async () => {
          const downloadButton = await screen.findByTestId("downloadBtn");
          expect(downloadButton).toBeInTheDocument();

          const cancelButtons = screen.getAllByRole("cancel-btn");
          expect(cancelButtons.length).toBeGreaterThan(0);
        });
        test('clicking on the "Annuler" button resets the form', () => {
          const cancelBtn = screen.getByRole("cancel-btn");
          fireEvent.click(cancelBtn);
          expect(input).toHaveValue("");
        });
        test("reset form when download button is clicked", async () => {
          const downloadButton = screen.getByTestId("downloadBtn");
          fireEvent.click(downloadButton);
          expect(input).toHaveValue("");
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

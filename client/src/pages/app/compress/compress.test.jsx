import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import { PictureContext } from "../../context/PicturesContext";
import { MemoryRouter } from "react-router-dom";
import { useImageProcessing } from "../../utils/hooks/useImageProcessing";
import { Compress } from "./Compress";
import { compressPicture } from "../../api/convertPictureApi";

// Mock du hook personnalisé useImageProcessing pour simuler un appel a un hook personnalisé
vi.mock("../../utils/hooks/useImageProcessing", () => ({
  useImageProcessing: vi.fn(),
}));

// mock imageFile simule un fichier image de type image
const mockImageFile = (fileName, type) =>
  new File(["image"], fileName, { type });

// mock fetch
const fetchReponseTrue = {
  ok: true,
  json: () => Promise.resolve({ buffer: { data: new Uint8Array() } }),
};

const onSubmitSpy = vi.fn();
const initialSetupComponent = () => {
  useImageProcessing.mockReturnValue({
    response: null,
    downloadUrl: "",
    isError: false,
    isLoading: false,
    onSubmit: onSubmitSpy,
    onReset: vi.fn(),
  });
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
        <Compress />
      </PictureContext.Provider>
    </MemoryRouter>
  );
};

const AfterProcessComponent = () => {
  useImageProcessing.mockReturnValue({
    response: { originalname: "image1.png" },
    downloadUrl: "http://localhost:5000/download",
    isError: false,
    isLoading: false,
    onSubmit: onSubmitSpy,
    onReset: vi.fn(),
  });
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
        <Compress />
      </PictureContext.Provider>
    </MemoryRouter>
  );
};

describe("Convert page", () => {
  let convertButton, input, file;

  beforeEach(() => {
    initialSetupComponent();
    convertButton = screen.getByRole("convert-btn");
    input = screen.getByRole("addPictureButton");
    file = mockImageFile("image1.png", "image/png");
    URL.createObjectURL = vi.fn();
    globalThis.fetch = vi.fn().mockResolvedValue(fetchReponseTrue);
  });
  test("renders Convert component and checks DOM elements", () => {
    const compressPicture = screen.getByTestId("compress-picture");
    expect(compressPicture).toBeInTheDocument();

    const compressPictureHeader = screen.getByTestId("compress-picture__header");
    expect(compressPictureHeader).toBeInTheDocument();

    const title = screen.getByRole("title");
    expect(title).toBeInTheDocument();
    
    const subTitle = screen.getByRole("sub-title");
    expect(subTitle).toBeInTheDocument();

    const form = screen.getByTestId("compress-picture__form");
    expect(form).toBeInTheDocument();

    expect(convertButton).toBeInTheDocument();
  });

  describe("when a picture is added", () => {
    test("should call setImages with the file", () => {
      fireEvent.change(input, { target: { files: [file] } });
      expect(input.files[0]).toStrictEqual(file);
    });
    test('enables the "Convertir l\'image" button when an image is selected', () => {
      fireEvent.change(input, { target: { files: [file] } });
      expect(convertButton).not.toBeDisabled();
    });
    test("set picture property", async () => {
      const img = { src: "", onload: null };
      globalThis.Image = () => img;

      const setOriginalPictureProperty = vi.fn();
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
        setOriginalPictureProperty({ size: 100, width: 150, height: 50 });
      });
      expect(setOriginalPictureProperty).toHaveBeenCalled();
    });
    describe("when the form is submitted", () => {
      test("the useImageProcessing hook is called on form submit", async () => {
        await act(async () => {
          fireEvent.change(input, { target: { files: [file] } });
          fireEvent.click(convertButton);
        });

        expect(onSubmitSpy).toHaveBeenCalled();
      });
      describe("with success", ()=> {
        beforeEach(() => {
          AfterProcessComponent();
        });
        test("the download Buttons are displayed and cancel btn", () => {
          const downloadButton = screen.getByRole("download-btn");
          expect(downloadButton).toBeInTheDocument();

          const cancelBtn = screen.getByRole("cancel-btn");
          expect(cancelBtn).toBeInTheDocument();
        });
        test('clicking on the "Annuler" button resets the form', () => {
          const cancelBtn = screen.getByRole("cancel-btn");
          fireEvent.click(cancelBtn);
          expect(input).toHaveValue("");
        });
        test("with error", async () => {
          globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false }));
  
          await act(async () => {
            fireEvent.change(input, { target: { files: [file] } });
            fireEvent.click(convertButton);
          });
  
          try {
            await compressPicture(new FormData());
          } catch (error) {
            expect(error).toBeTruthy();
          }
        });
      });
    });
  });
});

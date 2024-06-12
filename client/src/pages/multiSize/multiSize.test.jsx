import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import { multiSizePicture } from "../../api/convertPictureApi";
import { MultiSize } from "./MultiSize";
import { PictureContext } from "../../context/PicturesContext";
import { MemoryRouter } from "react-router-dom";
import { useImageProcessing } from "../../utils/hooks/useImageProcessing";

// Mock du hook personnalisé useImageProcessing pour simuler un appel a un hook personnalisé
vi.mock("../../utils/hooks/useImageProcessing", () => ({
  useImageProcessing: vi.fn(),
}));

// mock imageFile simule un fichier image de type image
const mockImageFile = (fileName, type) =>
  new File(["image"], fileName, { type });

// mock fetch simule une réponse de l'api avec un ok à true et un buffer.data de type Uint8Array
const fetchReponseTrue = {
  ok: true,
  json: () =>
    Promise.resolve([
      {
        desktop: {
          buffer: { data: "desktopData" },
          originalname: "desktopName",
        },
        mobile: { buffer: { data: "mobileData" }, originalname: "mobileName" },
        tablet: { buffer: { data: "tabletData" }, originalname: "tableName" },
      },
    ]),
};

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
        <MultiSize />
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
        <MultiSize />
      </PictureContext.Provider>
    </MemoryRouter>
  );
};

describe("Initial MultiSize page", () => {
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

    convertButton = screen.getByRole("convert-btn");
    input = screen.getByRole("addPictureButton");
    file = mockImageFile("image.png", "image/png");

    URL.createObjectURL = vi.fn();
    globalThis.fetch = vi.fn(() => Promise.resolve(fetchReponseTrue));
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

    expect(convertButton).toBeInTheDocument();
  });
  describe("when a picture is selected", () => {
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
        setOriginalPictureProperty({
          size: file.size,
          width: img.width,
          height: img.height,
        });
      });

      expect(setOriginalPictureProperty).toHaveBeenCalled();
    });
    describe("and the form is submitted", () => {
      beforeEach(() => {
        globalThis.Image = () => ({ src: "", onload: null });
        useImageProcessing.mockReturnValue({
          downloadUrls: {
            desktop: { url: "desktopUrl", name: "desktopName" },
            mobile: { url: "mobileUrl", name: "mobileName" },
            tablet: { url: "tabletUrl", name: "tabletName" },
          },
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

      describe("with success", () => {
        beforeEach(() => {
          AfterProcessComponent();
        });

        test("the download Buttons are displayed and cancel btn", async () => {
          const downloadBtns = await screen.findAllByTestId("downloadBtn");
          expect(downloadBtns).toHaveLength(3);

          const cancelBtn = screen.getByRole("cancel-btn");
          expect(cancelBtn).toBeInTheDocument();
        });

        test('clicking on the "Annuler" button resets the form', () => {
          const cancelBtn = screen.getByRole("cancel-btn");
          fireEvent.click(cancelBtn);
          expect(input).toHaveValue("");
        });
      });

      test("with error", async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false }));

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

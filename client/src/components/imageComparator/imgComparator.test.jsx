import { test, expect, vi, describe } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ImgComparator } from "./ImgComparator";
import { act } from "@testing-library/react";
import { beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => {
  cleanup();
});

describe("when image comparator is render", () => {
  let setImgWidth, imgWidth, originalImg, overlay, comparedImg, slider;
  beforeEach(() => {
    setImgWidth = vi.fn();
    imgWidth = 1000;
    const { getByAltText, getByRole } = render(
      <ImgComparator
        original="original.png"
        compared="compared.png"
        imgWidth={imgWidth}
        setImgWidth={setImgWidth}
      />
    );
    originalImg = getByAltText("image original");
    overlay = getByRole("img-comp-overlay");
    comparedImg = getByAltText("image compared");
    slider = getByRole("slider");
  });
  test("renders ImgComparator component", () => {
    expect(originalImg).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(comparedImg).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  test("the slider is center", () => {
    slider.style.left = imgWidth / 2 + "px";
    overlay.style.width = imgWidth / 2 + "px";

    expect(slider.style.left).toBe("500px");
    expect(overlay.style.width).toBe("500px");
  });

  test('when the slider is moved', async () => {
    let positionX = 250;
    await act(async () => {
      fireEvent.mouseDown(slider);
      fireEvent.mouseMove(window, { clientX: positionX + 10});
      fireEvent.mouseUp(window);
    });
    slider.style.left = slider.clientX + "px";
    console.log(slider.style.left, positionX);
    expect(slider.style.left).toBe("260px");
    expect(overlay.style.width).toBe("260px");

  });
  test('slideMove does not move the slider out of bounds', async () => {
    await act(async () => {
      fireEvent.mouseDown(slider);
      fireEvent.mouseMove(window, { clientX: -10 });
      fireEvent.mouseUp(window);
    });
    expect(slider.style.left).toBe("0px");
    expect(overlay.style.width).toBe("0px");

    await act(async () => {
      fireEvent.mouseDown(slider);
      fireEvent.mouseMove(window, { clientX: imgWidth + 10 });
      fireEvent.mouseUp(window);
    });
    expect(slider.style.left).toBe("1000px");
    expect(overlay.style.width).toBe("1000px");
  });
  test('onImageLoad sets image width', () => {
    fireEvent.load(originalImg);
    expect(setImgWidth).toHaveBeenCalled();
  });
});
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputPicture } from "./InputPicture";
import { useDragNDrop } from "../../utils/hooks/useDragNDrop";
import {act, renderHook} from "@testing-library/react";  


// Tests d'intégration
describe("InputPicture component", () => {
  test("renders InputPicture component and checks DOM elements", () => {
    const onInputChange = vi.fn();
    render(<InputPicture onInputChange={onInputChange} />);

    // vérifie si l'élément addPicture est présent dans le DOM
    const addPicture = screen.getByTestId("inputPicture").querySelector(".add-picture__input");
    expect(addPicture).toBeInTheDocument();

    // vérifie si l'élément icon est présent dans le DOM
    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();

    // verifie si l'élément btn est présent dans le DOM
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();

    // vérifie si l'élément txt est présent dans le DOM
    const txt = screen.getByText(/jpg, png : 2mo max/i)
    expect(txt).toBeInTheDocument();
  });
});

// Tests unitaires
describe("InputPicture component", () => {
  test("checks onInputChange function call", () => {
    const onInputChange = vi.fn();
    render(<InputPicture onInputChange={onInputChange} />);
    const input = screen.getByTestId("inputPicture").querySelector(".add-picture__input");
    fireEvent.change(input);

    expect(onInputChange).toHaveBeenCalledTimes(1);
  });

  test("checks onInputChange function call when a file is dropped", () => {
    const files = [new File([], "test.png")];
    const onInputChange = vi.fn();
    render(<InputPicture onInputChange={onInputChange} />);
  
    const input = screen.getByTestId("inputPicture");
    fireEvent.drop(input, { dataTransfer: { files } });
  
    expect(onInputChange).toHaveBeenCalledTimes(1);
  });

  test("checks dragOver function call", () => {
    const { result } = renderHook(() => useDragNDrop());
    const { dragOver } = result.current;
    const e = { preventDefault: vi.fn() };
    act(() => dragOver(e));
  
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
  });

  test("checks className changes when dragging",  () => {
    render(<InputPicture onInputChange={vi.fn()} />);
    const e = { preventDefault: vi.fn() };  
    const { result } = renderHook(() => useDragNDrop());
    act(() => result.current.dragOver(e));

     expect(result.current.dragging).toBe(true);
  });
  test("checks className changes when dragging", () => {
    render(<InputPicture onInputChange={vi.fn()} />);
    fireEvent(
      screen.getByTestId("inputPicture"),
      new MouseEvent("dragover", {
        bubbles: true,
        cancelable: true,
      })
    )
    
    const inputPicture = screen.getByTestId("inputPicture");
    expect(inputPicture).toHaveClass("add-picture__wrapper--dragging");
  });
});
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

test("renders Header component", () => {
  render(
    // MemoryRouter is used to test components that use react-router-dom, c'est obligatoire si un composant contient des Links react.
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();
  const navbar = screen.getByTestId("navbar");
  expect(navbar).toBeInTheDocument();
});

import Home from "@/app/page";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Home Page", () => {
  it("should render the page with initial elements", () => {
    render(<Home />);

    expect(screen.getByText("Benordb")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Search for a country")
    ).toBeInTheDocument();

    expect(screen.getByTestId("addButton")).toBeInTheDocument();
  });

  it("should toggle the dropdown when clicking the button", () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("dropdown"));
  });

  it("should allow selecting and deselecting a country", () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("dropdown"));

    const country = screen.getByTestId("item-0");
    fireEvent.mouseDown(country);

    fireEvent.click(country);
  });

  it("should clear selected countries when clicking 'Add' button", () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("dropdown"));

    const country = screen.getByTestId("item-0");
    fireEvent.click(country);

    fireEvent.click(screen.getByTestId("addButton"));
  });
  it("should filter countries based on the search input", () => {
    render(<Home />);

    const input = screen.getByPlaceholderText("Search for a country");
    fireEvent.focus(input);

    fireEvent.change(input, { target: { value: "Mon" } });

    fireEvent.blur(screen.getByPlaceholderText("Search for a country"));
  });
  it("should selected countries clicking this country", () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("dropdown"));

    const country = screen.getByTestId("item-0");
    fireEvent.click(country);

    const removeCountry = screen.getByTestId("select-item-0");
    fireEvent.click(removeCountry);
  });
});

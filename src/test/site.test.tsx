import {readFileSync} from "node:fs";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import App from "../App";

describe("site", () => {
  it("links legal pages, contact and products", () => {
    render(<App />);
    expect(screen.getByRole("link", {name: "Legal notice"})).toHaveAttribute(
      "href",
      "./impressum.html"
    );
    expect(screen.getByRole("link", {name: "Privacy policy"})).toHaveAttribute(
      "href",
      "./datenschutz.html"
    );
    expect(
      screen.getByRole("link", {name: /info@kreinn\.de/})
    ).toHaveAttribute("href", "mailto:info@kreinn.de");
    expect(screen.getByRole("link", {name: /0231-6186842/})).toHaveAttribute(
      "href",
      "tel:+492316186842"
    );
    const hrefs = screen.getAllByRole("link").map(a => a.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining(["https://kreinn.de/", "https://zeitmatrose.de/"])
    );
  });

  it("legal pages name the operator and a contact", () => {
    for (const f of ["impressum.html", "datenschutz.html"]) {
      const html = readFileSync(f, "utf8");
      expect(html).toContain("KreInn GmbH");
      expect(html).toContain("Rumpstraße 15");
      expect(html).toContain("mailto:info@kreinn.de");
    }
  });
});

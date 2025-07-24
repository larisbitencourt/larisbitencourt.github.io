import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import renderWithRouter from "./utils/renderWithRouter";

test(" se página contém um heading h2 com o texto Page requested not found 😭", async () => {
  const { history } = renderWithRouter(<App />, { route: "/narutex" });

  const pageNotFound = screen.getByRole("heading", {
    name: "Page requested not found Crying emoji",
  });
  expect(pageNotFound).toBeInTheDocument();
});

test("Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif", async () => {
  const { history } = renderWithRouter(<App />, { route: "/narutex" });

  // const imgNotFound = screen.getByText("Page requested not found");

  const URL_DA_IMAGEM = "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif";
  const imagem = await screen.findByAltText(
    "Pikachu crying because the page requested was not found"
  );
  expect(imagem).toBeInTheDocument();
  expect(imagem).toHaveAttribute("src", URL_DA_IMAGEM);
});

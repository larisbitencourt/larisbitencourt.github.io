import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./utils/renderWithRouter";

test("se a página contém as informações sobre a Pokédex.", async () => {
  const { history } = renderWithRouter(<App />, { route: "/about" });

  const aboutInformation = screen.getByText("About");

  await userEvent.click(aboutInformation);

  const information = await screen.findByText(
    /This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/i
  );
  expect(information).toBeInTheDocument();
});

test("se a página contém um heading h2 com o texto About Pokédex", async () => {
  const { history } = renderWithRouter(<App />, { route: "/about" });

  const heading = screen.getByText("About");

  await userEvent.click(heading);

  const information = await screen.findByText(/About Pokédex/i);
  expect(information).toBeInTheDocument();
});

test("se a página contém dois parágrafos com texto sobre a Pokédex", async () => {
  const { history } = renderWithRouter(<App />, { route: "/about" });

  const aboutText = screen.getByText("About");

  await userEvent.click(aboutText);

  const firstParagraph = await screen.findByText(
    /This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/i
  );
  const secondParagraph = await screen.findByText(
    /One can filter Pokémons by type, and see more details for each one of them/i
  );
  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test("e a página contém a seguinte imagem de uma Pokédex", async () => {
  const { history } = renderWithRouter(<App />, { route: "/about" });

  const imgPokedex = screen.getByText("About");

  await userEvent.click(imgPokedex);

  const URL_DA_IMAGEM = "https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"
  const imagem = await screen.findByRole('img');
  expect(imagem).toBeInTheDocument();
  expect(imagem).toHaveAttribute('src', URL_DA_IMAGEM);
  
});

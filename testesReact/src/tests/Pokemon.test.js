import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./utils/renderWithRouter";
import { Pokedex } from "../components";

const pokemonsMock = [
  {
    id: 25,
    name: "Pikachu",
    type: "Electric",
    averageWeight: {
      value: "6.0",
      measurementUnit: "kg",
    },
    image: "https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png",
  },
  {
    id: 4,
    name: "Charmander",
    type: "Fire",
    averageWeight: {
      value: "8.5",
      measurementUnit: "kg",
    },
    image: "https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png",
  },
];
describe("Teste se é renderizado um card com as informações de determinado pokémon", () => {
  test("O nome correto do Pokémon deve ser mostrado na tela", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={pokemonsMock}
        isPokemonFavoriteById={{ 25: false, 4: false }}
      />
    );

    // getByRole não retorna array, então não usa [0]
    // Além disso, findByRole é assíncrono e retorna promise
    const pokemonCard = await screen.findByRole("button", { name: /Fire/i });
    fireEvent.click(pokemonCard);
    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });

  test("O tipo correto do pokémon deve ser mostrado na tela", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={pokemonsMock}
        isPokemonFavoriteById={{ 25: false, 4: false }}
      />
    );

    const fireButtons = await screen.findAllByRole("button", { name: /Fire/i });
    const pokemonCard = fireButtons[0];
    fireEvent.click(pokemonCard);

    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });

  test("O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit>", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={pokemonsMock}
        isPokemonFavoriteById={{ 25: false, 4: false }}
      />
    );

    const pokemonCardHeight = await screen.findByRole("button", {
      name: /Fire/i,
    });
    fireEvent.click(pokemonCardHeight);
    expect(screen.getByText("Average weight: 8.5 kg")).toBeInTheDocument();
  });

  test("A imagem do Pokémon deve ser exibida", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={pokemonsMock}
        isPokemonFavoriteById={{ 25: false, 4: false }}
      />
    );

    const pokemonCardImage = await screen.findByRole("button", {
      name: /Fire/i,
    });
    fireEvent.click(pokemonCardImage);
    const URL_DA_IMAGEM =
      "https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png";
    const imagem = await screen.findByRole("img", {
      name: /Charmander sprite/i,
    });

    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute("src", URL_DA_IMAGEM);
  });
});

test("Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.", async () => {
  renderWithRouter(
    <Pokedex
      pokemons={pokemonsMock}
      isPokemonFavoriteById={{ 25: false, 4: false }}
    />
  );

  const pokemonCardLink = await screen.findByRole("link", {
    name: /More details/i,
  });
  expect(pokemonCardLink).toBeInTheDocument();
  expect(pokemonCardLink).toHaveAttribute("href", "/pokemons/25");
});

test("Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.", async () => {
  const { history } = renderWithRouter(
    <Pokedex
      pokemons={pokemonsMock}
      isPokemonFavoriteById={{ 25: false, 4: false }}
    />
  );

  const pokemonDetails = await screen.findByRole("link", {
    name: /More details/i,
  });
  fireEvent.click(pokemonDetails);
  expect(history.location.pathname).toBe("/pokemons/25");
});

test("Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;", async () => {
  const { history } = renderWithRouter(
    <Pokedex
      pokemons={pokemonsMock}
      isPokemonFavoriteById={{ 25: false, 4: false }}
    />
  );

  const pokemonDetailsId = await screen.findByRole("link", {
    name: /More details/i,
  });
  fireEvent.click(pokemonDetailsId);
  expect(history.location.pathname).toBe("/pokemons/25");
  expect(pokemonsMock[0].id).toBe(25);
});

describe("Teste se existe um ícone de estrela nos Pokémons favoritados.", () => {
  test("O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;", async () => {
    const { history } = renderWithRouter(
      <App/>
    );

    const pokemonDetailsFavorite = await screen.findByRole("link", {
      name: /More details/i,
    });

     fireEvent.click(pokemonDetailsFavorite);

    const checkboxFavorite = await screen.findByRole("checkbox", {
      name: /Pokémon favoritado?/i,
    });

    fireEvent.click(checkboxFavorite);

    const favoriteIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute("src", "/star-icon.svg");
  });
});





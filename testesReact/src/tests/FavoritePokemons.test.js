import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import renderWithRouter from "./utils/renderWithRouter";
import FavoritePokemons from "../components/FavoritePokemons";

test("se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.", async () => {
  const { history } = renderWithRouter(<App />, { route: "/favorites" });
  const pokemonNotFound = screen.getByText("Favorite Pokémons");
  //   await userEvent.click(pokemonNotFound) >>>  se ele ja está na rota nao precisa colcoar o await

  const favoritePokemonNotFound = await screen.findByText(
    /No favorite pokemon found/i
  );
  expect(favoritePokemonNotFound).toBeInTheDocument();
});

const favoritePokemonsMock = [
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

test("se exibe todos os cards de pokémons favoritados", () => {
  renderWithRouter(<FavoritePokemons pokemons={favoritePokemonsMock} />);

  const pikachu = screen.getByText(/pikachu/i);
  const charmander = screen.getByText(/charmander/i);

  expect(pikachu).toBeInTheDocument();
  expect(charmander).toBeInTheDocument();
});

test("se nenhum card de pokémon é exibido, se ele não estiver favoritado", () => {
  renderWithRouter(<FavoritePokemons favorites={[]} />, {
    route: "/favorites",
  });
  // passando lista vazia para verificar que não há card

  const pikachuCard = screen.queryByText("Pikachu");
  expect(pikachuCard).not.toBeInTheDocument();
});

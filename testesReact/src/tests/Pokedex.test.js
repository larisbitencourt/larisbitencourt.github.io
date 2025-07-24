import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./utils/renderWithRouter";
import { Pokedex } from "../components";

test("se página contém um heading h2 com o texto Encountered pokémons", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = getByText(/Encountered pokémons/i);
  expect(heading).toBeInTheDocument();
});

const forNextPokemon = [
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

describe("se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado", () => {
  test("O botão deve conter o texto Próximo pokémon", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const buttonNextPokemon = screen.getByRole("button", {
      name: /próximo pokémon/i,
    });
    expect(buttonNextPokemon).toBeInTheDocument();
    expect(buttonNextPokemon.type).toBe("button");
  });

  test("Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={forNextPokemon}
        isPokemonFavoriteById={forNextPokemon}
      />
    );
    const buttonAdd = screen.getByRole("button", { name: /Próximo pokémon/i });

    fireEvent.click(buttonAdd);
    expect(screen.getByText("Charmander")).toBeInTheDocument();

    fireEvent.click(buttonAdd);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });

  test("mostra o primeiro Pokémon ao clicar no botão", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const buttonFirstPokemon = screen.getByRole("button", {
      name: /próximo pokémon/i,
    });
    fireEvent.click(buttonFirstPokemon);
    expect(screen.getByText(/Charmander|Caterpie|Ekans/i)).toBeInTheDocument();
  });

  test("volta para o primeiro Pokémon quando chega no último", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const buttonLastPokemon = screen.getByRole("button", {
      name: /próximo pokémon/i,
    });

    for (let i = 0; i < 9; i++) {
      fireEvent.click(buttonLastPokemon);
    }

    expect(screen.getByText("Pikachu")).toBeInTheDocument();

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });
});

test("exibe apenas um Pokémon por vez", () => {
  renderWithRouter(
    <Pokedex pokemons={forNextPokemon} isPokemonFavoriteById={{ 25: false }} />
  ); // Renderiza com um Pokémon
  const pokemonElements = screen.getAllByText("Pikachu");
  expect(pokemonElements.length).toBe(1); // Verifica se há apenas um
});

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

describe("Teste se a Pokédex tem os botões de filtro", () => {
  test("A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;", async () => {
    renderWithRouter(
      <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={{ 25: false }} />
    );
    fireEvent.click(screen.getByText("Fire"));
    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
  });

  test("O texto do botão deve corresponder ao nome do tipo, ex. Psychic", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={pokemonsMock}
        isPokemonFavoriteById={{ 25: false, 4: false }}
      />
    );
    const buttonType = screen.getByRole("button", { name: /Fire/i });
    expect(buttonType).toBeInTheDocument();
    expect(buttonType).toHaveTextContent("Fire");
  });
});

//////

describe("se a Pokédex contém um botão para resetar o filtro", () => {
  test("O texto do botão deve ser All", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const buttonResetPokemon = screen.getByRole("button", { name: /All/i });
    expect(buttonResetPokemon).toBeInTheDocument();
    expect(buttonResetPokemon.type).toBe("button");
  });

  test("A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={pokemonsMock}
        isPokemonFavoriteById={{ 25: false, 4: false }}
      />
    );

    const allButton = screen.getByText("All");
    fireEvent.click(allButton);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();

    // Verifica se todos os Pokémon estão sendo exibidos
    await screen.getByText(/Pikachu/i);

    const nextButton = screen.getByRole("button", { name: /próximo pokémon/i });
    fireEvent.click(nextButton);

    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });
  test("Ao carregar a página, o filtro selecionado deverá ser All", async () => {
    renderWithRouter(
      <Pokedex
        pokemons={pokemonsMock}
        isPokemonFavoriteById={{ 25: false, 4: false }}
      />
    );

    // O primeiro Pokémon mostrado deve ser o primeiro da lista completa
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });
});

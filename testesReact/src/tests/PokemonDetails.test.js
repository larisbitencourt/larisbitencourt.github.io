import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./utils/renderWithRouter";
import App from "../App";

describe("Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.", () => {
  test("A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const detailsHeading = await screen.findByRole("heading", {
      level: 2,
      name: /Pikachu Details/i,
    });
    expect(detailsHeading).toBeInTheDocument();
  });

  test("Não deve existir o link de navegação para os detalhes do Pokémon selecionado.", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const noLink = screen.queryByRole("link", { name: /More details/i });
    expect(noLink).not.toBeInTheDocument();
  });

  test("A seção de detalhes deve conter um heading h2 com o texto Summary.", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const summaryHeading = await screen.findByRole("heading", {
      level: 2,
      name: /Summary/i,
    });
    expect(summaryHeading).toBeInTheDocument();
  });

  test("A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const summary = await screen.findByText(/electricity/i);
    expect(summary).toBeInTheDocument();
  });
});

describe("Teste se existe na página uma seção com os mapas contendo as localizações do pokémon", () => {
  test("Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const locationsHeading = await screen.findByRole("heading", {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(locationsHeading).toBeInTheDocument();
  });

  test("Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const locationNames = await screen.findAllByText(
      /Kanto Viridian Forest|Kanto Power Plant/i
    );
    expect(locationNames.length).toBeGreaterThan(0);
  });

  test("Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    // Verifica pelo menos uma imagem e texto de localização
    const locationImages = await screen.findAllByRole("img", {
      name: /Pikachu location/i,
    });
    expect(locationImages.length).toBeGreaterThan(0);

    locationImages.forEach((img) => {
      expect(img).toHaveAttribute("src");
      expect(img).toHaveAttribute(
        "alt",
        expect.stringMatching(/Pikachu location/i)
      );
    });

    const locationText = await screen.findByText(/Kanto Viridian Forest/i);
    expect(locationText).toBeInTheDocument();
  });

 test("A imagem da localização deve ter um atributo src com a URL da localização;", async () => {
  renderWithRouter(<App />);

  const moreDetailsLink = await screen.findByRole("link", {
    name: /More details/i,
  });
  fireEvent.click(moreDetailsLink);

  const locationImages = await screen.findAllByRole("img", {
    name: /Pikachu location/i,
  });

  expect(locationImages.length).toBeGreaterThan(0);

  locationImages.forEach((img) => {
    expect(img).toHaveAttribute("src");
    expect(img.getAttribute("src")).toMatch(/^http/i);
  });
});


  test("A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const locationImages = await screen.findAllByRole("img", {
      name: /Pikachu location/i,
    });

    expect(locationImages.length).toBeGreaterThan(0);

    locationImages.forEach((img) => {
      expect(img).toHaveAttribute(
        "alt",
        expect.stringMatching(/(Pikachu location|location of Pikachu)/i)
      );
    });
  });
});

describe("Teste se o usuário pode favoritar um pokémon através da página de detalhes.", () => {
  test("A página deve exibir um checkbox que permite favoritar o Pokémon;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const favoriteCheckbox = await screen.findByRole("checkbox", {
      name: /Pokémon favoritado\?/i,
    });
    expect(favoriteCheckbox).toBeInTheDocument();
  });

  test("Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const favoriteCheckbox = await screen.findByRole("checkbox", {
      name: /Pokémon favoritado\?/i,
    });

    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();

    // Desmarca como favorito
    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).not.toBeChecked();
  });

  test("O label do checkbox deve conter o texto Pokémon favoritado?;", async () => {
    renderWithRouter(<App />);

    const moreDetailsLink = await screen.findByRole("link", {
      name: /More details/i,
    });
    fireEvent.click(moreDetailsLink);

    const label = screen.getByLabelText(/Pokémon favoritado\?/i);
    expect(label).toBeInTheDocument();
  });
});

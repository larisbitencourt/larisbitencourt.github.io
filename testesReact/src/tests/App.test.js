import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./utils/renderWithRouter";



test("renders a reading with the text `Pokédex`", () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test("deve renderizar os links corretamente", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const link1 = screen.getByText("Home");
  const link2 = screen.getByText("About");
  const link3 = screen.getByText("Favorite Pokémons");

  expect(link1).toBeInTheDocument();
  expect(link2).toBeInTheDocument();
  expect(link3).toBeInTheDocument();
});

test("aplicação direcionada para a página inicial, na URL /", async  () => {
  
  const { history } = renderWithRouter(<App />, { route: '/favorites' });
  
  const home = screen.getByText('Home');

  await userEvent.click(home);

  const pokedex = await screen.findByText(/Encountered pokémons/i);
  expect(pokedex).toBeInTheDocument();

});

test("aplicação redirecionada para a página About, na URL /about, ao clicar no link About", async () => {
  
  const { history } = renderWithRouter(<App />, { route: '/' });

  const about = screen.getByText('About');

  await userEvent.click(about);

  const aboutRoute = await screen.findByText(/About Pokédex/i);
  expect(aboutRoute).toBeInTheDocument();

});

test("aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons", async () => {
  
  const { history } = renderWithRouter(<App />, { route: '/favorites' });

  const favorites = screen.getByText('Favorite Pokémons');

  await userEvent.click(favorites);

  
  const favoriteRoute = await screen.findByText(/Favorite pokémons/i);
  expect(favoriteRoute).toBeInTheDocument();

});


test('aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
  const { history } = renderWithRouter(<App />);

    history.push('/url-que-nao-existe');

  
  const notFound = await screen.findByText(/Page requested not found 😭/i);
  expect(notFound).toBeInTheDocument();
});
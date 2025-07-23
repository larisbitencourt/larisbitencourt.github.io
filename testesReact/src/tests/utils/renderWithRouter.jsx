import * as React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';



export default function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  const rendered = render(
    <Router history={history}>
      {ui}
    </Router>
  );

  return {
    ...rendered,
    history,
  };
}


// retornar o histórico para navegar no teste
// simular o ambiente de roteamento de uma aplicação React
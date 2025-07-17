// Ponto de entrada da aplicação. Renderiza o componente raiz (App) dentro da página HTML.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'; // ajuda a aplicação a funcionar offline

ReactDOM.render  // pega o APP e "coloca" no DOM da página
(<App />, 
document.getElementById('root')); // acessa o index.html no public para assumir o controle, o arquivo tem que existir de forma estática sem alterações no bundler para o browser iniciar o app

serviceWorker.unregister();
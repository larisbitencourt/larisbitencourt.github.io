// Componente principal que organiza a estrutura da aplicação. Aqui ele insere o cabeçalho e a biblioteca de filmes (MovieLibrary), passando os dados iniciais.

import React from 'react';
import './App.css';
import Header from './components/Header';
import movies from './data';
import MovieLibrary from './components/MovieLibrary';


function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <MovieLibrary movies={ movies } /> 
        {/* a prop movies recebe o valor de movies importado do data */}

      </div>
    </div>
  );
}

export default App;
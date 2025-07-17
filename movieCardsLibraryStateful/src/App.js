import React from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import movies from './data';
import MovieLibrary from './components/MovieLibrary';


function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <MovieLibrary movies={ movies } />

      </div>
    </div>
  );
}

export default App;
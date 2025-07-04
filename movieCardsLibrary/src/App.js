import React from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import movies from './data';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <MovieList movies={ movies } /> 
        {/* recebe array de movies via props */}
      </div>
    </div>
  );
}

export default App;

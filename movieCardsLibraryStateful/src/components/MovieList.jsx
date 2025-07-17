// Componente que recebe uma lista de filmes (já filtrada) e cria um conjunto de cartões de filme para exibir na tela.

import React from "react";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";

class MovieList extends React.Component {
  render() {
    const { movies } = this.props; // prop passada pelo pai MovieLibrary

    return (
      // Para cada movie, renderiza um componente <MovieCard movie={movie} />
      <div className="movie-list" data-testid="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      storyline: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default MovieList;
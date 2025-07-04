// implement MovieList component here
import React from "react";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";

class MovieList extends React.Component {
  render() {
    const { movies } = this.props; // extrai a prop movies

    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} /> // cada filme renderiza um MovieCard, movie={movie} é uma propria criada a partir de movies
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

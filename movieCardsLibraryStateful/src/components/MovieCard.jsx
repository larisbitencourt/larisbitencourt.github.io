import React from "react";
import Rating from "./Rating";
import PropTypes from "prop-types";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props; // recebe uma prop que foi passada para ele
    const { title, subtitle, storyline, imagePath, rating } = movie;

    return (
      <section data-testid="movie-card" className="movie-card">
        <img
          className="movie-card-image"
          src={imagePath} // recebe o caminho da imagem
          alt={`Poster of ${title}`}
        />
        <div className="movie-card-body">
          <h4 className="movie-card-title" data-testid="movie-card-title">{title}</h4>
          <h5 className="movie-card-subtitle">{subtitle}</h5>
          <p className="movie-card-storyline">{storyline}</p>
        </div>
        <div className="movie-card-rating" >
          <Rating rating={movie.rating || 0} />   // 
          {/* se rating não existir, a nota é 0 */}
        </div>
      </section>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    storyline: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default MovieCard;

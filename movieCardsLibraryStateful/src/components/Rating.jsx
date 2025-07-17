// Componente simples que exibe a nota/avaliação de um filme, recebendo apenas um número e mostrando na interface.

import React from "react";
import PropTypes from "prop-types";

class Rating extends React.Component {
  render() {
    const { rating } = this.props; // recebe essa prop do pai

    return (
    <div data-testid="rating">
    <span className="rating">{rating}</span>
    </div>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
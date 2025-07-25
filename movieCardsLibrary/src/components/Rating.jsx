// implement Rating component here
import React from "react";
import PropTypes from "prop-types";

class Rating extends React.Component {
  render() {
    const { rating } = this.props; // extrai a prop rating de MOvieCard

    return <span className="rating">{rating}</span>; // exibe o valor de rating 
  }
}

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;

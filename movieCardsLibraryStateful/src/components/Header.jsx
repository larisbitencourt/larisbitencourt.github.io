import React from 'react';

// componente criado como uma classe que heda as funcionalidades de react.component

class Header extends React.Component { 
  render() {
    return (
      <header className="movie-card-header">
        <h1 className="page-title">Movie Cards Library</h1>
      </header>
    );
  }
}

export default Header;

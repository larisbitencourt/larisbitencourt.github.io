
import React from "react"; // para usar o React.Component
import "../App.css";

class Header extends React.Component { // header herda tudo que React.COmponent sabe fazer
  render() {
    return (
      <header className="movie-card-header">
        <h1 className="page-tittle">Movie Cards Library</h1>
      </header>
    );
  }
}

export default Header;


// React.COmponent fornece superopoderes de componente como:

// | Método / recurso      | O que faz                                           |
// | --------------------- | --------------------------------------------------- |
// | `render()`            | Obrigatório – define o que vai aparecer na tela.    |
// | `this.props`          | Acessa as props recebidas pelo componente.          |
// | `this.state`          | Armazena e controla o estado interno do componente. |
// | `componentDidMount()` | Roda código após o componente aparecer na tela.     |
// | `setState()`          | Atualiza o estado e faz o React re-renderizar.      |

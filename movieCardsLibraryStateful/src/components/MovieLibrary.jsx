// COmponente pai: Componente que gerencia o estado central dos filmes e filtros (busca, favoritos, gênero). Controla as funções que atualizam esses filtros e o array de filmes. Também é responsável por passar os dados filtrados para a lista de filmes e receber novos filmes adicionados.

import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";

class MovieLibrary extends React.Component {
  constructor(props) { // inicia o componente com as props recebidas
    super(props);
    this.state = { //estado inicial do componente
      searchText: "",
      bookmarkedOnly: false,
      selectedGenre: "",
      movies: props.movies,
    };
  }

  // manipuladores de eventos 

  handleSearchTextChange = (newText) => { // Atualiza searchText no estado quando o texto da busca muda.
    this.setState({ searchText: newText });
  };

  handleBookmarkedChange = (bookmarked) => { // Atualiza bookmarkedOnly no estado quando o checkbox de "favoritos" muda
    this.setState({ bookmarkedOnly: bookmarked });
  };

  handleSelectedGenreChange = (genre) => { // Atualiza o selectedGenre quando o usuário escolhe um gênero.
    this.setState({ selectedGenre: genre });
  };
   //this.setState (atualiza o estado): o this se refere ao contexto atual da classe, ou seja, altere a chave para o valor recebido ({chave: valor-recebido})

  // para adicionar um novo filme

  handleAddMovie = (newMovie) => {
    this.setState((prevState) => ({
      // recebe o estado anterior
      movies: [...prevState.movies, newMovie], // movies = novo estado. ...copia o que já tem na lista e adiciona o novo no final da lista
    }));
  };

  render() {
    const { movies, searchText, bookmarkedOnly, selectedGenre } = this.state; // extrai propriedades do state

    const filteredMovies = movies.filter((movie) => {
      const lowerSearchText = searchText.toLowerCase(); // texto da busca transformado em letras minusculas

      const matchText =
        searchText === "" || // se estiver vazio, aceita tudo
        movie.title.toLowerCase().includes(lowerSearchText) ||
        movie.subtitle.toLowerCase().includes(lowerSearchText) ||
        movie.storyline.toLowerCase().includes(lowerSearchText);
        // verifica se o texto digitado aparece em algum card

      const matchBookmarked = bookmarkedOnly ? movie.bookmarked === true : true;
      // se tiver marcado como favorito, passa só eles, se não permite todos

      const matchGenre = selectedGenre ? movie.genre === selectedGenre : true;
      //Se um gênero foi selecionado, só passa os filmes daquele gênero, se não, passa todos

      return matchText && matchBookmarked && matchGenre;
      // o filme será incluido apenas se passar nos 3 filtros
    });

    return (
      <div>
        {/* renderiza searchBar com o resultado dos filtros, passando o estado atual dos filtros como props e passa as funções que atualizam os filtros */}
        <SearchBar
          searchText={searchText}
          onSearchTextChange={this.handleSearchTextChange} // props passadas pelo pai MovieLibrary para SearchBar, que chama a função durante a iteração e o pai atualiza o estado
          bookmarkedOnly={bookmarkedOnly}
          onBookmarkedChange={this.handleBookmarkedChange}
          selectedGenre={selectedGenre}
          onSelectedGenreChange={this.handleSelectedGenreChange}
        />
        <MovieList movies={filteredMovies} /> 
        {/* Renderiza MovieList, passando só os filmes filtrados com base na busca, favoritos e gênero. */}
        <section className="add-movie-section"> 
        <AddMovie onClick={this.handleAddMovie} />
        {/* explicação detalhada lá em baixo*/}
        </section>
      </div>
    );
  }
}

export default MovieLibrary;

// quando faz <AddMovie onClick={this.handleAddMovie} /> está passando a função handleAddMovie para a prop onClick dentro de AddMovie, sendo assim quando o usuário clica em Adicionar filme, o onclick do componente filho AddMovie chama a handleClick que com this.props.onClick(this.state) chama a função que o pai passou (handleAddMovie) e passa o estado atual como argumento, redirecionando para handleAddMovie para criar a lista com o novo filme

// Esse é o padrão para comunicação filho → pai no React. O pai “passa” a função, o filho “chama” a função no momento certo, com os dados

// QUando passa uma função como valor de uma prop para um componente, essa prop passa a representar essa função dentro do componente filho.

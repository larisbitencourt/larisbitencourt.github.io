import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      bookmarkedOnly: false,
      selectedGenre: "",
      movies: props.movies,
    };
  }

  handleSearchTextChange = (newText) => {
    this.setState({ searchText: newText });
  };

  handleBookmarkedChange = (bookmarked) => {
    this.setState({ bookmarkedOnly: bookmarked });
  };

  handleSelectedGenreChange = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  // para adicionar um novo filme

  handleAddMovie = (newMovie) => {
    this.setState((prevState) => ({
      // recebe o estado anterior
      movies: [...prevState.movies, newMovie], // movies = novo estado. ...copia o que já tem na lista e adiciona o novo no final da lista
    }));
  };

  render() {
    const { movies, searchText, bookmarkedOnly, selectedGenre } = this.state;

    const filteredMovies = movies.filter((movie) => {
      const lowerSearchText = searchText.toLowerCase(); // texto da busca transformado em letras minusculas

      const matchText =
        searchText === "" || // se estiver vazio, aceita tudo
        movie.title.toLowerCase().includes(lowerSearchText) ||
        movie.subtitle.toLowerCase().includes(lowerSearchText) ||
        movie.storyline.toLowerCase().includes(lowerSearchText);

      const matchBookmarked = bookmarkedOnly ? movie.bookmarked === true : true;

      const matchGenre = selectedGenre ? movie.genre === selectedGenre : true;

      return matchText && matchBookmarked && matchGenre;
    });

    return (
      <div>
        <SearchBar
          searchText={searchText}
          onSearchTextChange={this.handleSearchTextChange}
          bookmarkedOnly={bookmarkedOnly}
          onBookmarkedChange={this.handleBookmarkedChange}
          selectedGenre={selectedGenre}
          onSelectedGenreChange={this.handleSelectedGenreChange}
        />
        <MovieList movies={filteredMovies} />
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

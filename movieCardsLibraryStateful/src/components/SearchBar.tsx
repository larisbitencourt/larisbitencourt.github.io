// apresenta os controles de filtro: campo de busca de texto, checkbox para mostrar só favoritos, e dropdown para seleção de gênero. Recebe funções para avisar o pai sobre mudanças nos filtros.

import React from 'react';

type SearchBarProps = { // o que as props devem receber 
  searchText: string;
  onSearchTextChange: (newText: string) => void; // função que recebe um novo texto e não retorna nada
  bookmarkedOnly: boolean;
  onBookmarkedChange: (bookmarked: boolean) => void;
  selectedGenre: string;
  onSelectedGenreChange: (genre: string) => void;
};

class SearchBar extends React.Component<SearchBarProps> {
  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchTextChange(event.target.value);
  };
  //  pega o valor do campo de texto e chama onSearchTextChange (prop) com o novo texto

  handleBookmarkedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onBookmarkedChange(event.target.checked);
  };

  // pega se o checkbox está marcado e chama onBookmarkedChange com esse valor booleano

  handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onSelectedGenreChange(event.target.value);
  };

  // pega o valor selecionado no select e chama onSelectedGenreChange com ele



  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.props; // Extrai as props que vão ser usadas para controlar os inputs do formulário.

    return (
      <section>
      <form data-testid="search-bar-form">
        <label  data-testid="text-input-label">
          Inclui o texto:
          <input
            data-testid="text-input"
            type="text"
            value={searchText}
            onChange={this.handleTextChange} //chama a função sempre que o valor mudar
          />
        </label>

        <label data-testid="checkbox-input-label">
          Mostrar somente favoritos
          <input
            data-testid="checkbox-input"
            type="checkbox"
            checked={bookmarkedOnly}
            onChange={this.handleBookmarkedChange}
          />
        </label>

        <label data-testid="select-input-label">
          Filtrar por gênero
          <select data-testid="select-input" value={selectedGenre} onChange={this.handleGenreChange}>
            <option data-testid="select-option" value="">Todos</option>
            <option data-testid="select-option" value="action">Ação</option>
            <option data-testid="select-option" value="comedy">Comédia</option>
            <option data-testid="select-option" value="thriller">Suspense</option>
          </select>
        </label>
        </form>
      </section>
    );
  }
}

export default SearchBar;

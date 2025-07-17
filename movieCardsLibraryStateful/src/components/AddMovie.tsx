import React from "react";

type AddMovieProps = {
  onClick: (newMovie: AddMovieState) => void;
};

type AddMovieState = {
  subtitle: string;
  title: string;
  imagePath: string;
  storyline: string;
  rating: number;
  genre: string;
};

const initialState: AddMovieState = {
  subtitle: "",
  title: "",
  imagePath: "",
  storyline: "",
  rating: 0,
  genre: "action",
};

class AddMovie extends React.Component<AddMovieProps, AddMovieState> {
  constructor(props: AddMovieProps) {
    super(props);
    this.state = initialState;
  
    // deveria ter o this.state {subtitle...title... } aqui com o inicial de cada chave, porém para ficar dinâmico fez ele na const initialState e atribuiu aqui, porque la no handleClick para resetar o botão precisaria colocar essas mesmas informações, sendo assim usa o initialState nas duas partes do código
  }

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target; // o target que disparou o evento, input, textarea, select, o value é o conteudo atual do campo
    this.setState({ [name]: name === "rating" ? Number(value) : value } as any);
     // converte rating para number, o setState atualiza o estado do objeto
     // [name] significa que a chave do objeto será o valor da variável name
     // as any evita o erro de tipo porque o TS não consegue garantir o tipo com o [name] por ele ser dinâmico
     // as any = "pode ser qualquer tipo"
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // evita o reload da página no submit do form
    this.props.onClick(this.state) // já esta usando aqui não precisa desestruturar no render
     this.setState(initialState); // reseta tudo

  
  } 

  render() {
   
    const { subtitle, title, imagePath, storyline, rating, genre } = this.state;

    return (
      <form data-testid="add-movie-form">
        <label data-testid="title-input-label">
          Título
          <input
            data-testid="title-input"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <label data-testid="subtitle-input-label">
          Subtítulo
          <input
            data-testid="subtitle-input"
            type="text"
            name="subtitle"
            value={subtitle}
            onChange={this.handleChange}
          />
        </label>

        <label data-testid="image-input-label">
          Imagem
          <input
            data-testid="image-input"
            type="text"
            name="imagePath"
            value={imagePath}
            onChange={this.handleChange}
          />
        </label>

        <label data-testid="storyline-input-label">
          Sinopse
          <textarea
            data-testid="storyline-input"
            name="storyline"
            value={storyline}
            onChange={this.handleChange}
          />
        </label>

        <label data-testid="rating-input-label">
          Avaliação
          <input
            data-testid="rating-input"
            type="number"
            name="rating"
            value={rating}
            onChange={this.handleChange}
          />
        </label>

        <label data-testid="genre-input-label">
          Gênero
          <select
            data-testid="genre-input"
            name="genre"
            value={genre}
            onChange={this.handleChange}
          >
            <option data-testid="genre-option" value="action">Ação</option>
            <option data-testid="genre-option" value="comedy">Comédia</option>
            <option data-testid="genre-option" value="thriller">Suspense</option>
          </select>
        </label>

        <button
          data-testid="send-button"
          type="button"
          onClick={this.handleClick}
        >
          Adicionar filme
        </button>
      </form>
    );
  }
}

export default AddMovie;


// this = o objeto que representa o componente atual.
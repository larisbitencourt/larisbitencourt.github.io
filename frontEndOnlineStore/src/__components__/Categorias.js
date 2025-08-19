import React, { useState } from 'react';
import './Categorias.css'

function Categorias({ categories, onCategorySelect }) { // recebe a props do App e callback para avisar mudança
  const [selected, setSelected] = useState(null); 
  // [variável guarda id, atualiza o estado]
  // guarda a categoria ao usuário clicar no rádio

  const handleChange = (id) => {
    setSelected(id);       // atualiza o estado local (radio selecionado)
    if (onCategorySelect) {
      onCategorySelect(id); // avisa o componente pai que a categoria mudou
    }
  };

  return (
    <div className="categories-container">
        <p>Categorias:</p>

        {/* devo colocar um useEffect com uma condicional em caso de erro, carregar o mock? */}
      {categories.map((category) => ( // para cada categoria renderiza um label
        <label key={category.id} className="category-label">
          <input
            type="radio"
            name="category"
            value={category.id}
            checked={selected === category.id} // se o select for igual ao id, o rádio aparece marcado
            onChange={() => handleChange(category.id)} // dispara handleChange quando o rádio é marcado
            className="category-radio"
            data-testid="category"
          />
          <span className="custom-radio" />   
          {category.name}
        </label>
      ))}
    </div> // esse span exibe o nome da categoria ao lado do radio, CSS
  );
}

export default Categorias;

import React, { useState } from 'react';

function Categorias({ categories }) { // recebe a props do App
  const [selected, setSelected] = useState(null); 
  // [variável guarda id, atualiza o estado]
  // guarda a categoria ao usuário clicar no rádio

  return (
    <div className="categories-container">
        <p>Categorias:</p>
      {categories.map((category) => ( // para cada categoria renderiza um label
        <label key={category.id} className="category-label">
          <input
            type="radio"
            name="category"
            value={category.id}
            checked={selected === category.id}
            onChange={() => setSelected(category.id)} // quando clica, atualiza o id 
            className="category-radio"
            data-testid="category"
          />
          <span className="custom-radio" />   
          {category.name}
        </label>
      ))}
    </div> // esse espan exibe o nome da categoria ao lado do radio, CSS
  );
}

export default Categorias;

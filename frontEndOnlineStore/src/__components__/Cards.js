import React, { useEffect } from "react";
import App from "../App";

function Cards() {

    const [image, setImage] = useState('');

    useEffect(() => {
      api
        .getProductsFromCategoryAndQuery(searchProducts)
    }, []);

  return (
   <section className="card-body">
     {.map((category) => ( // para cada categoria renderiza um label
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
    <h1>{title}</h1> // como pegar esse title?
    <img
    src="{image}" // pode passar uma importação
    alt="Imagem do produto"
    />
   <h2>{price}</h2>

   </section>
  );
}

export default Cards;

// requisito 5 voltar a partir dauqi 
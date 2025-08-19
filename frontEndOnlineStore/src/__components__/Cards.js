import React from 'react';
import { useHistory } from "react-router-dom";
import "./Cards.css";

// o componente home faz a chamada API, que gerencia o estado da busca e passa para Cards via props
// No React Router v5, navegação programática é feita com useHistory e não useNavigate (esse é v6)

function Cards({ products, carrinho, setCarrinho, handleAddToCart }) {
  const history = useHistory();

  if (!products || products.length === 0) {
    return <p>Nenhum produto foi encontrado</p>;
  }

  return (
    <section className="card-body cards-container">
      {products.map((product) => (
        <div
          key={product.id}
          className="card card-item"
          data-testid="product"
          onClick={() => history.push(`/detalhes/${product.id}`)}
        >
          <h1 className="card-title">{product.title}</h1>
          <img
            data-testid="product-detail-link"
            className="card-img"
            src={product.thumbnail || product.image} // Usa thumbnail (teste) ou image (Fake Store)
            alt={`Imagem de ${product.title}`}
            width={150}
          />
          <h2 className="card-price">{`R$ ${product.price}`}</h2>

          <button
            data-testid="product-add-to-cart"
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation(); // impede que o clique suba para a div
              // setCarrinho((prev) => [...prev, product]);
              handleAddToCart(product);
            }}
          >
            Adicionar ao carrinho
          </button>
        </div>
      ))}
    </section>
  );
}

// para cada produto, cria uma div com nome, imagem e preço

export default Cards;

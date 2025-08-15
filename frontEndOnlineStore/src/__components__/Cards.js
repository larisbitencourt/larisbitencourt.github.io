import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../services/api";
import Detalhes from "./Detalhes.js";
import Carrinho from "./Carrinho.js";

// o componente home faz a chamada API, que gerencia o estado da busca e passa para Cards via props
// No React Router v5, navegação programática é feita com useHistory e não useNavigate (esse é v6)

function Cards({ products, carrinho, setCarrinho }) {
  const history = useHistory();

  if (!products || products.length === 0) {
    return <p>Nenhum produto foi encontrado</p>;
  }

  return (
    <section className="card-body">
      {products.map((product) => (
        <div
          key={product.id}
          className="card"
          data-testid="product"
          onClick={() => history.push(`/detalhes/${product.id}`)}
        >
          <h1>{product.title}</h1>
          <img
            data-testid="product-detail-link"
            src={product.thumbnail || product.image} // Usa thumbnail (teste) ou image (Fake Store)
            alt={`Imagem de ${product.title}`}
            width={150}
          />
          <h2>{`R$ ${product.price}`}</h2>

          <button
            data-testid="product-add-to-cart"
            onClick={(e) => {
              e.stopPropagation(); // impede que o clique suba para a div
              setCarrinho((prev) => [...prev, product]);
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

// Antes no requisito 4:

// const [products, setProducts] = useState([]);

// useEffect(() => {
//   const fetchProducts = async () => {
//     const response = await api.getProductsFromCategoryAndQuery('', query); // nenhuma categoria, query: termo de busca digitado

//      if (response.results) {
//       setProducts(response.results); // para o teste
//     } else {
//       setProducts(response); // Fake Store API já retorna um array,  atualiza o estado com os produtos retornados
//     }
//   };

//   if (query) {
//     fetchProducts();  // so será chamada se query não for vazia
//   }
// }, [query]); // será executado sempre que o query mudar

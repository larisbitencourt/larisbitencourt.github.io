import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Categorias from "./Categorias";
import Cards from "./Cards";
import categoriesMock from "../__mocks__/categories";
import * as api from "../services/api";
import './Home.css'



function Home({ carrinho, setCarrinho, handleAddToCart }) {
  const [categories, setCategories] = useState([]); // [variável que guarda, função que atualiza o estado]
  const [query, setQuery] = useState(""); // [valor digitado]
  const [productsQuery, setProductsQuery] = useState([]); // [produtos retornados]
  const [selectedCategory, setSelectedCategory] = useState(""); // guardar a categoria escolhida e será usado junto com query para filtrar produtos.
  const [hasSearched, setHasSearched] = useState(false); // vou utilizar esse estado para definir "nenhum produto foi encontrado", quando clicar em uma categoria e buscar ao mesmo tempo algo que não "existe" naquela categoria

  // Hook de efeitos colaterais
  // Busca categorias só uma vez ao montar o componente com o [] - sem dependencias
  // Chama a API, quando a resposta chega (then), atualiza o estado
  useEffect(() => {
    api
      .getCategories()
      .then((cats) => setCategories(cats))
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
        setCategories(categoriesMock); // carrega o mock em caso de erro
      });
  }, []);

  const searchProduct = async () => {
    const response = await api.getProductsFromCategoryAndQuery(
      selectedCategory, // agora usa também a categoria selecionada > linka categoryId do api.js
      query // linka query do api.js
    );
    setProductsQuery(response.results || response); // atualiza os estados com os dados da API
    setHasSearched(true); // sinaliza que já fez a busca
  };

  return (
    <div className="search-container">
      <Categorias
        className="aside-category"
        categories={categories} // lista de categorias passada como props para Categorias ={categories} é o estado atualizado ou o mock
        onCategorySelect={(id) => {
          setSelectedCategory(id); // passa uma prop com a categoria escolhida, recebe o id e atualiza o estado com o id escolhido
          searchProduct(); // busca automaticamente quando muda a categoria
        }}
      />
      <input
        type="text"
        className="search-input"
        data-testid="query-input"
        value={query} // atribui que o que aparece no campo de texto é a query
        onChange={(e) => setQuery(e.target.value)} // pega o valor digitado e chama setQuery para atualizar query com esse valor
      />
      <button data-testid="query-button" onClick={searchProduct}>
        Buscar
      </button>

      <div data-testid="products">
        {!hasSearched ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : productsQuery.length === 0 ? (
          <p>Nenhum produto foi encontrado</p>
        ) : (
          <Cards
            products={productsQuery}
            carrinho={carrinho}
            setCarrinho={setCarrinho}
            handleAddToCart={handleAddToCart}
            
          /> // passando a prop products para Cards
        )}
      </div>

      <Link
        to="/carrinho" // redireciona para essa rota ao clicar no botão
        data-testid="shopping-cart-button"
        className="cart-icon"
      >
        🛒
      </Link>
    </div>
  );
}

export default Home;

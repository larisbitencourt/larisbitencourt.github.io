import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Carrinho from "./__components__/Carrinho";
import Categorias from "./__components__/Categorias";
import Cards from "./__components__/Cards";
import categoriesMock from "./__mocks__/categories";
import * as api from "./services/api";
import "./App.css";

function Home() {
  const [categories, setCategories] = useState([]); // [variável que guarda, função que atualiza o estado]
  const [query, setQuery] = useState(''); // [valor digitado]
  const [productsQuery, setProductsQuery] = useState([]); // [produtos retornados]
 
  // Hook de efeitos colaterais
  // Busca categorias só uma vez ao montar o componente com o [] - sem dependencias
  // Chama a API, quando a resposta chega (then), atualiza o estado

  useEffect(() => {
    api
      .getCategories()
      .then((cats) => setCategories(cats))
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
        setCategories(categoriesMock); // carrega o mock pem caso de erro
      });
  }, []);

  const searchProduct = async () => {
    const response = await api.getProductsFromCategoryAndQuery('', query); // inicia vazia para não buscar pela categoria
    setProductsQuery(response) // atualiza os estados com os dados da API
  };

  return (
    <div className="search-container">
      <Categorias
        className="aside-category"
        categories={categories} // lista de categorias passa como props para Categorias
      />
      <input
        type="text"
        className="search-input"
        data-testid="query-input"
      />
      <button data-testid="query-button"> onClick={searchProduct}Buscar</button>

       
       {/* entra aqui a lista de produtos */}

       <div data-testid="products">
        <Cards/>

       </div>

      <p data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</p>
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {/*  {/* Routes é da versão 6, usando a 5 tem que usar o Switch e component no lugar de element*/}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/carrinho" component={Carrinho} />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

// BrowserRouter: Ativa o roteamento da aplicação e monitora
// Switch garante uma rota por vez
// Route: Definne a rota - Quando a URL for /, mostra o Home.
export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Carrinho from "./__components__/Carrinho";
import Categorias from "./__components__/Categorias";
import Cards from "./__components__/Cards";
import Detalhes from "./__components__/Detalhes";
import categoriesMock from "./__mocks__/categories";
import * as api from "./services/api";
import "./App.css";

function Home({ carrinho, setCarrinho }) {
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

function App() {
  const [carrinho, setCarrinho] = useState([]); // precisa ficar em um componente que não será desmontado
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {/* Routes é da versão 6, usando a 5 tem que usar o Switch e component no lugar de element */}
          <Switch>
            <Route exact path="/">
              <Home carrinho={carrinho} setCarrinho={setCarrinho} />
            </Route>
            <Route exact path="/carrinho">
              <Carrinho carrinho={carrinho} />
            </Route>
            <Route exact path="/detalhes/:id">
              <Detalhes carrinho={carrinho} setCarrinho={setCarrinho} />
            </Route>
            {/* no componente Detalhes pode acessar a rota através do :id por causa do useParams, retornará o objeto com parâmetro id */}
          </Switch>
        </header>
      </div>
    </BrowserRouter>
   

  );
}

// Passar carrinho como props e receber como parâmetro, para compartilhar
// BrowserRouter: Ativa o roteamento da aplicação e monitora
// Switch garante uma rota por vez
// Route: Define a rota - Quando a URL for /, mostra o Home.
export default App;

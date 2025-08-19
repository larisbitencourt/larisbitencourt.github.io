import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./__components__/Home";
import Carrinho from "./__components__/Carrinho";
import Categorias from "./__components__/Categorias";
import Cards from "./__components__/Cards";
import Detalhes from "./__components__/Detalhes";
import categoriesMock from "./__mocks__/categories";
import * as api from "./services/api";
// import "./App.css";


function App() {
  const [carrinho, setCarrinho] = useState([]); // precisa ficar em um componente que não será desmontado


  const handleAddToCart = (product) => {
    setCarrinho((prevCarrinho) => {
      // verifica se o produto já está no carrinho
      const produtoExistente = prevCarrinho.find(
        (item) => item.id === product.id
      );

      if (produtoExistente) {
        // se existir, incrementa a quantidade
        return prevCarrinho.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
            : item
        );
      } else {
        // se não existir, adiciona o produto com quantity 1
        return [...prevCarrinho, { ...product, quantity: 1 }];
      }
    });
  };



  // Aumenta a quantidade de um produto
  const increaseQuantity = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Diminui a quantidade de um produto (não vai abaixo de 1)
  const decreaseQuantity = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove produto do carrinho
  const removeFromCart = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {/* Routes é da versão 6, usando a 5 tem que usar o Switch e component no lugar de element */}
          <Switch>
            <Route exact path="/">
              <Home carrinho={carrinho} setCarrinho={setCarrinho} handleAddToCart={handleAddToCart}/>
            </Route>
            <Route exact path="/carrinho">
              <Carrinho
                carrinho={carrinho}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
                handleAddToCart={handleAddToCart}
              />
            </Route>
            <Route exact path="/detalhes/:id">
              <Detalhes 
              carrinho={carrinho} 
              setCarrinho={setCarrinho}
              handleAddToCart={handleAddToCart}
               />
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

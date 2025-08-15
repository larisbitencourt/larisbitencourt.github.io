import React, { useState } from "react";

function Carrinho({ carrinho }) {
  if (carrinho.length === 0)
    return <p data-testid="shopping-cart-empty-message">O carrinho está vazio</p>;

  // Agrupa produtos iguais e adiciona a quantidade
  const produtosCarrinho = carrinho.reduce((acc, item) => {
    const exist = acc.find((i) => i.id === item.id);
    if (exist) {
      exist.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div>
      <ul>
        {produtosCarrinho.map((item) => (
          <li key={item.id}>
            <span data-testid="shopping-cart-product-name">{item.title}</span> - 
            R$ {item.price} - 
            <span data-testid="shopping-cart-product-quantity">
              {item.quantity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Carrinho;

import React, { useState } from "react";

function Carrinho({ carrinho, increaseQuantity, decreaseQuantity, removeFromCart }) {
  if (carrinho.length === 0)
    return <p data-testid="shopping-cart-empty-message">O carrinho está vazio</p>;

  // Agrupa produtos iguais e adiciona a quantidade
  // const produtosCarrinho = carrinho.reduce((acc, item) => {
  //   const exist = acc.find((i) => i.id === item.id); // procura se existe um produto com esse id
  //   if (exist) {
  //     exist.quantity += 1; // se existe, aumenta 1
  //   } else {
  //     acc.push({ ...item, quantity: 1 }); // se não existe, adiciona esse produto com o valor de 1
  //   }
  //   return acc;
  // }, []);

  const produtosCarrinho = carrinho;


  // somar total do carrinho

    const total = produtosCarrinho.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
            <div>
               <button
                data-testid="product-increase-quantity"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <button
                data-testid="product-remove"
                onClick={() => removeFromCart(item.id)}
              >
                X
              </button>

            </div>
          </li>
        ))}
      </ul>
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button data-testid="checkout-button">Finalizar Compra</button>
    </div>
  );
}

export default Carrinho;

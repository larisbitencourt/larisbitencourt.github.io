import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as api from "../services/api";

function Detalhes({ carrinho, setCarrinho }) {
  const { id } = useParams(); // pega o id do produto da URL
  const [product, setProduct] = useState(null); // estado para armazenar o produto atual

  useEffect(() => {
    async function fetchProduct() {
      const allProducts = await api.getProductsFromCategoryAndQuery(); // pega todos os produtos da API
      const productsArray = allProducts.results || allProducts; // garante array mesmo se vier results
      const found = productsArray.find((p) => p.id == id); // filtra pelo id
      setProduct(found); // salva no estado
    }
    fetchProduct();
  }, [id]); // roda sempre que o id muda

  if (!product) return <p>Carregando...</p>; // evita renderizar antes de ter o produto
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

  return (
    <div>
      <section className="card-product">
        <div
          key={product.id}
          className="card"
          data-testid="product-detail-link"
        >
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <img
            src={product.thumbnail || product.image}
            alt={`Imagem de ${product.title}`}
            width={150}
          />
          <h2>{`R$ ${product.price}`}</h2>
        </div>
      </section>

      <button
        data-testid="product-add-to-cart"
        onClick={() => handleAddToCart(product)}
      >
        Adicionar ao carrinho
      </button>

      <aside>
        <h1>Especificações Técnicas</h1>
        <ul>
          <li>Id: {product.id}</li>
          <li>Name: {product.title}</li>
          <li>Price: R$ {product.price}</li>
        </ul>
      </aside>

      <Link
        to="/carrinho"
        data-testid="shopping-cart-button"
        className="cart-icon"
      >
        🛒
      </Link>
    </div>
  );
}

export default Detalhes;

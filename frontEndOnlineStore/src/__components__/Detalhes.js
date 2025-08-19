import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import * as api from "../services/api";
import './Detalhes.css'

function Detalhes({ carrinho, setCarrinho, handleAddToCart }) {
  const { id } = useParams(); // pega o id do produto da URL

  
  const [product, setProduct] = useState(null); // estado para armazenar o produto atual
  const [rating, setRating] = useState(0); // nota do usuário (1 a 5)
  const [evaluation, setEvaluation] = useState(""); // comentário do usuário
  const [reviews, setReviews] = useState([]); // avaliações totais do produto

  // Buscar produto ao montar o componente
  useEffect(() => {
    async function fetchProduct() {
      const allProducts = await api.getProductsFromCategoryAndQuery(); // pega todos os produtos da API
      const productsArray = allProducts.results || allProducts; // garante array mesmo se vier results
      const found = productsArray.find((p) => p.id == id); // filtra pelo id
      setProduct(found); // salva no estado
    }
    fetchProduct();
  }, [id]); // roda sempre que o id muda

  // Ver se já tem alguma avaliação desse produto
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);
  }, [id]);

  // Função para enviar avaliação
  const handleSubmitReview = (e) => {
    e.preventDefault(); // evita que recarregue a página 
    const newReview = { rating, comment: evaluation }; // cria o objeto com a nota e o comentário
    const updatedReviews = [...reviews, newReview]; // novo array com todas as avaliações existentes
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews)); // salva no localStorage usando o id, stringfy transforma o array em string para o localStorage
    setEvaluation(""); // limpa comentário
    setRating(0); // limpa nota
  };

  if (!product) return <p>Carregando...</p>; // evita renderizar antes de ter o produto

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

      {/* Botão para adicionar ao carrinho */}
      <button
        data-testid="product-detail-add-to-cart"
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

      {/*Formulário de avaliação com estrelas, ao ser enviado chama a função*/}
      <form onSubmit={handleSubmitReview}>
        {/* Estrelas clicáveis */}
        <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
          {[1, 2, 3, 4, 5].map((star) => ( // cria um componente FaStar para cada número
            <FaStar
              key={star}
              size={30}
              color={star <= rating ? "#ffc107" : "#e4e5e9"} // amarelo se selecionada, cinza se não
              onClick={() => setRating(star)} // define a nota ao clicar
              style={{ cursor: "pointer" }}
              data-testid={`star-${star}`} 
            />
          ))}
        </div>

        {/* Campo de comentário */}
        <textarea
          data-testid="product-detail-evaluation"
          value={evaluation} // esse estado controla o campo
          onChange={(e) => setEvaluation(e.target.value)} // atualiza o estado conforme digita
          placeholder="Escreva seu comentário (opcional)"
        />

        <button type="submit">Enviar avaliação</button>
      </form>

      {/* Exibir avaliações existentes */}
      <div>
        <h3>Avaliações:</h3>
        {reviews.length === 0 ? (
          <p>Nenhuma avaliação ainda.</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index}>
              <p>Nota: {r.rating}</p>
              {r.comment && <p>Comentário: {r.comment}</p>}
            </div>
          ))
        )}
      </div>

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

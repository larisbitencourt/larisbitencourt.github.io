import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Navegar nas páginas usando o v5, o react v6 usa o navigate
import PropTypes from "prop-types"; // Validar as props ue o componente recebe

export default function Checkout({ cartItems, clearCart }) {
  const history = useHistory(); // Cria uma instância do history, que permite navegar para outra rota

  const [formData, setFormData] = useState({
    // Armazenar dados do formulário
    fullname: "",
    email: "",
    cpf: "",
    phone: "",
    cep: "",
    address: "",
    payment: "",
  });

  const [errors, setErrors] = useState([]); // Estado para campos faltando ou inválidos

  // Calcula o total do pedido

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  // Chama sempre que um input muda, pega nome e valor do campo e atualiza apenas os campos alterados

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); ///
  };

  // Valida campos obrigatórios, filter cria um array 'missing' com os campos vazios

  const validateForm = () => {
    const requiredFields = [
      "fullname",
      "email",
      "cpf",
      "phone",
      "cep",
      "address",
      "payment",
    ];
    const missing = requiredFields.filter(
      (field) => !formData[field]?.trim() ////
    );
    setErrors(missing);
    return missing.length === 0;
  }; // Retorna true se não tiver campos faltando

  // Chamada ao clicar em "Finalizar Compra"

  const handleSubmit = () => {
    if (validateForm()) {
      clearCart();
      history.push("/"); // navega para a página inicial
    }
  }; /// e se não???

  // Testando Tailwind CSS

  return (
    <div>
      <h1>Finalizar Compra</h1>

      {/* Resumo da compra */}
      <div>
        <h2>Resumo do Pedido</h2>
        <ul data-testid="checkout-products">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} - R$ {item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p>Total: R$ {total.toFixed(2)}</p>
      </div>

      {/* Formulário */}
      <form>
        <input
          name="fullname" // Atualiza o estado dinâmicamente /////
          placeholder="Nome completo"
          data-testid="checkout-fullname"
          value={formData.fullname} // Valor controlado pelo estado ///
          onChange={handleChange} // Atualiza o estado ao digitar
        />
        <input
          name="email"
          placeholder="Email"
          data-testid="checkout-email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="cpf"
          placeholder="CPF"
          data-testid="checkout-cpf"
          value={formData.cpf}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Telefone"
          data-testid="checkout-phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="cep"
          placeholder="CEP"
          data-testid="checkout-cep"
          value={formData.cep}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Endereço"
          data-testid="checkout-address"
          value={formData.address}
          onChange={handleChange}
        />

        {/* Pagamento */}
        <div>
          <h3>Método de pagamento</h3>
          <label>
            <input
              type="radio"
              name="payment"
              value="boleto"
              checked={formData.payment === "boleto"} // Garante que apenas um esteja selecionado
              onChange={handleChange}
            />
            Boleto
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cartao"
              checked={formData.payment === "cartao"}
              onChange={handleChange}
            />
            Cartão de crédito
          </label>
        </div>
      </form>

      <button onClick={handleSubmit}>Comprar</button>
    </div>
  );
}

// PropTypes
Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  clearCart: PropTypes.func.isRequired,
};

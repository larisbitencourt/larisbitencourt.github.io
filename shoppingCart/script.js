// FUNCÃO DO PROJETO
function createProductImageElement(imageSource) {
  const img = document.createElement("img");
  img.className = "item__image";
  img.src = imageSource; // .src = imagem será o parametro
  return img;
}

// FUNCÃO DO PROJETO - criar elementos com classe e texto de forma reutilizável
function createCustomElement(element, className, innerText) {
  // element é o tipo da tag (span, button etc)
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// FUNCÃO DO PROJETO - produtos da API

function createProductItemElement({ id: sku, title: name, image }) {
  // console.log(sku, name, image);
  const section = document.createElement("section");
  section.className = "item";
  section.appendChild(createCustomElement("span", "item__sku", sku)); // tipo da tag, classe, texto - identificar produto clicado pelo id e colocar no span (carrinho)
  section.appendChild(createCustomElement("span", "item__title", name)); // cria outra span  com o name
  section.appendChild(createProductImageElement(image)); // chama a imagem do produto src vem da API
  section.appendChild(
    createCustomElement("button", "item__add", "Adicionar ao carrinho!")
  ); // botão para adicionar ao carrinho
  return section;

  // chama a função dentro do  appendChild que add o retorno dentro de section
}

const itensDoCarrinhoDOM = ".cart__items"; // atribuindo a classe cart_itens a uma constante para usar uma vez só

const salvarNoLocalStorage = () => {
  // salvar itens no carrinho no localStorage
  const carrinho = document.querySelector(itensDoCarrinhoDOM); // seleciona elemento do carrinho (ol)
  localStorage.setItem("itensCarrinho", carrinho.innerHTML); // Adiciona todo o html do ol no localStorage
};

// Pegar a lista salva e coloca dentro de .cart__items para que ao atualizar mantenha o carrinho

function carregarLocalStorage() {
  document.querySelector(itensDoCarrinhoDOM).innerHTML =
    localStorage.getItem("itensCarrinho");
  carrinho.innerHTML = ""; // Limpa antes de adicionar
}

// FUNCÃO DO PROJETO, nao imagino pra que seja???
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// função para exibir o valor total do carrinho

async function exibirValorTotalDocarrinho(valorTotalSomado) {
  document.querySelector(".total-price").innerText = // Captura o endereço onde o valor será colocado
    valorTotalSomado; // Insere o valor no span indicado
  // console.log(valorTotalSomado);
}
//

async function somarItensDocarrinho() {
  const nodeListDeProdutos = document.querySelectorAll(".cart__items li"); // nodeList com produtos do carrinho
  let valorTotalDoCarrinho = 0; // valor inicial do produto
  nodeListDeProdutos.forEach((produto) => {
    valorTotalDoCarrinho += parseFloat(produto.innerText.split("$")[1]); // divide a string "SKU: 123 | NAME: Camiseta | PRICE: $45.99" em um array com $, pega o segundo item que é o preço e transforma em número decimal para poder somar
  });

  exibirValorTotalDocarrinho(valorTotalDoCarrinho);
}

// FUNCÃO DO PROJETO - Remove o item ao clicar no produto dentro do carrinho
function cartItemClickListener(event) {
  event.target.remove(); // Remove o item clicado
  salvarNoLocalStorage(); // Salva no local Storage
  somarItensDocarrinho(); // Atualiza a soma do carrinho
}

function adicionarEventoAosItensDoCarrinho() {
  const itensDoCarrinho = document.querySelectorAll(".cart__items li"); // pega os elementos da lista
  itensDoCarrinho.forEach((item) => {
    item.addEventListener("click", cartItemClickListener);
  }); // adiciona evento a todos os elementos
}

// FUNCÃO DO PROJETO - Cria o item

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const ol = document.querySelector(".cart__items");
  const li = document.createElement("li"); // cada produto
  li.className = "cart__item";
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener("click", cartItemClickListener);
  ol.appendChild(li);
  return li;
}

function esvaziarCarrinho() {
  document.querySelector(".cart__items").innerHTML = ""; // anula o HTML dos itens (mesmo efeito de remover)
  salvarNoLocalStorage();
  somarItensDocarrinho();
}

async function AdicionarProdutoNoCarrinho(produtoid) {
  const id = await produtoid.target.parentNode.firstChild.innerText; // pega o id do produto clicado, firstchild é o "span:id"
  const data = await fetch(`https://fakestoreapi.com/products/${id}`); // consulta o id na api
  const response = await data.json(); // transforma a requisção no formato json()
  document
    .querySelector(itensDoCarrinhoDOM)
    .appendChild(createCartItemElement(response)); // Adiciona o produto no carrinho
  salvarNoLocalStorage();
  somarItensDocarrinho();
  console.log(response);
}

// Adiciona os produtos e os eventos dos produtos
const listarProdutos = (data) => {
  const sectionItens = document.querySelector("section.items"); // Captura o endereço do section.items no html
  data.forEach((result, index) => {
    // HOF pra adicionar o evento a todos os elementos listados
    sectionItens.appendChild(
      //
      createProductItemElement(result) // cria a estrutura
    );
    document
      .querySelectorAll(".item__add")
      [index] // seleciona os botoes addcarrinho
      .addEventListener("click", AdicionarProdutoNoCarrinho); // Adiciona o evento no botão clicar em cada produto
  });
};

// REQUISIÇÃO DA API DO MERCADO LIVRE
async function pesquisarProduto() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Erro na requisição: " + response.status); // da o status do erro
    const listaDeProdutos = await response.json();

    const loading = document.querySelector("span.loading");
    if (loading) loading.remove();

    listarProdutos(listaDeProdutos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

pesquisarProduto(); // chama a função de requisitar a lista de produtos

// Funções carregadas quando a página é carregada
window.onload = function onload() {
  carregarLocalStorage(); // carrega o local storage
  somarItensDocarrinho();
  adicionarEventoAosItensDoCarrinho(); // Adiciona os eventos ao carrinho assim que a página é carregada
  document
    .querySelector(".empty-cart")
    .addEventListener("click", esvaziarCarrinho); // Adiciona o evento ao botão de esvaziar o carrinho
  pesquisarProduto();
};

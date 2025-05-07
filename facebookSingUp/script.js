
document.addEventListener("DOMContentLoaded", function () {
  const buttonLogin = document.getElementById("button-login");
  const emailPhoneInput = document.getElementById("user-email-phone");

  buttonLogin.addEventListener("click", function () {
    const emailPhoneValue = emailPhoneInput.value.trim();
    alert(emailPhoneValue || "Por favor, insira um email ou telefone.");
  });  
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form"); // para que o script carregue depois do html todo carregado

  const campoAdicional = document.getElementById("campoAdicional");
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  const errorMessage = document.getElementById("error-message");

  // Mostrar campo adicional se "personalizado" for selecionado
  genderRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      campoAdicional.style.display = radio.value === "personalizado" ? "block" : "none";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede envio do formulário

    const firstName = document.getElementById("first-name").value.trim(); //remove os espaços caso alguem digite espaço
    const lastName = document.getElementById("last-name").value.trim();
    const phoneEmail = document.getElementById("phone-email").value.trim();
    const password = document.getElementById("password-id").value.trim();
    const birthdate = document.querySelector('input[name="birthdate"]').value.trim();
    const generoSelecionado = document.querySelector('input[name="gender"]:checked'); // á retorna diretamente o input que está marcado (ou null se nenhum estiver), se for null significa que nenhum genero foi selecionado
    let genero = generoSelecionado ? generoSelecionado.value : "";

    if (genero === "personalizado") {
      const generoCustom = document.getElementById("generoCustom").value.trim();
      genero = generoCustom || "Personalizado";
    }

    if (!firstName || !lastName || !phoneEmail || !password || !birthdate || !genero) {
      errorMessage.style.display = "block";
      return;
    } else {
      errorMessage.style.display = "none";
    }

    const saudacao = `Olá, ${firstName} ${lastName}`;
    // Substituir conteúdo se estiver tudo preenchido
    const novoHtml = `
      <h2>${saudacao}</h2>
      <p>Nome: ${firstName}</p>
      <p>Sobrenome: ${lastName}</p>
      <p>Celular ou Email: ${phoneEmail}</p>
      <p>Senha: ${password}</p>
      <p>Data de nascimento: ${birthdate}</p>
      <p>Gênero: ${genero}</p>
    `;

    const container = document.getElementsByClassName("right-content")[0];
    container.innerHTML = novoHtml;
  });
});



















// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form"); /

//   const campoAdicional = document.getElementById("campoAdicional");
//   const genderRadios = document.querySelectorAll('input[name="gender"]');

//   const errorMessage = document.getElementById("error-message");

//   // Mostrar/esconder campo adicional conforme seleção
//   genderRadios.forEach((radio) => {
//     radio.addEventListener("change", () => {
//       if (radio.value === "personalizado") {
//         campoAdicional.style.display = "block";
//       } else {
//         campoAdicional.style.display = "none";
//       }
//     });
//   });

//   form.addEventListener("submit", function (e) {

//     e.preventDefault();
//     // quando o formulário for enviado ele executa essa função, o "e" é o evento do envio
//     const firstName = document.getElementById("first-name").value.trim(); //remove os espaços caso alguem digite espaço
//     const lastName = document.getElementById("last-name").value.trim();
//     const phoneEmail = document.getElementById("phone-email").value.trim();
//     const password = document.getElementById("password-id").value.trim();
//     const birthdate = document.getElementById("label-birthdate").value.trim();
//     const genderInputs = document.querySelectorAll('input[name="gender"]'); // coloca os inputs de radio dentro da variável
//     const errorMessage = document.getElementById("error-message");

//     let genderSelected = false;
//     genderInputs.forEach((input) => {
//       if (input.checked) {
//         genderSelected = true;
//       }
//     }); //percorre gender e verifica se algum está marcado

//     if (
//       !firstName ||
//       !lastName ||
//       !phoneEmail ||
//       !password ||
//       !birthdate ||
//       !genderSelected
//     ) {
//       e.preventDefault(); // impede o envio do formuário (compportamento padrão de um evento)
//       errorMessage.style.display = "block";
//     } else {
//       errorMessage.style.display = "none"; // esconde a mensagem caso tudo esteja preenchido
//     }
//   });
// });

// //false = undefined, null ou false
// //se o campo tiver vazio ele retorna "" que é falsy, !transforma em true para o if entrar, ! é true se estiver vazio!

// function substituirRightContent(e) {
//   e.preventDefault();
//   // Obter dados do formulário
//   const nome = document.getElementById('first-name').value;
//   const sobrenome = document.getElementById('last-name').value;
//   const phoneEmail = document.getElementById('phone-email').value;
//   const password = document.getElementById('password-id').value;
//   const dataNascimento = document.getElementById('label-birthdate').value;
//   const genero = document.querySelector('input[name="gender"]:checked')?.value || '';

//   if (genero === "personalizado") {
//     const generoCustom = document.getElementById("generoCustom").value.trim();
//     genero = generoCustom || "Personalizado";
//   }


//   // 2. Criar novo HTML
//   const novoHtml = `
//     <h2>Dados do Formulário</h2>
//     <p>Nome: ${nome}</p>
//      <p>Sobrenome: ${sobrenome}</p>
//       <p>Phone ou email: ${phoneEmail}</p>
//        <p>Senha: ${password}</p>
//         <p>Data de nascimento: ${dataNascimento}</p>
//          <p>Gênero: ${genero}</p>
  

//   `;

//   // 3. Substituir conteúdo do container
//   const container = document.getElementsByClassName('right-content')[0];
//   container.innerHTML = novoHtml;
// }

// // Adicionar um evento de clique para chamar a função
// document.getElementById('facebook-register').addEventListener('click', substituirRightContent);

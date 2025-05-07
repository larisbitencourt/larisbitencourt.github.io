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
    const radioGenero = document.getElementById("radio-genero").value;

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
      <p>Celular ou Email: ${phoneEmail}</p>
      <p>Data de nascimento: ${birthdate}</p>
      <p>Gênero: ${radioGenero}</p>
    `;

    const container = document.getElementsByClassName("right-content")[0];
    container.innerHTML = novoHtml;
  });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form'); // para que o script carregue depois do html todo carregado
  
    form.addEventListener('submit', function (e) {  // quando o formulário for enviado ele executa essa função, o "e" é o evento do envio
      const firstName = document.getElementById('first-name').value.trim(); //remove os espaços caso alguem digite espaço
      const lastName = document.getElementById('last-name').value.trim();
      const phoneEmail = document.getElementById('phone-email').value.trim();
      const password = document.getElementById('password-id').value.trim();
      const birthdate = document.getElementById('label-bithdate').value.trim();
      const genderInputs = document.querySelectorAll('input[name="gender"]'); // coloca os inputs de radio dentro da variável
      const errorMessage = document.getElementById('error-message');
  
      let genderSelected = false;
      genderInputs.forEach(input => {
        if (input.checked) {
          genderSelected = true;
        }
      }); //percorre gender e verifica se algum está marcado
  
      if (!firstName || !lastName || !phoneEmail || !password || !birthdate || !genderSelected) {
        e.preventDefault(); // impede o envio do formuário (compportamento padrão de um evento)
        errorMessage.style.display = 'block';
      } else {
        errorMessage.style.display = 'none'; // esconde a mensagem caso tudo esteja preenchido
      }
    });
  });
  
  //false = undefined, null ou false
  //se o campo tiver vazio ele retorna "" que é falsy, !transforma em true para o if entrar, ! é true se estiver vazio!
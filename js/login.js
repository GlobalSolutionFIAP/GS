document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById("iptCpf");
    const senhaInput = document.getElementById("iptSenha");
    const loginButton = document.querySelector("button");

    // Criação de elementos de mensagens de erro
    const erroCpf = document.createElement('p');
    const erroSenha = document.createElement('p');

    // Adiciona a classe de erro e as mensagens de erro
    erroCpf.classList.add('error-message');
    erroSenha.classList.add('error-message');

    cpfInput.after(erroCpf);
    senhaInput.after(erroSenha);

    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não for dígito
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0, resto;

        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Função para limpar erros visuais
    function limparErros() {
        cpfInput.classList.remove('invalid');
        senhaInput.classList.remove('invalid');
        erroCpf.style.display = 'none';
        erroSenha.style.display = 'none';
    }

    // Validação ao clicar no botão de login
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const cpf = cpfInput.value.trim();
        const senha = senhaInput.value.trim();

        let formValido = true;
        limparErros();

        if (!validarCPF(cpf)) {
            erroCpf.textContent = "CPF inválido.";
            erroCpf.style.display = 'block';
            cpfInput.classList.add('invalid');
            formValido = false;
        }

        if (senha.length === 0) {
            erroSenha.textContent = "Por favor, insira sua senha.";
            erroSenha.style.display = 'block';
            senhaInput.classList.add('invalid');
            formValido = false;
        }

        // Se o formulário for válido, redireciona
        if (formValido) {
            alert("Login bem-sucedido!");
            window.location.href = "index.html"; // Substitua pela página de destino após login
        }
    });
});

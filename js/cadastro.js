document.addEventListener("DOMContentLoaded", function () {
    const nomeInput = document.getElementById("iptNome");
    const cpfInput = document.getElementById("iptCpf");
    const emailInput = document.getElementById("iptEmail");
    const senhaInput = document.getElementById("iptSenha");
    const confirmarSenhaInput = document.getElementById("iptConfirmar");
    const cadastrarButton = document.querySelector("button");

    // Criação de elementos de mensagens de erro
    const erroNome = document.createElement('p');
    const erroCpf = document.createElement('p');
    const erroEmail = document.createElement('p');
    const erroSenha = document.createElement('p');
    const erroConfirmarSenha = document.createElement('p');

    // Adiciona a classe de erro e as mensagens de erro
    erroNome.classList.add('error-message');
    erroCpf.classList.add('error-message');
    erroEmail.classList.add('error-message');
    erroSenha.classList.add('error-message');
    erroConfirmarSenha.classList.add('error-message');

    nomeInput.after(erroNome);
    cpfInput.after(erroCpf);
    emailInput.after(erroEmail);
    senhaInput.after(erroSenha);
    confirmarSenhaInput.after(erroConfirmarSenha);

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

    // Função para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para validar nome
    function validarNome(nome) {
        return nome.length > 2;
    }

    // Função para limpar erros visuais
    function limparErros() {
        [nomeInput, cpfInput, emailInput, senhaInput, confirmarSenhaInput].forEach(input => input.classList.remove('invalid'));
        [erroNome, erroCpf, erroEmail, erroSenha, erroConfirmarSenha].forEach(erro => erro.style.display = 'none');
    }

    // Validação ao clicar no botão de cadastro
    cadastrarButton.addEventListener("click", function (event) {
        event.preventDefault();

        const nome = nomeInput.value.trim();
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;

        let formValido = true;
        limparErros();

        if (!validarNome(nome)) {
            erroNome.textContent = "O nome deve ter pelo menos 3 caracteres.";
            erroNome.style.display = 'block';
            nomeInput.classList.add('invalid');
            formValido = false;
        }

        if (!validarCPF(cpf)) {
            erroCpf.textContent = "CPF inválido.";
            erroCpf.style.display = 'block';
            cpfInput.classList.add('invalid');
            formValido = false;
        }

        if (!validarEmail(email)) {
            erroEmail.textContent = "Email inválido.";
            erroEmail.style.display = 'block';
            emailInput.classList.add('invalid');
            formValido = false;
        }

        if (senha.length < 6) {
            erroSenha.textContent = "A senha deve ter pelo menos 6 caracteres.";
            erroSenha.style.display = 'block';
            senhaInput.classList.add('invalid');
            formValido = false;
        }

        if (senha !== confirmarSenha) {
            erroConfirmarSenha.textContent = "As senhas não coincidem.";
            erroConfirmarSenha.style.display = 'block';
            confirmarSenhaInput.classList.add('invalid');
            formValido = false;
        }

        // Se o formulário for válido, redireciona
        if (formValido) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        }
    });
});

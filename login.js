document.getElementById("btnLogin").addEventListener("click", function () {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const mensagemLogin = document.getElementById("mensagemLogin");

    if (usuario === "admin" && senha === "1234") {
        mensagemLogin.textContent = "Login realizado com sucesso!";
        mensagemLogin.style.color = "green";

        // Redireciona para a página de cadastro
        window.location.href = "cadastro.html";
    } else {
        mensagemLogin.textContent = "Usuário ou senha incorretos.";
        mensagemLogin.style.color = "red";
    }
});

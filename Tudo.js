Códigos 

Pasta frontEnd

login.html

<!DOCTYPE html>

<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<title>Login Sistema de Contatos</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

<header>

<h1>Sistema de Contatos</h1>

</header>

<div id="login">

<h2>Login</h2>

<input type="text" id="usuario" placeholder="Usuário">

<input type="password" id="senha" placeholder="Senha">

<button id="btnLogin">Entrar</button>

<p id="mensagemLogin"></p>

</div>

<script src="login.js"></script>

</body>

</html>




cadastro.html

<!DOCTYPE html>

<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<title>Cadastro Sistema de Contatos</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

<header>

<h1>Sistema de Contatos</h1>

</header>

<div id="cadastro">

<h2>Cadastro de Contatos</h2>

<input type="text" id="nome" placeholder="Nome">
<input type="text" id="telefone" placeholder="Telefone">

<input type="email" id="email" placeholder="E-mail">

<button id="btnCadastrar">Adicionar</button>

<h3>Lista de Contatos</h3>

<ul id="listaContatos"></ul>

</div>

<script src="cadastro.js"></script>

</body>

</html>


login.js

document.getElementById("btnLogin").addEventListener("click", function() {

const usuario document.getElementById("usuario").value;

const senha document.getElementById("senha").value;

const mensagemLogin document.getElementById("mensagemLogin");

if (usuario "admin" && senha === "1234") {

mensagemLogin.textContent "Login realizado com sucesso!";

mensagemLogin.style.color = "green";

// Redireciona para a página de cadastro

window.location.href = "cadastro.html";

} else {

mensagemLogin.textContent "Usuario ou senha incorretos.";

mensagemLogin.style.color "red";

}

});



cadastro.js

const API_BASE = "http://localhost:3000";

async function carregarContatos() {

try {

const res await fetch('$`{API_BASE}/contatos");

if (!res.ok) throw new Error("Erro ao buscar contatos");

const contatos await res.json();

const lista document.getElementById("listaContatos");

lista.innerHTML = "";

contatos.forEach(c => {

const li document.createElement("li");

li.innerHTML =

<strong>Nome:</strong> `${c.nome}<br>

<strong>Telefone:</strong> $`{c.telefone || "-"}<br>

<strong>Email:</strong> `${c.email || "-"}

lista.appendChild(li);

});

} catch (err) {

console.error(err);
alert("Não foi possível carregar contatos.");

document.getElementById("btnCadastrar").addEventListener("click", async () => {

const nome document.getElementById("nome").value.trim();

Const telefone document.getElementById("telefone").value.trim();

const email document.getElementById("email").value.trim();

if (!nome) {

} alert("Preencha o nome."); return;

vtry {

const res await fetch(${API_BASE}/contatos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nome, telefone, email }) });

if (Ires.ok) {

} const errBody = await res.json().catch(() => ({})); throw new Error(errBody.mensagem || "Erro ao cadastrar");

const data await res.json();

alert(data.mensagem);

// limpar campos

document.getElementById("nome").value = "";

document.getElementById("telefone").value = "";

document.getElementById("email").value = "";

// recarregar lista

carregarContatos();

} catch (err) {

console.error("Erro no front-end:", err);

alert("Erro ao comunicar com o servidor.");

}

});

window.addEventListener("load", carregarContatos);





Pasta backEnd
serve.js

const express = require("express");

const mysql require("mysql2");

const cors require("cors");

const path = require("path");

const app express();

const port = 3000;
app.use (express.json());

app.use(cors());

app.use(express.static(path.join(_dirname, "../frontend")));

const db mysql.createConnection({

host: "localhost",

user: "emmers",

// ajuste para seu usuário MySQL

password: "1234", // ajuste para sua senha

database: "sistema_contatos",

port: 3306

});

db.connect(err => {

if (err) {

}

console.error("Erro na conexão com MySQL:", err);

process.exit(1);

console.log("Conectado ao MySQL!");

});

app.post("/contatos", (req, res) => {

const { nome, telefone, email req.body;

if (!nome) {

}

return res.status(400).json({ mensagem: "Campo 'nome é obrigatório"});

const sql "INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)";

db.query(sql, [nome, telefone || null, email || null], (err, result) => {

if (err) {

console.error("Erro na query:", err);

return res.status(500).json({ mensagem: "Erro ao cadastrar" });

});

} res.status(201).json({ mensagem: "Contato cadastrado com sucesso!", id: result.insertId

});

});

app.get("/contatos", (req, res) => {

db.query("SELECT FROM contatos ORDER BY id DESC", (err, results) => {

if (err) {

console.error("Erro ao listar:", err);

return res.status (500).json({ mensagem: "Erro ao listar" });

}

res.json(results);

});

});

app.listen(port, () => console.log('Servidor rodando em http://localhost:${port}"));




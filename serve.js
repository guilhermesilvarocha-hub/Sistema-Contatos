const express = require ("express");
const mysql = require ("msql"):
const cors = require ("cors");
const path = require ("path");

const app = express ();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend")));

const db = mysql.createConnection({
  host: "localhost",
  user: "emmers",
  password: "1234",
  database: "sistemas_contatos",
  port: 3306
});

db.connect (err => {
  if (err) {
    console.error("Erro na conexão com MySQL:", err);
    process.exit(1);

  }

  console.log("Conectado ao MySQL");
});

app.post ("/contatos", (req, res) => {
  const {nome, telefone, emaill} = req.body;
  if(!nome) {
    return res.status(400).json({mensagem: "campo 'nome' é obrigatorio"});
  }
  const sql = "INSERT INTO contatos (nome, telefone, emaill) VALUES (?,?,?)";
  db.query(sql, [nome, telefone || null, email || null], (err, result) => {
    if (err) {
      console.error ("Erro na query:" err);
      return res.status(500).json({mensagem: "Erro ao cadastrar"});
    }
    res.status(201).json({mensagem: "Contato cadastrado com sucesso!", id:
                                 

const API_BASE = "http://localhost:3000";

async function carregarContatos () {
  try {
     const res = await fetch (`${API_BASE}/contato0s`);
     if (!res.ok) throw new Error ("Erro ao buscar contatos");
    const contatos = await res.json();
    const lista = document.getElementById("listaContatos");
    lista.innerHTML = "";
    contatos.forEach (c=> {
 const li = document.createElement("li");
  li.innerHTML `
     <strong>Nome:</strong> ${c.nome} <br>
     <strong>telefone:</strong> ${c.telefone || "-"} <br>
     <strong>Email:</strong> ${c.email || "-"} <br>
     `;

      lista.appendChild(li); 
    });

  } catch (err) { 
    console.error (err);

    alert ("Não foi possivel carrregar contatos.");
  }
}
document.getElementById("btnCadastrar").addventListener("click", async () => {
    const nome = document.getElemetById("nome").value.trim();
    const telefone = document.getElemetById("telefone").value.trim();
    const email = document.getElemetById("emaill").value.trim();

  if (!nome) {
    alert ("preencha o nome.");
    return;
  }

   


const form = document.getElementById("form-cadastro");
const inputImagem = document.getElementById("imagem");
const previa = document.getElementById("previa");
const cpf = document.getElementById("cpf");

document.getElementById("btn-imagem").addEventListener("click", () => inputImagem.click());

inputImagem.addEventListener("change", () => {
  const arquivo = inputImagem.files[0];
  if (!arquivo) return;
  const img = document.createElement("img");
  img.src = URL.createObjectURL(arquivo);
  img.alt = "Imagem escolhida";
  previa.replaceChildren(img);
});

cpf.addEventListener("input", () => {
  const n = cpf.value.replace(/\D/g, "").slice(0, 11);
  cpf.value = n
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const arquivo = inputImagem.files[0];
  const texto = [
    "Relatório de Cadastro",
    "=====================",
    "Nome: " + document.getElementById("nome").value,
    "E-mail: " + document.getElementById("email").value,
    "Endereço: " + document.getElementById("endereco").value,
    "CPF: " + cpf.value,
    "Senha: " + document.getElementById("senha").value,
  ].join("\n");

  const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cadastro.txt";
  link.click();
  URL.revokeObjectURL(link.href);
});
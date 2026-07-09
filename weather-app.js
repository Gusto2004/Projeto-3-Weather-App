const form = document.querySelector("#form-cidade");
const input = document.querySelector("#input-cidade");
const resultado = document.querySelector("#resultado");

async function procurarTempo(cidade) {
  resultado.innerHTML = '<span class="descricao">A procurar...</span>';

  try {
    const resposta = await fetch(`https://wttr.in/${cidade}?format=j1`);

    if (!resposta.ok) {
      throw new Error("Cidade não encontrada");
    }

    const dados = await resposta.json();

    const temperatura = dados.current_condition[0].temp_C;
    const descricao = dados.current_condition[0].weatherDesc[0].value;
    const nomeCidade = dados.nearest_area[0].areaName[0].value;
    const icone = obterIcone(descricao);

    resultado.innerHTML = `
      <span class="icone">${icone}</span>
      <span class="cidade">${nomeCidade}</span>
      <span class="temperatura">${temperatura}°C</span>
      <span class="descricao">${descricao}</span>
    `;

    // Guardar a última cidade pesquisada com sucesso
    localStorage.setItem("ultimaCidade", cidade);
  } catch (erro) {
    resultado.innerHTML = `<span class="erro">Não foi possível encontrar essa cidade 😕</span>`;
  }
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const cidade = input.value.trim();
  if (cidade === "") return;

  procurarTempo(cidade);
});

function obterIcone(descricao) {
  const texto = descricao.toLowerCase();

  if (texto.includes("sunny") || texto.includes("clear")) return "☀️";
  if (texto.includes("partly cloudy")) return "⛅";
  if (texto.includes("cloudy") || texto.includes("overcast")) return "☁️";
  if (texto.includes("rain") || texto.includes("drizzle")) return "🌧️";
  if (texto.includes("thunder")) return "⛈️";
  if (texto.includes("snow")) return "❄️";
  if (texto.includes("fog") || texto.includes("mist")) return "🌫️";

  return "🌡️";
}

// Ao abrir a página, se houver uma última cidade guardada, mostra logo o tempo dela
const ultimaCidade = localStorage.getItem("ultimaCidade");
if (ultimaCidade) {
  input.value = ultimaCidade;
  procurarTempo(ultimaCidade);
}

// ===== TEMA (com memória) =====
const botaoTema = document.querySelector("#toggle-tema");
const body = document.body;

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "claro") {
  body.classList.remove("dark");
  botaoTema.textContent = "🌙";
} else {
  body.classList.add("dark");
  botaoTema.textContent = "☀️";
}

botaoTema.addEventListener("click", function () {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    botaoTema.textContent = "☀️";
    localStorage.setItem("tema", "escuro");
  } else {
    botaoTema.textContent = "🌙";
    localStorage.setItem("tema", "claro");
  }
});
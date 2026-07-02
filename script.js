const form = document.querySelector('#form-cidade');
const input = document.querySelector('#input-cidade');
const resultado = document.querySelector('#resultado');

form.addEventListener('submit', async function (evento) {
  evento.preventDefault();

  const cidade = input.value.trim();
  if (cidade === '') return;

  resultado.innerHTML = '<span class="descricao">A procurar...</span>';

  try {
    const resposta = await fetch(`https://wttr.in/${cidade}?format=j1`);

    if (!resposta.ok) {
      throw new Error('Cidade não encontrada');
    }

    const dados = await resposta.json();

    const temperatura = dados.current_condition[0].temp_C;
    const descricao = dados.current_condition[0].weatherDesc[0].value;
    const nomeCidade = dados.nearest_area[0].areaName[0].value;

    resultado.innerHTML = `
      <span class="cidade">${nomeCidade}</span>
      <span class="temperatura">${temperatura}°C</span>
      <span class="descricao">${descricao}</span>
    `;

  } catch (erro) {
    resultado.innerHTML = `<span class="erro">Não foi possível encontrar essa cidade 😕</span>`;
  }
});
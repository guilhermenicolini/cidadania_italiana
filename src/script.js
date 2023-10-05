const custo_requerentes = [0, 5700, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000]
const custo_documento = 400;
const custo_processo = 750;

const el_custo_documento = document.getElementById("custo_documento");
const el_custo_processo = document.getElementById("custo_processo");
const el_pessoas = document.getElementById("pessoas");

const el_requerentes = document.getElementById("requerentes");
const el_total = document.getElementById("total");
const el_total_pessoa = document.getElementById("total_pessoa");
const el_parte_1 = document.getElementById("parte_1");
const el_parte_2 = document.getElementById("parte_2");

el_custo_documento.innerText = `€ ${custo_documento}`;
el_custo_processo.innerText = `€ ${custo_processo}`;

for (const v in custo_requerentes) {
  var option = document.createElement("option");
  option.text = v;
  option.valu = v
  el_pessoas.add(option);
}

function reset() {
	el_requerentes.innerText = '€ 0';
  el_total_pessoa.innerText = '€ 0';
  el_parte_1.innerText = '€ 0';
  el_parte_2.innerText = '€ 0';
}

async function buscar_euro() {
	return fetch('https://economia.awesomeapi.com.br/last/EUR-BRL')
  	.then(response => response.json())
    .then(response => {
    	return parseFloat(response.EURBRL.ask);
    })
    .catch(() => 0);
}

pessoas.addEventListener('change', async () => {
	reset();
  const n = parseInt(el_pessoas.value);
  if (!n) return;

  const euro = await buscar_euro();

  el_requerentes.innerText = `€ ${custo_requerentes[n]}`;
  
  const total = custo_documento + custo_processo + custo_requerentes[n];
  const total_real = total * euro;
  el_total.innerText = `€ ${total.toFixed(2)} / R$ ${total_real.toFixed(2)}`;

  const total_pessoa = total / n;
  const total_pessoa_real = total_pessoa * euro;
  el_total_pessoa.innerText = `€ ${total_pessoa.toFixed(2)} / R$ ${total_pessoa_real.toFixed(2)}`;
  
  const parte_1 = total_pessoa * 0.5;
  const parte_2 = total_pessoa * 0.5;
  
  
  console.log(euro);
  
  const parte1_real = parte_1 * euro;
  const parte2_real = parte_2 * euro;
  
  el_parte_1.innerText = `€ ${parte_1.toFixed(2)} / R$ ${parte1_real.toFixed(2)}`;
  el_parte_2.innerText = `€ ${parte_2.toFixed(2)} / R$ ${parte2_real.toFixed(2)}`;
})

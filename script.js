const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ200CpeSfdtv1RMHiWlqpHS7Imu9gqOytQeugt1YzUK-FWTKb_cudAtz1N_l7mr_lPt5dwJSWCXKlw/pub?gid=0&single=true&output=csv';

const container = document.getElementById('livros');
const timerEl = document.getElementById('timer');
let countdown = 30;

// Atualiza o contador na tela
function atualizarTimer() {
  countdown--;
  if (countdown <= 0) {
    carregarDados();
    countdown = 30;
  }
  timerEl.textContent = countdown;
}
setInterval(atualizarTimer, 1000);

// Função principal: carrega os dados do Google Sheets
async function carregarDados() {
  try {
    const resposta = await fetch(sheetURL);
    const texto = await resposta.text();
    const linhas = texto.trim().split('\n').map(l => l.split(','));

    const cabecalhos = linhas[0];
    const dados = linhas.slice(1);

    container.innerHTML = ''; // limpa os livros antes de recarregar

    dados.forEach((linha) => {
      const livro = document.createElement('div');
      livro.className = 'bg-white rounded-xl shadow-md p-4 border border-gray-200';

      linha.forEach((valor, i) => {
        if (cabecalhos[i]) {
          const item = document.createElement('p');
          item.innerHTML = `<strong>${cabecalhos[i]}:</strong> ${valor}`;
          livro.appendChild(item);
        }
      });

      // Pega o nome do livro (assumido na primeira coluna ou ajuste conforme necessário)
      const nomeLivro = linha[1];

      // Cria botão para WhatsApp
      const botao = document.createElement('a');
      botao.href = `https://wa.me/5586995559652?text=Olá! Tenho interesse no livro: ${encodeURIComponent(nomeLivro)}`;
      botao.target = '_blank';
      botao.className = 'mt-4 inline-block bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600';
      botao.textContent = '📚 Quero este livro';

      livro.appendChild(botao);
      container.appendChild(livro);
    });

  } catch (erro) {
    console.error('Erro ao carregar os dados:', erro);
  }
}

// Carrega ao iniciar
carregarDados();

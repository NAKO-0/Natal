/* ================================================================
  FUNÇÃO DE CAPITALIZAÇÃO
  ================================================================
  Garante que a primeira letra do nome seja maiúscula (ex: "maria" vira "Maria").
*/
function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    // O .slice(1) transforma o resto da palavra em minúsculas
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


/* ================================================================
  LÓGICA DO SITE
  Nota: A lista 'mensagensEspeciais' é carregada do arquivo mensagens.js
  ================================================================
*/

// Adiciona evento para o formulário funcionar com Enter
document.getElementById('form-nome').addEventListener('submit', function(event) {
    event.preventDefault(); 
    abrirPresente();
});

async function abrirPresente() {
    const inputNome = document.getElementById('nome-input').value;
    
    if (inputNome.trim() === "") {
        document.getElementById('erro-msg').classList.remove('oculto');
        return;
    }

    // Nome para BUSCAR (minúsculo e sem acento)
    const nomeBusca = inputNome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    // Nome para EXIBIR (primeira letra maiúscula)
    const nomeExibido = capitalizarPrimeiraLetra(inputNome.trim());

    // ====================================================================
    // NOVIDADE: BUSCA SEGURA OS DADOS DO SERVIDOR (Serverless Function)
    // ====================================================================
    try {
        const urlBusca = `/api/get-message?name=${encodeURIComponent(nomeBusca)}`;
        
        const resposta = await fetch(urlBusca);
        if (!resposta.ok) {
            throw new Error(`Erro de rede ao buscar a mensagem: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        const conteudo = dados.data; // Pega o conteúdo do servidor
        
        // 4. Exibe os textos
        document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${nomeExibido}!`;
        document.getElementById('texto-poema').innerText = conteudo.poema;
        document.getElementById('texto-carta').innerText = conteudo.carta;

        // 5. Troca as telas
        document.getElementById('tela-inicial').classList.add('oculto');
        document.getElementById('tela-carta').classList.remove('oculto');
        
        alternarAba('carta'); 

    } catch (error) {
        console.error("Falha ao carregar a mensagem:", error);
        alert("Ops! Houve um erro ao buscar a mensagem. Tente novamente.");
    }
}

function alternarAba(nomeAba) {
    // Esconde/mostra o conteúdo
    document.querySelectorAll('.conteudo-aba').forEach(conteudo => conteudo.classList.remove('aba-ativa'));
    document.getElementById(`aba-${nomeAba}`).classList.add('aba-ativa');

    // Ativa/desativa o botão
    document.querySelectorAll('.tab-button').forEach(botao => botao.classList.remove('ativo'));
    const botaoAtivo = Array.from(document.querySelectorAll('.tab-button')).find(b => b.textContent.toLowerCase().includes(nomeAba));
    if (botaoAtivo) {
        botaoAtivo.classList.add('ativo');
    }
}

function voltar() {
    document.getElementById('tela-carta').classList.add('oculto');
    document.getElementById('tela-inicial').classList.remove('oculto');
    document.getElementById('nome-input').value = ""; // Limpa o input
    document.getElementById('erro-msg').classList.add('oculto');
}

/* ================================================================
  EFEITO DE NEVE
  ================================================================
*/
function criarNeve() {
    const container = document.getElementById('neve-container');
    const floco = document.createElement('div');
    floco.classList.add('floco');
    floco.style.left = Math.random() * 100 + 'vw';
    const tamanho = Math.random() * 10 + 5 + 'px';
    floco.style.width = tamanho;
    floco.style.height = tamanho;
    floco.style.animationDuration = Math.random() * 3 + 2 + 's';
    container.appendChild(floco);
    setTimeout(() => { floco.remove(); }, 5000);
}
setInterval(criarNeve, 100);
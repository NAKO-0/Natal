/* ================================================================
  FUNÇÃO DE CAPITALIZAÇÃO
  ================================================================
*/
function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


/* ================================================================
  LÓGICA PRINCIPAL DO SITE
  ================================================================
*/

// Adiciona evento para o formulário funcionar com Enter
document.getElementById('form-nome').addEventListener('submit', function(event) {
    event.preventDefault(); 
    abrirPresente();
});

// A função deve ser assíncrona (async) para usar o fetch
async function abrirPresente() {
    const inputNome = document.getElementById('nome-input').value;
    
    if (inputNome.trim() === "") {
        document.getElementById('erro-msg').classList.remove('oculto');
        return;
    }

    // 1. Nome para BUSCAR (minúsculo e sem acento)
    const nomeBusca = inputNome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    // 2. Nome para EXIBIR (primeira letra maiúscula)
    const nomeExibido = capitalizarPrimeiraLetra(inputNome.trim());

    // ====================================================================
    // BUSCA SEGURA OS DADOS DO SERVIDOR (Serverless Function)
    // ====================================================================
    try {
        const urlBusca = `/api/get-message?name=${encodeURIComponent(nomeBusca)}`;
        
        const resposta = await fetch(urlBusca);
        
        if (!resposta.ok) {
            throw new Error(`Erro de rede ao buscar a mensagem: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        const conteudo = dados.data;
        
        // NOVIDADE: Pega APENAS o texto da carta.
        const textoCompleto = conteudo.carta; 
        
        // 3. Exibe os textos
        document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${nomeExibido}!`;
        document.getElementById('texto-conteudo-unico').innerText = textoCompleto.trim(); 

        // 4. Troca as telas
        document.getElementById('tela-inicial').classList.add('oculto');
        document.getElementById('tela-carta').classList.remove('oculto');
        
        // Opcional: Se estiver usando controle de áudio com interação, adicione aqui
        // alternarAudio(); 

    } catch (error) {
        console.error("Falha ao carregar a mensagem:", error);
        alert("Ops! Houve um erro ao buscar a mensagem. Verifique a conexão.");
    }
}

function voltar() {
    document.getElementById('tela-carta').classList.add('oculto');
    document.getElementById('tela-inicial').classList.remove('oculto');
    document.getElementById('nome-input').value = ""; 
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

/* ================================================================
  CONTROLE DE ÁUDIO (OPCIONAL)
  Se você incluiu a tag <audio> no HTML
  ================================================================
*/
/*
let estaMudo = true;
const audio = document.getElementById('musica-fundo');
const audioToggle = document.getElementById('audio-toggle');

function alternarAudio() {
    if (estaMudo) {
        audio.muted = false;
        audio.play().catch(error => {
            console.error("Erro ao tentar tocar: ", error);
        });
        audioToggle.textContent = '🔇 Desativar Áudio';
        estaMudo = false;
    } else {
        audio.muted = true;
        audioToggle.textContent = '🎵 Ativar Áudio';
        estaMudo = true;
    }
}
*/
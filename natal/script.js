/* ================================================================
   1. CONFIGURAÇÕES INICIAIS E VARIÁVEIS GLOBAIS
   ================================================================ */
const musica = document.getElementById('musica-natal');
const inputNome = document.getElementById('nome-input');
const formNome = document.getElementById('form-nome');

// Variável de controle para a música não reiniciar
let musicaTocando = false;

function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* ================================================================
   2. CONTROLE DE ÁUDIO E MODAL
   ================================================================ */
/* ================================================================
   CONTROLE ÚNICO DE ÁUDIO (TRAVA TOTAL)
   ================================================================ */
let processoIniciado = false;

function fecharModalEIniciar(event) {
    // Se já iniciou uma vez, sai da função e não faz nada
    if (processoIniciado) return;

    const modal = document.getElementById('modal-boas-vindas');
    const musica = document.getElementById('musica-natal');

    // 1. Marcar como iniciado IMEDIATAMENTE
    processoIniciado = true;

    // 2. Esconder o modal
    if (modal) {
        modal.style.display = 'none';
    }

    // 3. Tocar a música
    if (musica) {
        musica.currentTime = 4;
        musica.volume = 0.5;
        musica.play().catch(e => console.log("Erro ao tocar:", e));
    }

    // 4. REMOVER OS OUVINTES DA TELA PARA SEMPRE
    document.removeEventListener('click', fecharModalEIniciar);
    document.removeEventListener('touchstart', fecharModalEIniciar);
    
    console.log("Sistema de áudio travado para não recomeçar.");
}

// OUVINTES: Eles só vão funcionar UMA VEZ por causa do removeEventListener acima
document.addEventListener('click', fecharModalEIniciar);
document.addEventListener('touchstart', fecharModalEIniciar, { passive: true });

/* ================================================================
   3. BUSCA NA API (LIMPO E SEM CONFLITO)
   ================================================================ */
if (formNome) {
    formNome.addEventListener('submit', function(event) {
        event.preventDefault();
        abrirPresente();
    });
}

async function abrirPresente() {
    const nomeOriginal = inputNome.value.trim();
    
    if (nomeOriginal === "") {
        const erroMsg = document.getElementById('erro-msg');
        if (erroMsg) erroMsg.classList.remove('oculto');
        return;
    }

    const nomeBusca = nomeOriginal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const nomeExibido = capitalizarPrimeiraLetra(nomeOriginal);

    try {
        const resposta = await fetch(`/api/get-message?name=${encodeURIComponent(nomeBusca)}`);
        const dados = await resposta.json();
        
        if (dados.data) {
            document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${nomeExibido}!`;
            document.getElementById('texto-conteudo-unico').innerText = dados.data.carta.trim();

            document.getElementById('tela-inicial').classList.add('oculto');
            document.getElementById('tela-carta').classList.remove('oculto');
        } else {
            alert("Nome não encontrado!");
        }
    } catch (err) {
        console.error("Erro na busca:", err);
    }
}

/* ================================================================
   CONTROLE DE VISIBILIDADE (PARAR SOM AO SAIR)
   ================================================================ */
document.addEventListener("visibilitychange", function() {
    if (musica) {
        if (document.hidden) {
            // Se a pessoa saiu da aba ou minimizou, pausa a música
            musica.pause();
            console.log("Música pausada: aba escondida.");
        } else {
            // Se ela voltar para o site, a música continua de onde parou
            // Só volta a tocar se ela já tiver sido iniciada antes
            if (musicaIniciada) {
                musica.play().catch(e => console.log("Erro ao retomar:", e));
                console.log("Música retomada: aba visível.");
            }
        }
    }
});

/* ================================================================
   4. UTILITÁRIOS (CONTADOR E EFEITOS)
   ================================================================ */
function atualizarContador() {
    const el = document.getElementById('contador');
    if (!el) return;
    const natal = new Date("Dec 25, 2025 00:00:00").getTime();
    const agora = new Date().getTime();
    const diff = natal - agora;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    el.innerHTML = `Faltam ${d}d ${h}h ${m}m para o Natal!`;
}
setInterval(atualizarContador, 60000);
atualizarContador();

// Estrelas e Neve permanecem iguais...
document.addEventListener('mousemove', function(e) {
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    estrela.style.left = e.pageX + 'px';
    estrela.style.top = e.pageY + 'px';
    document.body.appendChild(estrela);
    setTimeout(() => { estrela.remove(); }, 1000);
});

document.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    estrela.style.left = touch.pageX + 'px';
    estrela.style.top = touch.pageY + 'px';
    document.body.appendChild(estrela);
    setTimeout(() => { estrela.remove(); }, 1000);
}, { passive: true });

function criarNeve() {
    const container = document.getElementById('neve-container');
    if (!container) return;
    const floco = document.createElement('div');
    floco.classList.add('floco');
    floco.style.left = Math.random() * 100 + 'vw';
    container.appendChild(floco);
    setTimeout(() => { floco.remove(); }, 5000);
}
setInterval(criarNeve, 150);

function voltar() {
    document.getElementById('tela-carta').classList.add('oculto');
    document.getElementById('tela-inicial').classList.remove('oculto');
    inputNome.value = "";
}
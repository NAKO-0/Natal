/* ================================================================
   1. CONFIGURAÇÕES INICIAIS E VARIÁVEIS GLOBAIS
   ================================================================ */
const musica = document.getElementById('musica-natal');
const inputNome = document.getElementById('nome-input');
const formNome = document.getElementById('form-nome');

// Formata o nome (ex: "henry" -> "Henry")
function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* ================================================================
   2. CONTROLE DE ÁUDIO E CONTADOR (DESTRAVAR)
   ================================================================ */
function fecharModalEIniciar() {
    const modal = document.getElementById('modal-boas-vindas');
    const musica = document.getElementById('musica-natal');

    // 1. Esconde o aviso
    if (modal) {
        modal.style.display = 'none';
    }

    // 2. Inicia a música (O navegador permite porque houve o clique no OK)
    if (musica) {
        musica.currentTime = 4; // Pula o silêncio
        musica.volume = 0.5;
        musica.play().then(() => {
            console.log("Música iniciada após clique no OK!");
        }).catch(e => console.log("Erro ao iniciar áudio:", e));
    }

    // 3. Garante que o contador comece
    if (typeof atualizarContador === "function") {
        atualizarContador();
    }
}

// Se quiser manter o clique em qualquer lugar da tela como alternativa:
document.addEventListener('click', fecharModalEIniciar); 
document.addEventListener('touchstart', fecharModalEIniciar, { passive: true });

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

/* ================================================================
   3. BUSCA NA API E TROCA DE TELA
   ================================================================ */
if (formNome) {
    formNome.addEventListener('submit', function(event) {
        event.preventDefault();
        abrirPresente();
    });
}

async function abrirPresente() {
    const input = document.getElementById('nome-input');
    const nomeOriginal = input.value.trim();
    
    // REMOVIDO: Toda a parte de musica.play() daqui para não dar conflito

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
            const conteudo = dados.data;
            document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${nomeExibido}!`;
            document.getElementById('texto-conteudo-unico').innerText = conteudo.carta.trim();

            document.getElementById('tela-inicial').classList.add('oculto');
            document.getElementById('tela-carta').classList.remove('oculto');
        } else {
            alert("Nome não encontrado!");
        }

    } catch (err) {
        console.error("Erro na busca:", err);
        alert("Ops! Algo deu errado ao buscar sua carta.");
    }
}

function voltar() {
    document.getElementById('tela-carta').classList.add('oculto');
    document.getElementById('tela-inicial').classList.remove('oculto');
    inputNome.value = "";
}

/* ================================================================
   4. EFEITOS VISUAIS (NEVE E ESTRELAS)
   ================================================================ */
document.addEventListener('mousemove', function(e) {
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    estrela.style.left = e.pageX + 'px';
    estrela.style.top = e.pageY + 'px';
    const tamanho = Math.random() * 8 + 2 + 'px';
    estrela.style.width = tamanho;
    estrela.style.height = tamanho;
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
    const tamanho = Math.random() * 10 + 5 + 'px';
    floco.style.width = tamanho;
    floco.style.height = tamanho;
    floco.style.animationDuration = Math.random() * 3 + 2 + 's';
    container.appendChild(floco);
    setTimeout(() => { floco.remove(); }, 5000);
}
setInterval(criarNeve, 150);



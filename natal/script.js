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
function ativarRecursos() {
    if (musica && musica.paused) {
        musica.currentTime = 4; // Inicia no segundo 4 apenas na primeira vez
        musica.volume = 0.5;
        musica.play().catch(e => console.log("Aguardando interação..."));
    }
    atualizarContador();
    // Remove para não reiniciar a música a cada clique
    document.removeEventListener('click', ativarRecursos);
    document.removeEventListener('touchstart', ativarRecursos);
}

document.addEventListener('click', ativarRecursos);
document.addEventListener('touchstart', ativarRecursos, { passive: true });

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
    
    // 1. TENTAR TOCAR O ÁUDIO (Ação imediata ao clique para o Celular permitir)
    const musica = document.getElementById('musica-natal');
    if (musica) {
        // Só define o tempo se a música ainda não tiver começado
        if (musica.currentTime === 0) {
            musica.currentTime = 4;
        }
        musica.volume = 0.5;
        
        // O play() retorna uma promessa, vamos tratar para não dar erro no console
        musica.play().catch(e => {
            console.log("O navegador bloqueou o autoplay. O som tocará após a interação.");
        });
    }

    // --- CONTINUAÇÃO DA SUA LÓGICA NORMAL ---
    if (nomeOriginal === "") {
        const erroMsg = document.getElementById('erro-msg');
        if (erroMsg) erroMsg.classList.remove('oculto');
        return;
    }

    const nomeBusca = nomeOriginal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const nomeExibido = capitalizarPrimeiraLetra(nomeOriginal);

    try {
        // Busca a mensagem na sua API
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
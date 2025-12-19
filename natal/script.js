/* ================================================================
   1. CONFIGURAÇÕES INICIAIS E VARIÁVEIS GLOBAIS
   ================================================================ */
const musica = document.getElementById('musica-natal');
const inputNome = document.getElementById('nome-input');
const formNome = document.getElementById('form-nome');

// Variável de controle para a música não reiniciar
let musicaTocando = false;
let processoIniciado = false; // Trava para o S23

function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* ================================================================
   2. CONTROLE DE ÁUDIO E MODAL (DESTRAVAR)
   ================================================================ */
function fecharModalEIniciar() {
    // Se já iniciou, não faz nada para não reiniciar o som
    if (processoIniciado) return;

    const modal = document.getElementById('modal-boas-vindas');
    const musica = document.getElementById('musica-natal');

    // 1. Marcar como iniciado IMEDIATAMENTE
    processoIniciado = true;

    // 2. Esconde o aviso
    if (modal) {
        modal.style.display = 'none';
    }

    // SOLICITAR PERMISSÃO PARA NOTIFICAÇÃO (Celular/Desktop)
    if ("Notification" in window) {
        Notification.requestPermission();
    }

    // 3. Inicia a música (O navegador permite porque houve o clique no OK)
    if (musica) {
        musica.currentTime = 4; // Pula o silêncio
        musica.volume = 0.3;
        musica.play().then(() => {
            musicaTocando = true;
            console.log("Música iniciada após clique no OK!");
        }).catch(e => {
            console.log("Erro ao iniciar áudio:", e);
            processoIniciado = false; // Permite tentar de novo se falhar
        });
    }

    // 4. Garante que o contador comece
    if (typeof atualizarContador === "function") {
        atualizarContador();
    }
}

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
   4. EFEITOS VISUAIS E LÓGICA DE NATAL
   ================================================================ */
function enviarNotificacaoNatal() {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("🎄 Feliz Natal!", {
            body: "Feliz Natal! Que esse dia seja muito abençoado. Abraço!",
            icon: "src/fundo.jpg" 
        });
    }
}

function atualizarContador() {
    const el = document.getElementById('contador');
    if (!el) return;
    const natal = new Date("Dec 25, 2025 00:00:00").getTime();
    const agora = new Date().getTime();
    const diff = natal - agora;

    // LÓGICA PARA QUANDO O DIA CHEGAR
    if (diff <= 0) {
        if (el.innerHTML !== "🎅 FELIZ NATAL! HO HO HO! 🎄") {
            el.innerHTML = "🎅 FELIZ NATAL! HO HO HO! 🎄";
            el.style.color = "#fff";
            el.style.background = "linear-gradient(to bottom, #c0392b, #145a32)";
            enviarNotificacaoNatal(); 
        }
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    el.innerHTML = `Faltam ${d}d ${h}h ${m}m ${s}s para o Natal!`;
}
// Atualiza a cada 1 segundo para mostrar os segundos
setInterval(atualizarContador, 1000);
atualizarContador();

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
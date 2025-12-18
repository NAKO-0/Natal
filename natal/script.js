/* ================================================================
   FUNÇÃO DE CAPITALIZAÇÃO E UTILITÁRIOS
   ================================================================ */
function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* ================================================================
   LÓGICA PRINCIPAL (FORMULÁRIO E API)
   ================================================================ */

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

    const nomeBusca = inputNome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const nomeExibido = capitalizarPrimeiraLetra(inputNome.trim());

    try {
        const urlBusca = `/api/get-message?name=${encodeURIComponent(nomeBusca)}`;
        const resposta = await fetch(urlBusca);
        
        if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
        
        const dados = await resposta.json();
        const conteudo = dados.data;
        
        // 1. Preenche os textos
        document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${nomeExibido}!`;
        document.getElementById('texto-conteudo-unico').innerText = conteudo.carta.trim(); 

        // 2. Troca as telas
        document.getElementById('tela-inicial').classList.add('oculto');
        document.getElementById('tela-carta').classList.remove('oculto');
        
        // 3. DISPARA A ANIMAÇÃO DO ENVELOPE (Atrás de um pequeno delay para suavidade)
        setTimeout(() => {
            document.getElementById('envelope-principal').classList.add('aberto');
        }, 300);

    } catch (error) {
        console.error("Falha ao carregar a mensagem:", error);
        alert("Ops! Houve um erro ao buscar a mensagem.");
    }
}

function voltar() {
    // 1. Remove a animação primeiro
    document.getElementById('envelope-principal').classList.remove('aberto');
    
    // 2. Espera fechar para trocar de tela
    setTimeout(() => {
        document.getElementById('tela-carta').classList.add('oculto');
        document.getElementById('tela-inicial').classList.remove('oculto');
        document.getElementById('nome-input').value = ""; 
        document.getElementById('erro-msg').classList.add('oculto');
    }, 600);
}

/* ================================================================
   EFEITOS VISUAIS (NEVE, ESTRELAS E CONTADOR)
   ================================================================ */

// 1. RASTRO DE ESTRELAS NO MOUSE
document.addEventListener('mousemove', function(e) {
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    estrela.style.left = e.pageX + 'px';
    estrela.style.top = e.pageY + 'px';
    
    // Tamanho aleatório para as estrelas
    const tam = Math.random() * 8 + 2 + 'px';
    estrela.style.width = tam;
    estrela.style.height = tam;
    
    document.body.appendChild(estrela);
    
    // Remove depois da animação
    setTimeout(() => { estrela.remove(); }, 1000);
});

// 2. CONTADOR REGRESSIVO
function atualizarContador() {
    const agora = new Date().getTime();
    let natal = new Date(`Dec 25, ${new Date().getFullYear()} 00:00:00`).getTime();
    
    if (agora > natal) natal = new Date(`Dec 25, ${new Date().getFullYear() + 1} 00:00:00`).getTime();
    
    const diff = natal - agora;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('contador').innerHTML = `Faltam ${d}d ${h}h ${m}m para o Natal!`;
}
setInterval(atualizarContador, 60000);
atualizarContador();

// 3. EFEITO DE NEVE
function criarNeve() {
    const container = document.getElementById('neve-container');
    const floco = document.createElement('div');
    floco.classList.add('floco');
    floco.style.left = Math.random() * 100 + 'vw';
    const tamanho = Math.random() * 8 + 4 + 'px';
    floco.style.width = tamanho;
    floco.style.height = tamanho;
    floco.style.animationDuration = Math.random() * 3 + 2 + 's';
    container.appendChild(floco);
    setTimeout(() => { floco.remove(); }, 5000);
}
setInterval(criarNeve, 150);
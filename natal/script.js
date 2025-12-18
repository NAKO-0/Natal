/* ================================================================
  CONFIGURAÇÕES INICIAIS E EVENTOS
  ================================================================ */
document.getElementById('form-nome').addEventListener('submit', function(e) {
    e.preventDefault();
    abrirPresente();
});

function capitalizarPrimeiraLetra(s) {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/* ================================================================
  BUSCA DA MENSAGEM NO SERVIDOR (API)
  ================================================================ */
async function abrirPresente() {
    const input = document.getElementById('nome-input');
    const nomeOriginal = input.value.trim();
    
    if (nomeOriginal === "") {
        document.getElementById('erro-msg').classList.remove('oculto');
        return;
    }

    const nomeBusca = nomeOriginal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    try {
        const resposta = await fetch(`/api/get-message?name=${encodeURIComponent(nomeBusca)}`);
        if (!resposta.ok) throw new Error("Erro na busca");
        
        const json = await resposta.json();
        const conteudo = json.data;

        document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${capitalizarPrimeiraLetra(nomeOriginal)}!`;
        document.getElementById('texto-conteudo-unico').innerText = conteudo.carta;

        document.getElementById('tela-inicial').classList.add('oculto');
        document.getElementById('tela-carta').classList.remove('oculto');
    } catch (err) {
        alert("Erro ao buscar mensagem. Verifique sua internet.");
    }
}

function voltar() {
    document.getElementById('tela-carta').classList.add('oculto');
    document.getElementById('tela-inicial').classList.remove('oculto');
    document.getElementById('nome-input').value = "";
}

/* ================================================================
  ADICIONAIS: CONTADOR, ESTRELAS E DOWNLOAD
  ================================================================ */

// 1. Contador Regressivo
function atualizarContador() {
    const agora = new Date().getTime();
    let dataNatal = new Date(`Dec 25, ${new Date().getFullYear()} 00:00:00`).getTime();
    if (agora > dataNatal) dataNatal = new Date(`Dec 25, ${new Date().getFullYear() + 1} 00:00:00`).getTime();

    const diff = dataNatal - agora;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('contador').innerHTML = `Faltam <strong>${d}d ${h}h ${m}m</strong> para o Natal!`;
}
setInterval(atualizarContador, 60000);
atualizarContador();

// 2. Rastro de Estrelas
document.addEventListener('mousemove', function(e) {
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    estrela.style.left = e.pageX + 'px';
    estrela.style.top = e.pageY + 'px';
    const tam = Math.random() * 8 + 2 + 'px';
    estrela.style.width = tam; estrela.style.height = tam;
    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 1000);
});

// 3. Baixar Imagem da Carta
function baixarCarta() {
    const area = document.getElementById('area-print');
    const botoes = document.querySelector('.botoes-acao');
    botoes.style.visibility = 'hidden'; // Esconde os botões no print

    html2canvas(area, { backgroundColor: "#8b0000", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Natal-Henry.png`;
        link.href = canvas.toDataURL();
        link.click();
        botoes.style.visibility = 'visible';
    });
}

// 4. Neve
function criarNeve() {
    const container = document.getElementById('neve-container');
    const floco = document.createElement('div');
    floco.classList.add('floco');
    floco.style.left = Math.random() * 100 + 'vw';
    const tam = Math.random() * 8 + 4 + 'px';
    floco.style.width = tam; floco.style.height = tam;
    floco.style.animationDuration = Math.random() * 3 + 2 + 's';
    container.appendChild(floco);
    setTimeout(() => floco.remove(), 5000);
}
setInterval(criarNeve, 150);
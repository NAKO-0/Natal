/* ================================================================
  1. CONTROLE DO FORMULÁRIO E BUSCA DA MENSAGEM
  ================================================================ */

// Quando o usuário envia o formulário (clica no botão ou dá Enter)
document.getElementById('form-nome').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar
    abrirPresente();
});

async function abrirPresente() {
    const input = document.getElementById('nome-input');
    const nomeOriginal = input.value.trim();
    
    // Se o campo estiver vazio, mostra erro e para aqui
    if (nomeOriginal === "") {
        document.getElementById('erro-msg').classList.remove('oculto');
        return;
    }

    // Normaliza o nome para busca: minúsculo e sem acentos
    const nomeBusca = nomeOriginal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    try {
        // Busca os dados na sua Serverless Function (Vercel)
        const resposta = await fetch(`/api/get-message?name=${encodeURIComponent(nomeBusca)}`);
        const json = await resposta.json();
        const conteudo = json.data;

        // Preenche o texto da carta com o que veio do servidor
        document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${nomeOriginal}!`;
        document.getElementById('texto-conteudo-unico').innerText = conteudo.carta;

        // Esconde a tela inicial e mostra a tela do envelope
        document.getElementById('tela-inicial').classList.add('oculto');
        document.getElementById('tela-carta').classList.remove('oculto');

        // Aguarda 300ms e adiciona a classe que inicia a animação do envelope
        setTimeout(() => {
            document.getElementById('envelope-principal').classList.add('aberto');
        }, 300);

    } catch (err) {
        alert("Ops! Não conseguimos encontrar sua carta agora.");
    }
}

// Função para resetar tudo e voltar para a tela inicial
function voltar() {
    // Remove a classe de animação primeiro
    document.getElementById('envelope-principal').classList.remove('aberto');
    
    // Aguarda a animação de fechar (600ms) antes de trocar de tela
    setTimeout(() => {
        document.getElementById('tela-carta').classList.add('oculto');
        document.getElementById('tela-inicial').classList.remove('oculto');
        document.getElementById('nome-input').value = ""; // Limpa o input
    }, 600);
}

/* ================================================================
  2. ADICIONAIS: CONTADOR, NEVE E ESTRELAS
  ================================================================ */

// Função do Contador Regressivo
function atualizarContador() {
    const agora = new Date().getTime();
    let natal = new Date(`Dec 25, ${new Date().getFullYear()} 00:00:00`).getTime();
    
    // Se o natal deste ano já passou, conta para o próximo
    if (agora > natal) natal = new Date(`Dec 25, ${new Date().getFullYear() + 1} 00:00:00`).getTime();
    
    const diff = natal - agora;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('contador').innerHTML = `Faltam <strong>${d}d ${h}h ${m}m</strong> para o Natal!`;
}
// Atualiza o contador a cada 1 minuto
setInterval(atualizarContador, 60000);
atualizarContador();

// Função que cria flocos de neve aleatórios
function criarNeve() {
    const container = document.getElementById('neve-container');
    const floco = document.createElement('div');
    floco.classList.add('floco');
    
    // Posição lateral e tamanho aleatórios
    floco.style.left = Math.random() * 100 + 'vw';
    const tam = Math.random() * 7 + 3 + 'px';
    floco.style.width = tam; 
    floco.style.height = tam;
    
    // Tempo de queda aleatório para não caírem todos iguais
    floco.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    container.appendChild(floco);
    
    // Remove o floco da memória depois que ele termina de cair (5 segundos)
    setTimeout(() => floco.remove(), 5000);
}
setInterval(criarNeve, 150);

// Efeito de estrelas seguindo o mouse
document.addEventListener('mousemove', function(e) {
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    estrela.style.left = e.pageX + 'px';
    estrela.style.top = e.pageY + 'px';
    
    const tam = Math.random() * 6 + 2 + 'px';
    estrela.style.width = tam; 
    estrela.style.height = tam;
    
    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 1000);
});
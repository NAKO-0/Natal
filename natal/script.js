/* ================================================================
   1. UTILITÁRIOS: AJUSTE DE TEXTO
   ================================================================ */

// Deixa apenas a primeira letra do nome em Maiúsculo (ex: "henry" vira "Henry")
function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* ================================================================
   2. CONTROLE DE TELAS E BUSCA DE MENSAGEM
   ================================================================ */

// Escuta quando o usuário aperta o botão ou dá "Enter" no formulário
document.getElementById('form-nome').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar
    abrirPresente();
});

async function abrirPresente() {
    const input = document.getElementById('nome-input');
    const nomeOriginal = input.value.trim();
    
    // Se o campo estiver vazio, avisa o usuário e para por aqui
    if (nomeOriginal === "") {
        document.getElementById('erro-msg').classList.remove('oculto');
        return;
    }

    // 1. Nome para BUSCA: Tudo minúsculo e sem acentos (ex: "André" vira "andre")
    const nomeBusca = nomeOriginal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 2. Nome para EXIBIÇÃO: Bem formatado
    const nomeExibido = capitalizarPrimeiraLetra(nomeOriginal);

    try {
        // Busca a mensagem segura na sua API da Vercel
        const resposta = await fetch(`/api/get-message?name=${encodeURIComponent(nomeBusca)}`);
        const dados = await resposta.json();
        const conteudo = dados.data;

        // 3. Preenche os dados na tela da carta
        document.getElementById('titulo-mensagem').innerText = `Feliz Natal, ${nomeExibido}!`;
        document.getElementById('texto-conteudo-unico').innerText = conteudo.carta.trim();

        // 4. Troca de tela: Esconde o formulário e mostra a mensagem
        document.getElementById('tela-inicial').classList.add('oculto');
        document.getElementById('tela-carta').classList.remove('oculto');

    } catch (err) {
        console.error("Erro na busca:", err);
        alert("Ops! Houve um erro ao buscar sua carta.");
    }
}

// Função para resetar tudo e voltar à tela inicial
function voltar() {
    document.getElementById('tela-carta').classList.add('oculto');
    document.getElementById('tela-inicial').classList.remove('oculto');
    document.getElementById('nome-input').value = ""; // Limpa o campo de nome
}

/* ================================================================
   3. EFEITOS ESPECIAIS (CONTADOR, MOUSE E NEVE)
   ================================================================ */

/* ================================================================
   FUNÇÃO DO CONTADOR (RESOLUÇÃO DO PROBLEMA)
   ================================================================ */
function atualizarContador() {
    // 1. Pegamos o elemento pelo ID
    const elementoContador = document.getElementById('contador');
    
    // Se o elemento não existir no HTML, o script para aqui para não travar o resto
    if (!elementoContador) return;

    const agora = new Date().getTime();
    
    // 2. Definimos a data do Natal (Certifique-se que o ano está correto)
    let natal = new Date(`Dec 25, 2025 00:00:00`).getTime();
    
    // Se já passou do Natal de 2025, calcula para o próximo ano automaticamente
    if (agora > natal) {
        natal = new Date(`Dec 25, ${new Date().getFullYear() + 1} 00:00:00`).getTime();
    }
    
    const diferenca = natal - agora;

    // 3. Cálculos de tempo
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

    // 4. AQUI É ONDE O TEXTO MUDA:
    // Substituímos o "Carregando..." pelo tempo real
    elementoContador.innerHTML = `Faltam ${dias}d ${horas}h ${minutos}m para o Natal!`;
}

// 5. IMPORTANTE: Chame a função imediatamente para não esperar 1 minuto
atualizarContador();

// 6. Faz o contador atualizar a cada 1 minuto (60000 milissegundos)
setInterval(atualizarContador, 60000);

// --- B. Rastro de Estrelas no Mouse ---
document.addEventListener('mousemove', function(e) {
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    
    // Posiciona a estrela exatamente onde o cursor está
    estrela.style.left = e.pageX + 'px';
    estrela.style.top = e.pageY + 'px';
    
    // Define um tamanho aleatório entre 2px e 10px para cada brilho
    const tamanho = Math.random() * 8 + 2 + 'px';
    estrela.style.width = tamanho;
    estrela.style.height = tamanho;
    
    document.body.appendChild(estrela);
    
    // Remove a estrela da memória após 1 segundo (tempo da animação CSS)
    setTimeout(() => {
        estrela.remove();
    }, 1000);
});


// --- C. Efeito de Neve Caindo ---
function criarNeve() {
    const container = document.getElementById('neve-container');
    const floco = document.createElement('div');
    floco.classList.add('floco');
    
    // Posição horizontal aleatória (0 a 100 da largura da tela)
    floco.style.left = Math.random() * 100 + 'vw';
    
    // Tamanhos diferentes para os flocos
    const tamanho = Math.random() * 10 + 5 + 'px';
    floco.style.width = tamanho;
    floco.style.height = tamanho;
    
    // Velocidade de queda aleatória (entre 2 e 5 segundos)
    floco.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    container.appendChild(floco);
    
    // Deleta o floco após ele sair da tela
    setTimeout(() => { floco.remove(); }, 5000);
}
// Cria um novo floco de neve a cada 150 milissegundos
setInterval(criarNeve, 150);

/* ================================================================
   ADICIONAL: Rastro de Estrelas para Celulares (Touch)
   ================================================================ */
document.addEventListener('touchmove', function(e) {
    // Pega a posição do primeiro toque
    const touch = e.touches[0];
    
    const estrela = document.createElement('div');
    estrela.className = 'rastro-estrela';
    
    // Usa pageX e pageY para posicionar onde o dedo está
    estrela.style.left = touch.pageX + 'px';
    estrela.style.top = touch.pageY + 'px';
    
    // Tamanho aleatório para o brilho
    const tamanho = Math.random() * 6 + 2 + 'px';
    estrela.style.width = tamanho;
    estrela.style.height = tamanho;
    
    document.body.appendChild(estrela);
    
    // Remove após 1 segundo
    setTimeout(() => {
        estrela.remove();
    }, 1000);
}, { passive: true }); // Otimiza a performance do scroll no celular

/* ================================================================
   CONTROLO DE ÁUDIO E CONTADOR
   ================================================================ */
const musica = document.getElementById('musica-natal');

function ativarTudo() {
    // Tenta tocar a música MP3
    if (musica) {
        musica.volume = 0.5;
        musica.play().then(() => {
            console.log("Música iniciada!");
        }).catch(e => console.log("Erro ao tocar:", e));
    }
    
    // Inicia o contador imediatamente ao primeiro toque
    atualizarContador();
    
    // Remove os detetores para não repetir a cada clique
    document.removeEventListener('click', ativarTudo);
    document.removeEventListener('touchstart', ativarTudo);
}

// Escuta a primeira interação (clique ou toque no celular)
document.addEventListener('click', ativarTudo);
document.addEventListener('touchstart', ativarTudo);

function atualizarContador() {
    const el = document.getElementById('contador');
    if (!el) return;

    // Define a data alvo (25 de Dezembro de 2025)
    const natal = new Date("Dec 25, 2025 00:00:00").getTime();
    const agora = new Date().getTime();
    const diff = natal - agora;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Substitui o texto "Carregando contagem..." pelo tempo real
    el.innerHTML = `Faltam ${d}d ${h}h ${m}m para o Natal!`;
}

// Atualiza o tempo a cada 1 minuto
setInterval(atualizarContador, 60000);
// Tenta rodar uma vez ao carregar, caso o navegador permita
window.onload = atualizarContador;
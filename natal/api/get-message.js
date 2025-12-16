/* ================================================================
  ARQUIVO SECRETO E SEGURO (Serverless Function)
  O Vercel executa este código no servidor, longe dos olhos do usuário.
  ================================================================
*/

// Sua lista de mensagens agora fica AQUI, oculta para o público.
// CHAVES DOS NOMES DEVEM SER SEM ACENTO E EM MINÚSCULO!
const mensagensEspeciais = {
    // A lista completa que você forneceu:
    "gabrielle": {
        poema: "As luzes brilham lá fora,\nMas sua amizade brilha mais,\nQue neste Natal, sem demora,\nVocê encontre sua paz.",
        carta: `Gabrielle

Quero usar este Natal pra te agradecer por tudo o que você representou pra mim. Você esteve presente em momentos importantes da minha vida, principalmente quando as coisas estavam mais sensíveis e difíceis. Em conversas simples, você me ajudou mais do que imagina, me ouvindo, me apoiando e estando ali de verdade.

Sua presença fez diferença. Ter alguém como você por perto trouxe segurança, clareza e conforto em momentos que eu nunca vou esquecer. Sua amizade foi algo leve, sincero e muito importante pra mim.

Você é uma pessoa incrível, dedicada e extremamente capaz. Eu tenho muita fé de que você vai passar na FUVEST, porque quem te conhece sabe do quanto você se esforça e do quanto merece. Isso é só o começo de tudo o que você ainda vai conquistar, e o próximo ano tem tudo pra ser abençoado e cheio de coisas boas pra você.

Que este Natal seja de paz, descanso e alegria, e que o novo ano venha com crescimento, felicidade e sonhos realizados. Obrigado por tudo, de verdade, e por fazer parte da minha vida.
Lembre-se: você é uma pessoa incrível.

Com carinho,
Henry`
    },
    "eduardo": {
        poema: "Estrelas no céu a guiar,\nUm ano novo a surgir,\nQue a alegria venha ficar,\nE nunca mais partir.",
        carta: `Luiz Eduardo

Quero usar este Natal para te agradecer com calma e sinceridade por tudo o que você representou para mim. Você esteve presente em momentos decisivos do meu ano e da minha vida, em conversas que mudaram rumos, esclareceram pensamentos e fizeram diferença quando eu mais precisei.

Você também abriu portas importantes para mim, me apresentou pessoas incríveis e me permitiu conviver com gente maravilhosa. Essas conexões e experiências só aconteceram porque você esteve ali, estendendo a mão e caminhando junto. Isso é algo raro — e extremamente valioso.

Tenho muito orgulho de te chamar de amigo. Sua forma de agir, de ouvir e de se importar diz muito sobre quem você é. E, como canta a Taylor Swift, “long live all the magic we made” — que essas memórias e tudo o que construímos continuem vivas por muito tempo.

Que este Natal seja de paz, descanso e alegria, e que o próximo ano venha com crescimento, saúde e muitas conquistas. Que a vida te devolva tudo aquilo que você entrega aos outros, em dobro.
Lembre-se: o impacto que você tem na vida das pessoas é maior do que você imagina. Tenho muito orgulho de te chamar de amigo.

Com carinho
Henry`
    },
    
    "victoria": {
        poema: "O Natal chegou com alegria,\nTrazendo paz e harmonia,\nQue seu dia seja magia,\nCheio de luz e fantasia.",
        carta: `Victoria

Quero te agradecer por ser uma amiga tão carismática e cuidadosa. Ao longo do tempo, você acompanhou nosso grupo como uma verdadeira irmã mais velha, sempre presente, atenta e preocupada com cada um de nós.

Sua forma de cuidar, orientar e acolher fez muita diferença. Ter você por perto trouxe segurança, apoio e muitos momentos bons que vão ficar guardados com carinho.

Te desejo um Natal cheio de paz, amor e descanso, e que o próximo ano venha com muitas bênçãos, conquistas e motivos para sorrir. Obrigado por tudo e por ser essa presença tão importante.

Lembre-se: Nunca se esqueça do quanto sua presença faz diferença e do bem que você espalha por onde passa.

Com carinho
Henry`
    },

    "daniel": {
        poema: "O Natal chegou com alegria,\nTrazendo paz e harmonia,\nQue seu dia seja magia,\nCheio de luz e fantasia.",
        carta: `Daniel

Quero te agradecer por ser um grande amigo. Mesmo com as piadas de humor duvidoso — que eu confesso que sempre acabo rindo porque sou besta — você esteve presente de verdade, trazendo leveza e fazendo os momentos ficarem mais fáceis.

Por trás das brincadeiras, tem alguém que sabe ser amigo, que está junto, que soma e que faz diferença. Isso é algo que eu valorizo muito e que não passa despercebido.

Te desejo um Natal cheio de paz, risadas e boas energias, e que o próximo ano venha com muitas conquistas, momentos bons e mais histórias pra gente rir depois. Obrigado por tudo, irmão.

Lembre-se: Por trás das brincadeiras, você é um amigo de verdade. Nunca duvide do quanto você é importante.

Com carinho
Henry`
    },

    "julia": {
        poema: "O Natal chegou com alegria,\nTrazendo paz e harmonia,\nQue seu dia seja magia,\nCheio de luz e fantasia.",
        carta: `Julia

Quero te agradecer por ser uma amiga tão divertida e especial. Seu jeito leve e espontâneo sempre trouxe risadas, mas também trouxe algo muito valioso: conselhos duros quando precisavam ser ditos, sempre verdadeiros e necessários.

Mesmo quando não foi fácil ouvir, seus conselhos fizeram diferença e mostraram o quanto você se importa de verdade. Isso é algo raro e que eu valorizo muito.

Te desejo um Natal cheio de paz, alegria e momentos bons, e que o próximo ano venha com muitas conquistas, crescimento e felicidade. Obrigado por tudo e por ser essa amiga tão sincera.

Lembre-se: Nem todo mundo tem coragem de ser verdadeiro como você. Continue sendo essa pessoa sincera e especial.

Com carinho
Henry`
    },

    "alexia": {
        poema: "O Natal chegou com alegria,\nTrazendo paz e harmonia,\nQue seu dia seja magia,\nCheio de luz e fantasia.",
        carta: `Alexia

Você foi, sem dúvidas, uma das melhores pessoas que eu conheci. Em momentos em que eu realmente precisei, você me deu conselhos sinceros e bons de verdade, daqueles que fazem a gente parar e pensar.

Sei que posso contar com você quando precisar, e espero de coração que você também saiba que pode contar comigo. Nossa amizade é algo que eu valorizo muito, pela confiança, pelas conversas e pelo apoio mútuo.

Te desejo um Natal cheio de paz, carinho e boas energias, e que o próximo ano venha com coisas boas, crescimento e momentos felizes. Obrigado por tudo.

Lembre-se: você é uma pessoa incrível e especial.

Com carinho
Henry`
    },

    "mayra": {
        poema: "O Natal chegou com alegria,\nTrazendo paz e harmonia,\nQue seu dia seja magia,\nCheio de luz e fantasia.",
        carta: `Mãe

Quero aproveitar este Natal para te dizer algo que muitas vezes não consigo colocar em palavras. Você é uma das pessoas que eu mais amo na vida. Seu amor, cuidado e força sempre foram minha base, mesmo quando eu não soube demonstrar isso direito.

Também quero te pedir desculpa pelas burradas que eu faço, pelas vezes em que erro, sou impulsivo ou acabo te preocupando. Saiba que nunca é por falta de amor ou respeito. Estou aprendendo, crescendo e tentando ser alguém melhor todos os dias — e você faz parte disso.

Obrigado por tudo o que você faz por mim, pelos conselhos, pela paciência e por nunca soltar minha mão. Tudo o que eu sou e tudo o que estou me tornando tem muito de você.

Te desejo um Natal cheio de paz, amor e momentos felizes. Que o próximo ano venha com saúde, alegria e muitas bênçãos. Eu te amo.

Com todo o meu amor
Henry`
    },

    "neide": {
        poema:"",
        carta:`Vó

Quero aproveitar este Natal para te agradecer por tudo o que você faz por mim. Você sempre me ajuda nas coisas que eu faço, mesmo quando eu sou um pouco rebelde. Seu apoio, sua paciência e seu cuidado significam muito mais do que eu consigo explicar.

Ter você na minha vida é uma bênção. Seu carinho, seus conselhos e a forma como você sempre está presente me dão força e segurança. Sou muito grato por tudo o que você representa pra mim.

Te desejo um Natal cheio de paz, amor e saúde, e que o próximo ano venha com muitos momentos felizes. Obrigado por tudo. Eu te amo.

Com todo o meu carinho
Henry`
    },

    "juliana": {
        poema:"",
        carta:`Tia

Quero aproveitar este Natal pra te dizer o quanto você é importante pra mim. Você é minha tia e minha madrinha de nascimento, alguém que sempre esteve presente na minha vida, mesmo quando você fica chata de vez em quando — o que não muda em nada o quanto eu te amo.

Seu cuidado, seus conselhos e sua presença sempre fizeram diferença. Sei que posso contar com você, e isso é algo que eu valorizo muito.

Te desejo um Natal cheio de paz, alegria e momentos bons, e que o próximo ano venha com saúde, felicidade e muitas bênçãos. Obrigado por tudo e por sempre estar por perto.

Com carinho,
Henry`
    },

    "luiz": {
        poema:"",
        carta:`Luiz

Quero aproveitar este Natal para te agradecer de verdade pelos conselhos valiosos que você já me deu. Mesmo que muitas vezes não pareça, eu sei que você se importa, e isso significa muito pra mim.

Suas palavras e atitudes me ajudaram a refletir, a crescer e a enxergar as coisas de outra forma. Sou grato por tudo o que você já fez e faz por mim, mesmo nos detalhes e nos momentos mais silenciosos.

Te desejo um Natal cheio de paz e um próximo ano com saúde, tranquilidade e coisas boas. Muito obrigado por tudo.

Com respeito e carinho
Henry`
    },


  "higor": {
    poema: "",
    carta: `
Higor,

Quero te agradecer por ser esse amigo tão especial. Sua presença sempre trouxe leveza, risadas e momentos bons que fizeram diferença no meu dia a dia.

Nossa amizade é simples, sincera e verdadeira, e isso é algo que eu valorizo muito. Te desejo um Natal tranquilo e um próximo ano cheio de conquistas e felicidade.

Com carinho,
Henry
`
  },

  "alexandre": {
    poema: "",
    carta: `
Alexandre,

Quero aproveitar este Natal pra te agradecer pela amizade sincera. Você é alguém em quem dá pra confiar, conversar e contar quando precisa.

Que o próximo ano venha com crescimento, sucesso e coisas boas pra você. Obrigado por ser um amigo de verdade.

Com carinho,
Henry
`
  },

  "henrique": {
    poema: "",
    carta: `
Henrique,

Nossa amizade foi construída aos poucos, em momentos simples, mas isso não diminui o quanto ela é importante pra mim.

Te desejo um Natal tranquilo e um ano novo cheio de oportunidades, aprendizado e boas surpresas.

Com carinho,
Henry
`
  },

  "gabriel c": {
    poema: "",
    carta: `
Gabrie C

Quero te agradecer pela amizade e pelos momentos compartilhados. Seu jeito leve torna tudo mais fácil e mais divertido.

Que este Natal seja de paz e que o próximo ano venha com felicidade e crescimento.

Com carinho,
Henry
`
  },

  "gabriel h": {
    poema: "",
    carta: `
Gabriel H

Valorizo muito nossa amizade e tudo o que já vivemos juntos. Sua presença e suas ideias fizeram diferença em vários momentos.

Te desejo um Natal tranquilo e um próximo ano cheio de conquistas e boas experiências.

Com carinho,
Henry
`
  },

  "mariane": {
    poema: "",
    carta: `
Mariani,

Quero te agradecer por ser essa pessoa tão especial. Seu jeito e sua energia tornam qualquer ambiente melhor.

Que este Natal seja leve e que o próximo ano venha com alegria, conquistas e coisas boas pra você.

Com carinho,
Henry
`
  },

  "milena": {
    poema: "",
    carta: `
Milena

Obrigado pela amizade e pelos momentos compartilhados. Seu jeito de ser e sua atenção mostram o quanto você é uma pessoa especial.

Te desejo um Natal cheio de luz e um ano novo com felicidade e sonhos se realizando.

Com carinho,\
Henry
`
  },




    
    // MENSAGEM PADRÃO (Sempre a última para ser usada se o nome não for encontrado)
    "padrao": {
        poema: "O Natal chegou com alegria,\nTrazendo paz e harmonia,\nQue seu dia seja magia,\nCheio de luz e fantasia.",
        carta: "Desejo a você um Feliz Natal repleto de amor, saúde e felicidade! Que o próximo ano seja incrível."
    }

};

// Esta é a função que o Vercel executa quando o navegador requisita /api/get-message

module.exports = (req, res) => {
    // 1. Pega o nome do usuário enviado na requisição (query parameter 'name')
    const nomeBusca = req.query.name; 

    // 2. Busca o conteúdo. Se o nome não existir, usa o padrão.
    let conteudo = mensagensEspeciais[nomeBusca] || mensagensEspeciais["padrao"];

    // 3. Envia a resposta (apenas a mensagem)
    res.status(200).json({
        data: conteudo
    });
};
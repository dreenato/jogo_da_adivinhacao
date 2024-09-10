let listaDeNumerosSorteados = [];
let limiteDeTentativas = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function textosDaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function mensagemInicial() {
    textosDaTela('h1', 'Jogo da Adivinhação.');
    textosDaTela('p', 'Escolha um número entre 1 e 100:');
}
mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        textosDaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        textosDaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            textosDaTela('p', 'O chute foi maior que o número secreto!');
        } else {
            textosDaTela('p', 'O chute foi menor que o número secreto!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteDeTentativas + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        listaDeNumerosSorteados = [];
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }    
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
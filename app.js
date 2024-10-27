/* Ver anotações no arquivo apps2.js. Neste aqui, apenas o código.*/
let listaDeNumeroSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio(); // Criamos uma variável que recebe uma função, não apenas strings ou nº.
let tentativa = 1;

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroMaximo + 1);
    let qtdElementosDaLista = listaDeNumeroSorteados.length;
    if (qtdElementosDaLista == numeroMaximo) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroGerado)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroGerado);
        //console.log (listaDeNumeroSorteados);
        return numeroGerado;
    }
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate : 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}:`);
}

exibirMensagemInicial();
//console.log (numeroSecreto);


function verificarChute() {
    let chute = document.querySelector('input').value;
      if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o Número Secreto após ${tentativa} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p',`O número secreto é menor que ${chute}.`);
        } else{
            exibirTextoNaTela('p',`O número secreto é maior que ${chute}.`);
        }
        tentativa++;
        limparCampo();       
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    console.log (numeroSecreto);
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

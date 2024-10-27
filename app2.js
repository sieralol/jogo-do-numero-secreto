/* Nessa aula aprenderemos diferentes formas de usar uma função.
> Temos uma função que não possui parâmetros e nem retorno, que é a função verificarChute().
    >> Função SEM RETORNO e SEM PARÂMETRO;
> Temos a função exibirTextoNaTela(). Ela realiza a tarefa de exibir um texto na tela, mas não esperamos que ela 
nos devolva uma informação. Por isso, ela possui parâmetros que são as informações que queremos exibir, mas não 
possui um retorno.
    >> Função SEM RETORNO e COM PARÂMETRO;
> Na função de gerarNumeroAleatorio(), não definimos nenhum parâmetro. Por isso, não tem nenhuma informação entre 
os parênteses. Contudo, há um retorno. Qual é o retorno? A geração de um número entre 1 e 10.
    >> Função COM RETORNO e SEM PARÂMETRO.

Nesse projeto, a intenção é deixar o jogo de adivinhação elaborado no primeiro curso mais amigável, com mais cara de
site de internet mesmo (a interação antes era por caixinhas que surgiam na tela). Para isso, usaremos o JS para manipular
um HTML. 

Nessa linguagem, o que define o título de uma página é a propriedade <h1> (no arquivo index.html está na linha 22) 
    // document é um termo reservado p/ selecionar documento e querySelector é para selecionar onde será feita a alteração
        //let titulo = document.querySelector ('h1');
        //titulo.innerHTML = 'Jogo do Número Secreto'; // innerHTML é que faz a inclusão do texto no h1
    // podemos tbm incluir um paragrafo, informando o que deve ser feito pelo usuário, definido por <p></p> na linha 23.
        let paragrafo = document.querySelector ('p');
        paragrafo.innerHTML = 'Escolha um número entre 1 e 10:';*/

/* Para aprimorar o código, podemos adotar uma boaprática: supondo que tivessemos 50 tags como <h1> ou <h2> ou <p>
e 50 textos para serem incluídos nessas tags, escreveríamos 50x o mesmo código só trocando duas informações desse 
código? 
Para resolver essa questão, pode-se criar uma função (FUNÇÃO COM PARÂMETRO) que faça essa alteração, onde será preciso 
apenas "chamar" a função para executar o código, conforme abaixo: 
obs: após definir o nome da função, é necessário informar entre os parenteses quais as informações serão "chamadas"*/
let listaDeNumeroSorteados = []; //fica vazia, pois ainda não foi gerado nenhum nº aleatório.
let numeroMaximo = 4;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1; //já recebe o valor 1, pois mesmo que acerte na primeira tentativa, houve 1 tentativa.

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate : 1.2}); /* o que será falado , em que idioma
    será falado (necessario verificar na documentação), e por ultimo, ajustar velocidade */
}

function exibirMensagemInicial () {
exibirTextoNaTela('h1','Jogo do Número Secreto');
exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}:`);
}

exibirMensagemInicial(); //como foi criada função, precisamos "chamá-la" para que apareça.

/* no design da página no navegador, há dois botões: um para realizar um chute e outro para novo jogo. Vamos nos 
concentrar na funcionalidade e ativação do botão CHUTE */
/* No html, na linha 27, há a termo verificarChute, agora temos que atribuir uma funçao (determina uma ação dentro
do código).*/

function verificarChute() { //console.log ('O botão foi clicado');
    /*Agora, vamos comparar o chute do usuário com o nº aleatório/secreto. no html, temos uma propriededade <input> 
    (linha 25 do arquivo index.html) que é onde o usuário irá inserir o chute dele.
    MAAAAS, como vamos comparar e validar com o nº secreto? */
    let chute = document.querySelector('input').value;
        /*Diferente do <h1> e <p>, não queremos exibir na tela, mas receber uma informação, por isso, não vamos usar 
        a função "exibirTextoNaTela(tag, texto)", vamos alterar a função verificarChute(), incluindo uma váriavel para
        receber apenas esse valor, para isso, devemos inserir a palavra reservada ".value".*/
    if(chute == numeroSecreto) {
        //console.log (chute == numeroSecreto); // vai mostrar console true ou false, TIPO BOOLEANO
        exibirTextoNaTela('h1', 'Acertou!!'); /* Seria interessante informar após qnts tentativas o usuário acertou o 
        nº secreto, para isso, criaremos a variável tentativas (fora da função).
        Talvez, se passarmos uma template string diretamente para exibirTextoNaTela, talvez o HTML não entenda. 
        Isso porque ele espera uma string e não uma template string, que é algo que somente o JavaScript entende.
        Por isso, vamos criar uma variavel chamada 'let mensagemTentativas'.*/
        let palavaTentativa = tentativas = 1 ? 'tentativa' : 'tentativas'; /*Caso acerte na primeira tentativa, a 
        palavra ficará no singular */
        let mensagemTentativas = `Você descobriu o número secreto com  ${tentativas} ${palavaTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas/*'Você descobriu o número secreto!'*/);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p',`O número secreto é menor que ${chute}`);
        } else{
            exibirTextoNaTela('p',`O número secreto é maior que ${chute}`);
        }
        tentativas++; 
        // conforme se vai errando o chute, vamos somando o valor das tentativas => tentativas = tentativas + 1
        limparCampo (); //ver função na linha 103.
    }
}  
function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroMaximo + 1);
    let qtdElementosDaLista = listaDeNumeroSorteados.length; // ver linha 156.
    if (qtdElementosDaLista == numeroMaximo){
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroGerado)){//verifica se a lista contem o nº aleatorio gerado - true/false
        return gerarNumeroAleatorio();
    }else{
        relacaoDeNumeroSorteados.push(numeroGerado);
        return numeroGerado;
    }
   /*  Nessa ultima função, esperamos o retorno desse nº aleatório... se deixarmos assim, o nº será gerado, mas nada
acontecerá. Então, vamos adicionar uma variável para armazenar esse nº aleatório, que nada mais é que o nosso nº 
secreto "let numeroSecreto = gerarNumeroAleatorio()", e dentro da função, antes da fórmula para gerar o nº aleatório,
inserir o termo "return", palavra reservada que irá atribuir (retornar) esse nº aleatório na variável criada.
    Após isso, é preciso imprimir/mostrar esse nº em algum lugar. Para isso, podemos substituir o texto da função 
verificarChute() afim de mostrar esse nº no console, ficando assim: console.log (numeroSecreto);
    No navegador, ao clicar no botão 'Chute', o número não será gerado repetidamente, o que acontece é que chamamos a
função de geração de número aleatório apenas uma vez. Essa primeira vez gerou o número 8 aleatoriamente. Nas vezes
seguintes, estamos apenas imprimindo o mesmo número.*/
}

//Limpar o campo de INPUT a cada tentativa errada.
function limparCampo() {
    chute = document.querySelector ('input');
    chute = " "; // após o chute errado, o campo imput deverá ficar vazio.
}

// Para ativar o botão NOVO JOGO, e não ter atualizar a pg para um novo jogo apos acertar a nº secreto
    /* Se repararmos, no Online o botão está desativado (em cinza) para ativar: HTML linha 28, 'ONCLICK ="" (vazio)' e
    quase no final, há a palavra 'disabled'. Vamos ter que alterar através de codificação no JS.
    O botão tem um ID unico para identificá-lo. SÓ DEVERÁ SER ATIVADO QND CHUTE = Nº SECRETO, portanto será codificado
    na função "verificarChute()" 
        >> document.getElementById('reiniciar').removeAttribute('disabled');
            getElementById('xxx') = vai selecionar o que será alterado pelo ID que é único.
            removeAttribute('xxx') = removerá a ação a ser inserida entre parenteses.
    Agora, vamos dar uma funcionalidade do botão através do onclick que está vazio. Lá no HTML, entre as aspas, vamos
    inserir o nome de uma função que vamos criar abaixo "reinicarJogo()".*/
function reiniciarJogo() {
/*quando reiniciamos o jogo, queremos que um novo nº aleatório seja gerado, que o campo de INPUT fique limpo, que o nº
de tentativa seja reiniciado, que o botão NovoJogo volte a ficar desabilitado, e Mudar as mensagens do titulo e do
paragrafo (para isso, sera criada uma nova função, chamada ), então: */
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true); 
}

/*Aula 04 - Listas / Array: vamos utilizar para que os nº aleatorios gerados não se repitam em novos jogos.
    Sempre que se tratar de lista, os itens serão definidos ente colchetes (maoria das linguagens usam isso):
        let exemploDeLista = ['ex01','ex02','ex03','ex04']; >> se for lista de nº não precisa de aspas.
    
        Toda vez que criamos uma lista, é possivel verificar o tamanho da lista:
        exemploDeLista.lenght; >> no nosso caso, o console retornaria 3.
    
    O primeiro item da lista está na posição/índice 0 (zero). O segundo, no índice 1 (um). Para acessar o terceiro item, 
    por ex, devemos chamar da seguinte maneira:
        exemploDeLista[2]; >> retornaria ex03.

    Em casos de Listas muito grandes, para acessar o ultimo item (chamado de índice), podemos:
        exemploDeLista[exemploDeLista.length - 1]; >> nesse caso retornaria ex04.

    EXISTEM DIVERSAS FUNCIONALIDADES DAS LISTAS... TEM CURSO NO ALURA.
    */

/*Ok, para esse caso, vamos ter que armazenar os numeros APÓS serem sorteadas, mas antes disso, vamos ter que declarar
numa variavel e verificar se nessa lista já não tem esse numero que acabou de ser sorteado.
Então a primeira coisa a se fazer é criar a variavel antes de chamar a função que cria esse nº aleatório.
No caso, constará na 1ª linha deste código. Depois, vamos alterar a função gerarNumeroAleatorio().

Para testarmos o código, alteramos o maior nº p/ 4 >> let numeroEscolhido = parseInt(Math.random() * 4 + 1);
Após jogarmos 4x o jogo, a lista foi completada, e ao tentar uma 5ª partida, apresntou erro:
        Uncaught RangeError: Maximum call stack size exceeded at gerarNumeroAleatorio 

Para corrigir, vamos verificar o nº max da Lista de nº Sorteados, e se for igual à qtd máxima de nº possiveis a 
serem sorteados, a lista deverá ser limpa.*/

// BONUUUUUSSSSS
/* Na linha 7 do HTML temos um código que NÃO É NATIVO do js, e foi inserido no projeto para permitir que a
máquina LEIA algumas coisas que estão na página
    >> RESPONSIVE VOICE - script src="https://code.responsivevoice.org/responsivevoice.js"></script> 
Vamos inserir no nosso projeto para ler os textos dos paragrafos, na função exibirTextoNaTela(tag,texto)*/
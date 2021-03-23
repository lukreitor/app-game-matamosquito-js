// definição de variaveis globais
let altura = 0; let largura = 0; let vidas = 1;
let tempo = 10;

var nivel = window.location.search /* search retorna tudo que esta a direta de ?, isto é os parametros */ 
nivel = nivel.replace('?', '') /* Substitui qualquer ponto de interrogaçao por caracter vazio */

var criaMosquitoTempo = 1500;

if (nivel === 'normal')
{
    // 1500
    criaMosquitoTempo = 1500
}
else if (nivel === 'dificil')
{ 
    criaMosquitoTempo = 1000
}
else if (nivel === 'chucknorris')
{
    criaMosquitoTempo =  750
}
else 
{
    criaMosquitoTempo = 1500
}

/* Funçao para obter as informações de largura da pagina */
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(largura, altura)

}

ajustaTamanhoPalcoJogo(); // para haver dinamismo na obtençao das informaçoes das dimensoes a funçao deve estar associada ao evento onresize do body

// Cronometro do jogo
var cronometro = setInterval(function() {
    tempo -= 1

    if (tempo < 0) 
    {
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = "vitoria.html"
    } 
    else 
    {
        document.getElementById('cronometro').innerHTML = tempo
    }

}, 1000)

//posicao randomica do mosquito 
// cordenadas x y cujos limitantes sao o tamanho da janela, evita o estou da pagina
function posicaoRandomica() {
    //remocao do mosquico (caso exista)
    if (document.getElementById('mosquito')) 
    {
        document.getElementById('mosquito').remove()
        
        if (vidas > 3)
        {
             window.location.href = 'fim_de_jogo.html';
        }
        else
        {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++
        }
    }
           
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;
    console.log(posicaoX, posicaoY);

    //controle caso posicoes menores que 0
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //criacao dos elementos html de forma dinamica e os adicionado ao body da pagina
    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio(); //atribuicao da classe com as dimensoes e orientacao dos elementos
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito'
    mosquito.onclick = function() { //remover o elemento
        this.remove();
    }

    document.body.appendChild(mosquito)
}

// Para variar o tamanho usar-se-a as formatacoes de tres classes css
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);
    
    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

// Funcao para variar a orientacao do mosquito, esta sera definida por classes css tambem
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
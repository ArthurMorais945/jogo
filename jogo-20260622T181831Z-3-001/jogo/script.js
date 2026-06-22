const pikachu = document.querySelector(".pikachu");
const bola = document.querySelector(".bola");
const raio = document.querySelector(".raio");

const gameOver = document.querySelector(".game-over");
const btnReiniciar = document.querySelector(".reiniciar");

const contadorPulos = document.getElementById("pulos");
const contadorTempo = document.getElementById("tempo");
const contadorEnergia = document.getElementById("energia");

let pulos = 0;
let tempo = 0;
let energia = 0;
let imune = false;
let jogoAtivo = true;

setInterval(() => {

    if(jogoAtivo){

        tempo++;

        contadorTempo.innerText = tempo;

    }

},1000);

function pular(){

    if(!jogoAtivo) return;

    pulos++;

    contadorPulos.innerText = pulos;

    if(pikachu.classList.contains("pulo")) return;

    pikachu.classList.add("pulo");

    setTimeout(() => {

        pikachu.classList.remove("pulo");

    },500);

}

const colisao = setInterval(() => {

    if(!jogoAtivo) return;

    const bolaPosicao = bola.offsetLeft;

    const pikachuPosicao =
    +window.getComputedStyle(pikachu)
    .bottom.replace("px","");

    if(
        bolaPosicao <= 120 &&
        bolaPosicao > 0 &&
        pikachuPosicao < 70 &&
        !imune
    ){

        jogoAtivo = false;

        bola.style.animation = "none";
        bola.style.left = `${bolaPosicao}px`;

        pikachu.style.animation = "none";
        pikachu.style.bottom = `${pikachuPosicao}px`;

        gameOver.style.visibility = "visible";
    }

},10);

setInterval(() => {

    if(!jogoAtivo) return;

    const raioPosicao = raio.offsetLeft;

    const pikachuPosicao =
    +window.getComputedStyle(pikachu)
    .bottom.replace("px","");

    if(
        raioPosicao <= 120 &&
        raioPosicao > 0 &&
        pikachuPosicao > 80
    ){

        energia += 20;

        if(energia > 100){

            energia = 100;

        }

        contadorEnergia.innerText = energia;

        raio.style.display = "none";

        setTimeout(() => {

            raio.style.display = "block";

        },1000);

        if(energia >= 100){

            energia = 0;

            contadorEnergia.innerText = energia;

            imune = true;

            pikachu.style.filter =
            "drop-shadow(0 0 20px yellow)";

            setTimeout(() => {

                imune = false;

                pikachu.style.filter = "none";

            },5000);

        }

    }

},10);

function reiniciarJogo(){

    location.reload();

}

btnReiniciar.addEventListener(
    "click",
    reiniciarJogo
);

document.addEventListener(
    "keydown",
    pular
);

document.addEventListener(
    "touchstart",
    pular
);
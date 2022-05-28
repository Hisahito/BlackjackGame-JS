/**
 * * 2C = TWO OF CLUBS
 * * 2D = TWO OF DIAMONDS
 * * 2H = TWO OF HEARTS
 * * 2S = TWO OF SPADES
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');

// Esta función crea una baraja de cartas
const crearDeck = () => {

    for (i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    } 

    for(let tipo of tipos) {
        for(let especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle( deck );
    console.log(deck);
    return deck;
}

crearDeck();

// Esta funcion me permite tomar una carta

const pedirCarta = () => {
    if( deck.length === 0){
        throw new Error('No hay cartas en el deck');
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}



// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21){
        console.warn("Lo siento pero te pasate de 21. Perdiste!")
        btnPedir.disabled = true
    } else if(puntosJugador === 21) {
        console.warn("Felicidades!! Ganaste!! ")
        btnPedir.disabled = true;
    }
})
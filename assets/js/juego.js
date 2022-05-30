

(() => {
    'use strict'

// Variables globales iniciales
let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
      especiales = ['J', 'Q', 'K', 'A'];
let puntosJugadores = [];

//let puntosJugador = 0,
//    puntosComputadora = 0;

// Referencias del HTML

const btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small'),
      divCartasJugadores = document.querySelectorAll('.divCartas')

// Esta funcion inicializa el juego
const inicializarJuego = ( numJugadores = 2) => {
       deck = crearDeck()
       for(let i = 0; i < numJugadores; i++){
           puntosJugadores.push(0)
       }
}

// Esta función crea una baraja de cartas
const crearDeck = () => {

    deck = [];
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

    return _.shuffle( deck );
}

// Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if( deck.length === 0){
        throw new Error('No hay cartas en el deck');
    }
    return deck.pop();
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

// Turno: 0 = primer jugador y el ultimo sera la computadora
const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const crearCarta = ( carta, turno) => {

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno.append(imgCarta)]
}

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    
    do {
        const carta = pedirCarta();
        acumularPuntos(carta, puntosJugadores.length - 1)
        crearCarta(carta, puntosJugadores.length - 1)
        
        if( puntosMinimos > 21 ){
            break
        }
        
    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ){
            alert("Nadie gana!")
        }else if( puntosMinimos > 21 ){
            alert("Computadora Gana!")
        }else if( puntosComputadora > 21 ){
            alert("Jugador Gana!");
        }else{
            alert("Computadora Gana!")
        }
    }, 25 );
}


// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21){
        console.warn("Lo siento pero te pasate de 21. Perdiste!")
        btnPedir.disabled = true
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if(puntosJugador === 21) {
        console.warn("Felicidades!! Ganaste!! ")
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
})

btnNuevo.addEventListener("click", () => {
    deck = crearDeck();

    //puntosComputadora = 0;
    //puntosJugador = 0;

    /*puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    */
})

})();


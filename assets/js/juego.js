/**
 * * 2C = TWO OF CLUBS
 * * 2D = TWO OF DIAMONDS
 * * 2H = TWO OF HEARTS
 * * 2S = TWO OF SPADES
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];

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
    if( deck.length = 0){
        throw new Error('No hay cartas en el deck');
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ?
            ( valor === "A" ) ? 11 : 10
            : valor * 1;
}

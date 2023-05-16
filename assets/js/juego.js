/**
 *  2C = (Tréboles)
 *  2D = (Diamantes)
 *  2H = (Corazones)
 *  2S = (Picas)
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0; //puntosHTML[1]
let puntosComputadora = 0; //puntosHTML[3]
let dinero = 10; //puntosHTML[2]


//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

//Fichas
let apuesta = 0; //puntosHTML[0]
const uno = document.querySelector('#uno');
const cinco = document.querySelector('#cinco');
const diez = document.querySelector('#diez');

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')


//Inciiamos dinero:
puntosHTML[2].innerText = dinero

//Funcion para crear baraja
const crearDeck = () => {

    for (let i = 2; i <= 10;  i++) {
        for(let tipo of tipos){
            deck.push( i + tipo );
        }
    }

    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push( esp + tipo );
        }
    }


    //Mezclar bajara (impostamos libreria underscore)
    deck = _.shuffle(deck)
    console.log(deck)
    return deck
}

crearDeck()

//Funcion para devolver una cara y sacarla de la baraja
const pedirCarta = () => {

    if (deck.length === 0){
        throw 'No hay más cartas en la baraja'
    }

    carta = deck.pop();
    return carta
}



//Funcion para saber el valor de la carta
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1)

    // si no es un numero, valor = A valor = 11 else valor = 10.
    // else (es un numero) valor * 1 para que devuelva un numero y no un string
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

//Turno de la compuradora
const turnoComputadora = ( puntuacionMinima ) => {

     do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
    
        puntosHTML[3].innerText = puntosComputadora
    
    
        //<!-- <img class="carta" src="assets/cartas/2C.png" alt=""> -->
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if ( puntuacionMinima > 21){
            break;
        }

     } while( (puntosComputadora < puntuacionMinima) && ( puntuacionMinima <= 21) );

     //Mensaje de victoria
     setTimeout (() => {
        if ( puntosComputadora === puntuacionMinima ){
            alert('Nadie gana :(')
            dinero = dinero + apuesta;
            puntosHTML[2].innerText = dinero;
        }else if ( ( puntuacionMinima > 21 ) ){
            alert('¡Perdiste!, gana la máquina')
        }else if ( puntosComputadora > 21 ){
            alert('¡Ganaste!')
            dinero = dinero + apuesta * 2;
            puntosHTML[2].innerText = dinero;
            
        }else {
            alert('¡Perdiste!, gana la máquina')
        }
    }, 20)
}


//Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[1].innerText = puntosJugador


    //<!-- <img class="carta" src="assets/cartas/2C.png" alt=""> -->
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);


    //Validación de puntos
    if ( puntosJugador > 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }else if( puntosJugador === 21) {
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


btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    apuesta = 0;
    puntosHTML[1].innerText = 0;
    puntosHTML[3].innerText = 0;
    puntosHTML[0].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})


//Eventos fichas
uno.addEventListener('click', () => {
    if ( dinero > 0 ){
        apuesta = apuesta + 1
        puntosHTML[0].innerText = apuesta
        dinero = dinero - 1;
        puntosHTML[2].innerText = dinero
    }else {
        alert( 'No tienes dinero suficiente ')
    }
})

cinco.addEventListener('click', () => {
    if ( dinero > 0 ){
        apuesta = apuesta + 5
        puntosHTML[0].innerText = apuesta
        dinero = dinero - 5;
        puntosHTML[2].innerText = dinero
    }else {
        alert( 'No tienes dinero suficiente ')
    }
})

diez.addEventListener('click', () => {
    if ( dinero > 0 ){
        apuesta = apuesta + 10
        puntosHTML[0].innerText = apuesta
        dinero = dinero - 10;
        puntosHTML[2].innerText = dinero
    }else {
        alert( 'No tienes dinero suficiente ')
    }
})

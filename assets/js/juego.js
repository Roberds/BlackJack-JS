/**
 *  2C = (Tréboles)
 *  2D = (Diamantes)
 *  2H = (Corazones)
 *  2S = (Picas)
 */


//PATRON MODULO(Encapsulación) => Funcion anonima autoinvocada, 
 (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    // let puntosJugador = 0, //puntosHTML[1]
    //     puntosComputadora = 0, //puntosHTML[3]
    let puntosJugadores = [];
    let apuesta = 0; //apuestaDinero[0]
    let dinero = 10; //apuestaDinero[1]


    //Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    //Fichas
    const uno = document.querySelector('#uno'),
          cinco = document.querySelector('#cinco'),
          diez = document.querySelector('#diez');

    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas'),
          apuestaDinero = document.querySelectorAll('span');

    //Inciiamos dinero:
    apuestaDinero[1].innerText = dinero;


    //Función para inciar el juego
    const iniciaJuego = ( numJugadores = 2) => {
         deck = crearDeck();
         
         puntosJugadores = [];
         for ( let i = 0; i < numJugadores; i++ ){
            puntosJugadores.push(0);
         }

        apuesta = 0;

        puntosHTML.forEach( elem => elem.innerText = 0 );
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        apuestaDinero[0].innerText = 0;

        divCartasJugadores.forEach( elem => elem.innerHTML = "" )

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    //Funcion para crear baraja
    const crearDeck = () => {
        
        deck = [];

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
        return _.shuffle(deck);
    }


    //Funcion para devolver una cara y sacarla de la baraja
    const pedirCarta = () => {

        if (deck.length === 0){
            throw 'No hay más cartas en la baraja'
        }

        //retorna la carta
        return deck.pop();
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

    //Turno: 0 = primer jugador, y el ultimo computadora.
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno) => {
         //<!-- <img class="carta" src="assets/cartas/2C.png" alt=""> -->
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append( imgCarta );
    }

    const ganador =  () => {

        const [ puntuacionMinima, puntosComputadora ] = puntosJugadores;

         //Mensaje de victoria
         setTimeout (() => {
            if ( puntosComputadora === puntuacionMinima ){
                alert('Nadie gana :(')
                dinero = dinero + apuesta;
                apuestaDinero[1].innerText = dinero;
            }else if ( ( puntuacionMinima > 21 ) ){
                alert('¡Perdiste!, gana la máquina')
            }else if ( puntosComputadora > 21 ){
                alert('¡Ganaste!')
                dinero = dinero + apuesta * 2;
                apuestaDinero[1].innerText = dinero;
                
            }else {
                alert('¡Perdiste!, gana la máquina')
            }
        }, 20)
    }


    //Turno de la compuradora
    const turnoComputadora = ( puntuacionMinima ) => {
        
        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );
        

            if ( puntuacionMinima > 21){
                break;
            }

        } while( (puntosComputadora < puntuacionMinima) && ( puntuacionMinima <= 21) );

        ganador()
       
    }


    //Eventos

    btnPedir.addEventListener('click', () => {

        
        const carta = pedirCarta();
        const puntosJugador =  acumularPuntos( carta, 0 );
        crearCarta( carta, 0 );

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
        
        turnoComputadora( puntosJugadores[0] );
    })


    btnNuevo.addEventListener('click', () => {

        iniciaJuego();

    })


    //Eventos fichas
    uno.addEventListener('click', () => {
        if ( dinero > 0 ){
            apuesta = apuesta + 1
            apuestaDinero[0].innerText = apuesta
            dinero = dinero - 1;
            apuestaDinero[1].innerText = dinero
        }else {
            alert( 'No tienes dinero suficiente ')
        }
    });

    cinco.addEventListener('click', () => {
        if ( dinero > 0 ){
            apuesta = apuesta + 5
            apuestaDinero[0].innerText = apuesta;
            dinero = dinero - 5;
            apuestaDinero[1].innerText = dinero;
        }else {
            alert( 'No tienes dinero suficiente ');
        }
    });

    diez.addEventListener('click', () => {
        if ( dinero > 0 ){
            apuesta = apuesta + 10
            apuestaDinero[0].innerText = apuesta
            dinero = dinero - 10;
            apuestaDinero[1].innerText = dinero
        }else {
            alert( 'No tienes dinero suficiente ')
        }
    });

    //Para hacer publica esta funcioón( habira que dar un nombre a la funcion anonima autoinvocada para acceder desde archivos externos)
    return {
       nuevoJuego: iniciaJuego
    };

 })()



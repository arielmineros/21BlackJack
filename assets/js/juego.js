(() => {
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const cartas = ['A', 'Q', 'J', 'K'];
    var puntosJugador = 0,
        puntosComputadora = 0;

    //Referencias del HTML
    //Etiquetas small donde se ven los puntos
    const smalls = document.querySelectorAll('small');
    //div id jugador-cartas
    const cartasDivJugador = document.querySelector('#jugador-cartas');
    const cartasDivComputadora = document.querySelector('#computadora-cartas');

    //Creando el mazo
    const createDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let carta of cartas) {
            for (let tipo of tipos) {
                deck.push(carta + tipo);
            }
        }
        deck = _.shuffle(deck);
        return deck;
    }
    createDeck();

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        while (puntosComputadora <= puntosMinimos) {
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            smalls[1].innerText = puntosComputadora;
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            cartasDivComputadora.append(imgCarta);
            if (puntosMinimos > 21) {
                break;
            }
        }
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana:(');
            } else if (puntosComputadora > 21 || (puntosMinimos < 21 && puntosComputadora < puntosMinimos)) {
                alert('El jugador gana');
            } else if ((puntosMinimos > 21) || (puntosComputadora < 21 && puntosMinimos < puntosComputadora) || (puntosComputadora === 21)) {
                alert('La computadora gana');
            }
        }, 10);
    }

    //Pidiendo carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        const ultima = deck.pop();
        return ultima;
    }
    //Obteniendo el valor de la carta
    const valorCarta = (ultima) => {
        let valor = ultima.substring(0, ultima.length - 1);
        return isNaN(valor) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;
    }

    //Eventos
    //Turno del jugador
    btnPedir.addEventListener('click', () => {
        //Guardamos la carta que pedimos
        const carta = pedirCarta();
        //Agregamos los puntos del jugador
        puntosJugador += valorCarta(carta);
        //Insertamos los puntos del jugador en la etiqueta small
        smalls[0].innerText = puntosJugador;
        //Creamos el elemento img
        const imgCarta = document.createElement('img');
        //Invocamos la carta que nos da el método pedirCarta()
        imgCarta.src = `assets/cartas/${carta}.png`;
        //Agregamos la imagen de la carta a la clase 'carta'
        imgCarta.classList.add('carta');
        //Insertamos la imagen dentro del div
        cartasDivJugador.append(imgCarta);
        if (puntosJugador > 21) {
            turnoComputadora(puntosJugador);
            alert('Lo siento, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        } else if (puntosJugador === 21) {
            turnoComputadora(puntosJugador);
            alert('¡Ganaste, genial!');
            btnPedir.disabled = true;
            btnDetener = true;
        }
    });
    //Botón Detener
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    //Botón Nuevo Juego
    btnNuevo.addEventListener('click', () => {
        puntosJugador = 0;
        puntosComputadora = 0;
        smalls[0].innerText = 0;
        smalls[1].innerText = 0;
        cartasDivComputadora.innerHTML = '';
        cartasDivJugador.innerHTML = '';
        btnDetener.disabled = false;
        btnPedir.disabled = false;
        createDeck();
    });
})();
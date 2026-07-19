let jugadores = []
let puntajes = []

// FUNCIONES DE FLECHA -----------------------------------------------------
// Como no se contaban con funciones pasamos ha hacer las funciones pero de flecha
//Se agregaran para evitar repetir en cada nivel del juego
//Se haran 2 funciones repetidas 

//FUNCION 1-------------
//EL QUE NOS ARMA EL MARCADOR CON LOS PUNTAJES
const armarMarcador = (jugadores, puntajes) => {
    let marcador = "PUNTAJES\n"
    for (let i = 0; i < jugadores.length; i++) {
        marcador +=
            jugadores[i] + ": " + puntajes[i] + " puntos\n"
    }
    return marcador
}
//FUNCION 2-------------
//EL QUE BUSCABA EL GANADOR COMPARANDO LOS PUNTAJES OBTENIDOS
const obtenerGanador = (puntajes) => {
    let ganador = 0
    for (let i = 1; i < puntajes.length; i++) {
        if (puntajes[i] > puntajes[ganador]) {
            ganador = i
        }
    }
    return ganador
}

//NIVEL 1------------------------------------------------------------------------

let cantidad = parseInt(prompt("Ingresa la cantidad de jugadores"))

for (let i = 0; i < cantidad; i++) {
    let nombre = prompt( "Ingrese el nombre del jugador " + (i + 1)
    )
    jugadores.push(nombre)
    puntajes.push(0)
}
//CANTIDAD DE COLORES
let colores = [ "rojo","azul","verde","amarillo","morado","rosado","naranja" ]
let ronda = 1

// INDICACION DE CUANTAS RONDAS SERAN- ESTE CASO 7
while (ronda <= 7) {
    alert("RONDA" + ronda)
    let turno = 0
    while (turno < jugadores.length) {
        let secuencia = []
        
// AUMENTO DE LA CANTIDAD DE COLORES PARA MEMORIZAR
        while (secuencia.length < ronda) {
            let aleatorio =
              Math.floor(Math.random() * colores.length)

            secuencia.push(colores[aleatorio])
        }
//TURNO DEL JUGADOR
        alert("Turno de " + jugadores[turno] + "\nMemoriza:\n" +  secuencia.join(" ")
        )

        let respuesta = prompt( "ESCRIBE LOS COLORES CON ESPACIOS:").toLowerCase()

        if (respuesta === secuencia.join(" ")) {

            alert("Atinaste: ganaste 10 puntos")
//VALOR DE LOS PUNTAJES
            puntajes[turno] += 10

        } else {

            alert("Incorrecto.\nLa respuesta era:\n" + secuencia.join(" "))
        }

        turno++
    }
//MARCADOR DE PUNTAJES
//-----CAMBIO CON FUNCION DE FLECHA-----
    alert(armarMarcador(jugadores, puntajes))

    ronda++
}
// SE DA EL GANADOR DEL NIVEL 1
//-----CAMBIO CON FUNCION DE FLECHA-----
let ganador = obtenerGanador(puntajes)

//ANUNCIO DE GANADOR
alert( "GANADOR DEL NIVEL 1:" + jugadores[ganador] + "\nPuntos:" + puntajes[ganador])

//CONTINUAR CON EL SIGUIENTE NIVEL
let continuar = prompt("DESEA CONTINUAR CON EL NIVEL 2 (si / no)")

if (continuar.toLowerCase() !== "si") {

    alert("EL JUEGO TERMINO")

} else {

    alert("COMENZAMOS CON EL NIVEL 2: NUMEROS")}


//NIVEL 2------------------------------------------------------------------------
// REINICIO DE PUNTAJES PARA EL NIVEL 2
    for (let i = 0; i < puntajes.length; i++) {
        puntajes[i] = 0
    }

    let ronda2 = 1

// INDICACION DE CUANTAS RONDAS SERAN- ESTE CASO 7
    while (ronda2 <= 7) {

        alert("RONDA" + ronda2)

        let turno2 = 0

        while (turno2 < jugadores.length) {

            let secuenciaNumeros = []
//DIFERENCIA CON EL NIVEL 1: SE USAN NUMEROS DE 2 DIGITOS AL AZAR           
// MODIFICACION: AUMENTO DE LA CANTIDAD DE NUMEROS PARA MEMORIZAR
            while (secuenciaNumeros.length < ronda2) {
                let aleatorio2 = Math.floor(Math.random() * 90) + 10

                secuenciaNumeros.push(aleatorio2)
            }
//TURNO DEL JUGADOR
            alert("Turno de " + jugadores[turno2] + "\nMemoriza:\n" +  secuenciaNumeros.join(" ")
            )

            let respuesta2 = prompt( "ESCRIBE LOS NUMEROS CON ESPACIOS:")

            if (respuesta2 === secuenciaNumeros.join(" ")) {

                alert("Atinaste: ganaste 10 puntos")
//VALOR DE LOS PUNTAJES
                puntajes[turno2] += 10

            } else {

                alert("Incorrecto.\nLa respuesta era:\n" + secuenciaNumeros.join(" "))
            }

            turno2++
        }
//MARCADOR DE PUNTAJES
//-----CAMBIO CON FUNCION DE FLECHA-----
        alert(armarMarcador(jugadores, puntajes))

        ronda2++
    }
// SE DA EL GANADOR DEL NIVEL 2
//-----CAMBIO CON FUNCION DE FLECHA-----
    let ganador2 = obtenerGanador(puntajes)

//ANUNCIO DE GANADOR
    alert( "GANADOR DEL NIVEL 2:" + jugadores[ganador2] + "\nPuntos:" + puntajes[ganador2])

//CONTINUAR CON EL SIGUIENTE NIVEL
    let continuar2 = prompt("DESEA CONTINUAR CON EL NIVEL 3 (si / no)")

    if (continuar2.toLowerCase() !== "si") {

        alert("EL JUEGO TERMINO")

    } else {

        alert("COMENZAMOS CON EL NIVEL 3: PERSONAJES DISNEY")


//NIVEL 3------------------------------------------------------------------------        
// REINICIO DE PUNTAJES PARA EL NIVEL 3
        for (let i = 0; i < puntajes.length; i++) {
            puntajes[i] = 0
        }

//LISTA DE PERSONAJES DISNEY (NOMBRES CORTOS, MAXIMO 5 LETRAS)
// MODIFICACION:  SE REGRESA A LA ESTRUCTURA DEL NIVEL 1 PERO CON PERSONAJES DE DISNEY

        let personajes = [ "elsa", "simba", "nemo", "dory", "olaf", "moana", "woody", "buzz", "mufasa", "aladdin", "ariel", "mulan", "tarzan"]

        let ronda3 = 1

// INDICACION DE CUANTAS RONDAS SERAN- ESTE CASO 7
        while (ronda3 <= 7) {

            alert("RONDA" + ronda3)

            let turno3 = 0

            while (turno3 < jugadores.length) {

                let secuenciaPersonajes = []
//DIFERENCIA CON LOS NIVELES ANTERIORES: SE USAN PERSONAJES DISNEY
// AUMENTO DE LA CANTIDAD DE PERSONAJES PARA MEMORIZAR- UNO POR RONDA
                while (secuenciaPersonajes.length < ronda3) {
                    let aleatorio3 =
                      Math.floor(Math.random() * personajes.length)

                    secuenciaPersonajes.push(personajes[aleatorio3])
                }
//TURNO DEL JUGADOR
                alert("Turno de " + jugadores[turno3] + "\nMemoriza:\n" +  secuenciaPersonajes.join(" ")
                )

                let respuesta3 = prompt( "ESCRIBE LOS PERSONAJES CON ESPACIOS:").toLowerCase()

                if (respuesta3 === secuenciaPersonajes.join(" ")) {

                    alert("Atinaste: ganaste 10 puntos")
//VALOR DE LOS PUNTAJES
                    puntajes[turno3] += 10

                } else {

                    alert("Incorrecto.\nLa respuesta era:\n" + secuenciaPersonajes.join(" "))
                }

                turno3++
            }
//MARCADOR DE PUNTAJES
//-----CAMBIO CON FUNCION DE FLECHA-----
            alert(armarMarcador(jugadores, puntajes))

            ronda3++
        }
// SE DA EL GANADOR DEL NIVEL 3
//-----CAMBIO CON FUNCION DE FLECHA-----
        let ganador3 = obtenerGanador(puntajes)

//ANUNCIO DE GANADOR
        alert( "GANADOR DEL NIVEL 3:" + jugadores[ganador3] + "\nPuntos:" + puntajes[ganador3])

    }

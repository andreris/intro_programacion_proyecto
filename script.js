let jugadores = []
let puntajes = []

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
    let marcador = "PUNTAJES\n"

    for (let i = 0; i < jugadores.length; i++) {

        marcador +=
            jugadores[i] + ": " + puntajes[i] + " puntos\n"
    }

    alert(marcador)

    ronda++
}
// SE DETERMINA EL GANADOR DEL NIVEL 1
let ganador = 0

for (let i = 1; i < puntajes.length; i++) {

    if (puntajes[i] > puntajes[ganador]) {
        ganador = i
    }
}
//ANUNCIO DE GANADOR
alert( "GANADOR DEL NIVEL 1:" + jugadores[ganador] + "\nPuntos:" + puntajes[ganador])

//CONTINUAR CON EL SIGUIENTE NIVEL
let continuar = prompt("DESEA CONTINUAR CON EL NIVEL 2 (si / no)")

if (continuar.toLowerCase() !== "si") {

    alert("EL JUEGO TERMINO")

} else {

    alert("COMENZAMOS CON EL NIVEL 2: NUMEROS")

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
// AUMENTO DE LA CANTIDAD DE NUMEROS PARA MEMORIZAR
            while (secuenciaNumeros.length < ronda2) {
                let aleatorio2 =
                  Math.floor(Math.random() * 90) + 10

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
        let marcador2 = "PUNTAJES\n"

        for (let i = 0; i < jugadores.length; i++) {

            marcador2 +=
                jugadores[i] + ": " + puntajes[i] + " puntos\n"
        }

        alert(marcador2)

        ronda2++
    }
// SE DETERMINA EL GANADOR DEL NIVEL 2
    let ganador2 = 0

    for (let i = 1; i < puntajes.length; i++) {

        if (puntajes[i] > puntajes[ganador2]) {
            ganador2 = i
        }
    }
//ANUNCIO DE GANADOR
    alert( "GANADOR DEL NIVEL 2:" + jugadores[ganador2] + "\nPuntos:" + puntajes[ganador2])

}
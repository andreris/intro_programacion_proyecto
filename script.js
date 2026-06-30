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
let colores = [ "rojo","azul","verde","amarillo","morado" ]

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

}

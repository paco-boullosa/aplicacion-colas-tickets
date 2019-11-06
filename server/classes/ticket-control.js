const fs = require('fs');

class Ticket {
    // Esta clase ayuda a controlar los tickets. No es necesario exportarla pq solo se usa internamente
    // Para crear un ticket se necesita el numero de ticket y el escritorio al que fue asignado
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


//clase ticket control
class TicketControl {

    // inicialización de la clase. Se dispara cuando se crea una nueva instancia de la clase. Ej: let x = new TicketControl
    constructor() {
        // propiedades
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.ticketsPendientes = []; // contiene todos los tickets pendientes
        this.ultimos4 = []; // se corresponde con los 4 tickets que se ven en pantalla

        // compruebo si hay datos en el archivo json donde se guarda la persistencia
        // al ser un archivo json no hace falta ningun modulo externo, vale el 'require'
        let data = require('../data/data.json');

        // cuando se empieza un nuevo día se reinician los tickets
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.ticketsPendientes = data.ticketsPendientes;
            this.ultimos4 = data.ultimos4;
        } else {
            // reiniciar contadores
            this.reiniciarContador();
        }
    }


    reiniciarContador() {
        // realmente no hace falta reiniciar los contadores porque se acaba de hacer en el constructor,
        // pero si es necesario grabar el fichero json
        this.ultimo = 0;
        this.ticketsPendientes = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha reinicializado el sistema');
    }


    siguienteTicket() {
        this.ultimo++;

        let ticket = new Ticket(this.ultimo, null);
        this.ticketsPendientes.push(ticket);

        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }


    obtenerUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }


    obtenerUltimos4() {
        return this.ultimos4;
    }


    atenderTicket(escritorio) {
        // si no hay tickets pendientes no se hace nada
        if (this.ticketsPendientes.length === 0) {
            return 'No hay tickets';
        }
        // Hay que coger el primer ticket pendiente y sacarlo de la lista de pendientes.
        // Se coge el primer ticket del array de pendientes
        let numeroTicket = this.ticketsPendientes[0].numero;
        // y se elimina ese ticket del array (shift) (elimina la primera posición del array) 
        this.ticketsPendientes.shift();
        // y crea un nuevo ticket que se va a atender
        let ticketAtender = new Ticket(numeroTicket, escritorio);
        // ahora agrega el ticket a atender al inicio del array (unshift)
        this.ultimos4.unshift(ticketAtender);
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // elimina el último elemento del array
        }
        console.log('-----------');
        console.log(this.ultimos4);
        this.grabarArchivo();
        return ticketAtender;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            ticketsPendientes: this.ticketsPendientes,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString); // el fs usa la ruta relativa a la carpeta principal de la aplicacion (en este caso /server)
    }

}


module.exports = {
    TicketControl
}
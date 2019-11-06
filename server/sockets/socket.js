const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();


io.on('connection', (client) => {

    // cuando se establece la conexion se emite un evento con el estado actual
    client.emit('estadoActual', {
        actual: ticketControl.obtenerUltimoTicket(),
        ultimos4: ticketControl.obtenerUltimos4()
    });


    client.on('siguienteTicket', (data, callback) => {
        let nuevoTicket = ticketControl.siguienteTicket();
        callback(nuevoTicket);
    });


    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                mensaje: 'Se debe especificar el escritorio'
            })
        }
        let ticket_a_atender = ticketControl.atenderTicket(data.escritorio);
        callback(ticket_a_atender);

        // Además, se tiene que actualizar la pantalla pública ya que un escritorio ha solicitado un nuevo ticket para atender.
        // Se hace mediante un mensaje de difusión y se captura desde la página "publico.html" de cualquier dispositivo que la tenga cargada
        client.broadcast.emit('actualizarUltimos4', {
            ultimos4: ticketControl.obtenerUltimos4()
        })
    });

});
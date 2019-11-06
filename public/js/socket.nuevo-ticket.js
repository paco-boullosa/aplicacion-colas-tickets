// establecer la conexión activa-activa con el servidor
var socket = io();


// lógica para detectar conexión / desconexión
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desonectado del servidor');
});


// cuando llega el mensaje 'estadoActual' del servidor (que se crea cuando se establece la conexion) se recibe el ticket actual
socket.on('estadoActual', function(ticket) {
    $('#lblNuevoTicket').text(ticket.actual);
});

// solicitud de nuevo ticket
$('#btNuevoTicket').on('click', function() {

    socket.emit('siguienteTicket', null, function(ticket) {
        $('#lblNuevoTicket').text(ticket);
    })

})
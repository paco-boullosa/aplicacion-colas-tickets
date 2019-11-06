var socket = io();

var lblTickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var lblEscritorios = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];

// ----------------------------------------------------------------

socket.on('estadoActual', function(data) {
    actualizaHML(data.ultimos4);
});


socket.on('actualizarUltimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHML(data.ultimos4);
});

// ----------------------------------------------------------------

function actualizaHML(ultimos4) {
    for (var i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}
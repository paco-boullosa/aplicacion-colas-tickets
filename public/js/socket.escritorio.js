// establecer la conexion
var socket = io();


var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = "index.html";
    throw new Error('El escritorio es obligatorio');
}

var escritorio = searchParams.get('escritorio');

$('#cabH1').text("Escritorio " + escritorio);

$("#btAtenderNext").on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp.numero) {
            $("#ticketEnCurso").text(resp.numero);
        } else {
            $("#ticketEnCurso").text(resp); // no hay más
        }
    });

});
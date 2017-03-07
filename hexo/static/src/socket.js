import $ from 'jquery'

var socket = new WebSocket("ws://" + window.location.host + "/");

socket.onmessage = function(e) {
    console.log(e.data)
    const message = JSON.parse(e.data)
    if (message.event) {
        $(document).trigger(message.event, message.data);
    }
}

socket.onopen = function(e) {
    console.log('websocket connected')
}

socket.trigger = function(event, data) {
    const message = {task: event, data: data}    
    socket.send(JSON.stringify(message))
}

window.socket = socket; // debug
window.$ = $; // debug
export default socket
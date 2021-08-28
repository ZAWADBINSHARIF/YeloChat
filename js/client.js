const socket = io('http://localhost:3000')

const messagingContainer = document.querySelector('.chatting-container')
const sendContainer = document.querySelector('.send-container')
const messageInp = document.querySelector('#messageInp')
const sendForm = document.querySelector('#sendForm')

const userName = window.prompt('What your name?')

function append(message, position) {

    const div = document.createElement('div');
    div.innerText = message;
    div.classList.add("messeageBox", position)
    messagingContainer.append(div)

}

sendForm.addEventListener('submit', e => {
    e.preventDefault()
    if (messageInp.value !== '') {
        const message = messageInp.value
        append(`${message}`, 'right')
        socket.emit('send', message)
        messageInp.value = ''
    }
})

socket.emit('new-user-joined', userName)

socket.on('user-joined', name => {
    append(`${name} joined in chat`, 'left')
})

socket.on('recevied', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

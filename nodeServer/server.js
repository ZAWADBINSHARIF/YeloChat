const io = require("socket.io")(process.env.PORT || 3000, {
    cors: {
        origin: "*"
    }
})

const users = {}

io.on("connection", socket => {


    socket.on('new-user-joined', userName => {
        users[socket.id] = userName
        console.log(`${userName} joined in chat`)
        socket.broadcast.emit('user-joined', userName)
    })

    socket.on('send', message => {
        socket.broadcast.emit('recevied', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', { message: "left the chat", name: users[socket.id] })
    })
})
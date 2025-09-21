const express = require('express')
const app = express()
const PORT = 3000

app.listen(PORT, () =>{
    console.log(`Server listening on http://localhost:${PORT}`);
})

app.use(express.json())

//router import
const userRouter = require('./routers/users')
const conversationRouter = require('./routers/conversations')
const messageRouter = require('./routers/messages')

app.get("/", (req, res) => {
    res.send("Chat server")
})

app.use('/api/users', userRouter)
app.use('/api/conversations', conversationRouter)
app.use('/api/messages', messageRouter)
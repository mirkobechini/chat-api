const messages = require('../data/messages')

function index(req, res) {
    const filtered_messages = messages
    if (req.query.is_read) {
        filtered_messages = messages.filter(message => messages.is_read == req.query.is_read)
    }

    res.status(200)
        .json({
            filtered_messages
        })
}

function show(req, res) {
    const messageId = parseInt(req.params.id)
    const message = messages.find(message => message.id === messageId)

    if (!message) {
        res.status(404)
            .json({
                error: true,
                message: "Message not found"
            })
    }

    res.status(200)
        .json({
            message
        })
}

function store(req, res) {
    const newId = messages[messages.length - 1].id + 1
    const newMessage = {
        id: newId,
        conversation_id: req.body.conversation_id,
        user_id: req.body.user_id,
        content: req.body.content,
        created_at: req.body.created_at,
        is_read: req.body.is_read
    }

    messages.push(newMessage)

    res.status(201)
        .json({
            newMessage
        })
}

function update(req, res) {

    const messageId = parseInt(req.params.id)
    const message = messages.find(message => message.id == messageId)

    if (!message) {
        res.status(404)
            .json({
                error: true,
                message: "Message not found"
            })
    }

    message.is_read = true

    res.status(204)
        .json({
            message
        })
}

function modify(req, res) {
    res.send("partially update message")
}

function destroy(req, res) {
    const messageId = parseInt(req.params.id)
    const message = messages.find(message => message.id == messageId)

    if (!message) {
        res.status(404)
            .json({
                error: true,
                message: "message not found"
            })
    }

    messages.splice(messages.indexOf(message), 1)

    res.status(204)
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}
const users = require('../data/users')

function index(req, res) {
    filteredUsers = users
    if (req.query.username) {
        filteredUsers = users.filter(user => user.username === req.query.username)
    }

    res.status(200)
        .json({
            filteredUsers
        })
}

function show(req, res) {
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id == userId)
    if (!user) {
        res.status(404)
            .json({
                error: true,
                message: "User not found"
            })
    }

    res.status(200)
        .json({
            user
        })
}

function store(req, res) {
    const newId = users[users.length - 1].id + 1

    const newUser = {
        id: newId,
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
        created_at: req.body.created_at
    }

    users.push(newUser)

    res.status(201)
        .json({
            newUser
        })
}

function update(req, res) {

    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId)

    if (!user) {
        res.status(404)
            .json({
                error: true,
                message: "User not found"
            })
    }

    const { username, email, avatar, created_at } = req.body

    user.username = username
    user.email = email
    user.avatar = avatar
    user.created_at = created_at

    res.status(204)
        .json({
            user
        })
}

function modify(req, res) {
    res.send("Partial update user")
}

function destroy(req, res) {
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId)

    if (!user) {
        res.status(404)
            .json({
                error: true,
                message: "User not found"
            })
    }

    users.splice(users.indexOf(user), 1)
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
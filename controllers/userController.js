const users = require('../data/users')

function index (req, res){
    filteredUsers = users
    if(req.query.username){
        filteredUsers = users.filter(user => user.username === req.query.username)
    }

    res.json({
        status:200,
        filteredUsers
    })
}

function show (req, res){
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id == userId)
    if(!user){
        res.json({
            status: 404,
            error: true,
            message: "User not found"
        })
    }

    res.json({
        status: 200,
        user
    })
}

function store (req, res){
    const newId = users[users.length - 1].id + 1

    const newUser = {
        id: newId,
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
        created_at: req.body.created_at
    }

    users.push(newUser)

    res.json({
        status: 201,
        newUser
    })
}

function update (req, res){

    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId)

    if(!user){
        res.json({
            status: 404,
            error: true,
            message: "User not found"
        })
    }

    const {username, email, avatar, created_at} = req.body

    user.username = username
    user.email = email
    user.avatar = avatar
    user.created_at = created_at

    res.json({
        status: 204,
        user
    })
}

function modify (req, res){
    res.send("Partial update user")
}

function destroy (req, res){
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId)

    if(!user){
        res.json({
            status: 404,
            error: true,
            message: "User not found"
        })
    }

    users.splice(users.indexOf(user), 1)
    res.json({
        status: 204
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}
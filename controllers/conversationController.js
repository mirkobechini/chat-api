const conversations = require('../data/conversations')

function index(req, res){
    const filteredConversation = conversations

    if(req.query.title){
        filteredConversation = conversations.filter(conversation => conversations.title.includes(req.query.title))
    }

    res.json({
        status: 200,
        filteredConversation
    })


}
function show(req, res){

    const conversationId = parseInt(req.params.id)
    const conversation = conversations.find(conversation => conversationId == conversation.id)

    if(!conversation){
        res.json({
            status: 404,
            error: true,
            message: "Conversation not found"
        })
    }

    res.json({
        status: 200,
        conversation
    })
}
function store(req, res){
    const newId = conversations[conversations.length - 1].id + 1

     console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY RAW:", req.body);
  console.log("BODY KEYS:", Object.keys(req.body || {}));

    const newConversation = {
        id: newId,
        title: req.body.title,
        participants: req.body.participants,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    }

    conversations.push(newConversation)

    res.json({
        status: 201,
        newConversation
    })
}
function update(req, res){
    const conversationId = parseInt(req.params.id)
    const conversation = conversations.find( conversation => conversation.id == conversationId)

    if(!conversation){
        res.json({
            status: 404,
            error: true,
            message: "Conversation not found"
        })
    }

    const {title, partecipants, created_at, updated_at} = req.body
    conversation.title = title
    conversation.participants = partecipants
    conversation.created_at = created_at
    conversation.updated_at = updated_at

    res.json({
        status: 204
    })
}
function modify(req, res){
    res.send("Partially updating conversation")
}
function destroy(req, res){
    const conversationId = parseInt(req.params.id)
    const conversation = conversations.find(conversation => conversation.id == conversationId)

    if(!conversation){
        res.json({
            status: 404,
            error: true,
            message: "Conversation not found"
        })
    }
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
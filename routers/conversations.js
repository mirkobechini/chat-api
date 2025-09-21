const express = require('express')
const router = express.Router()

const conversationController = require('../controllers/conversationController')

router.get('/', conversationController.index)
router.get('/:id', conversationController.show)
router.post('/', conversationController.store)
router.put('/:id', conversationController.update)
router.patch('/:id', conversationController.modify)
router.delete('/:id', conversationController.destroy)

module.exports = router
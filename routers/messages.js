const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messageController')


router.get('/', messageController.index)
router.get('/:id', messageController.show)
router.post('/', messageController.store)
router.put('/:id', messageController.update)
router.patch('/:id', messageController.modify)
router.delete('/:id', messageController.destroy)


module.exports = router
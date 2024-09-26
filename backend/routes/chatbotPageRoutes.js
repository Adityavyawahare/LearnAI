import express from 'express'
// import { getCourseInfo } from '../controllers/courseInfoController'
import { getChatHistory, getChatConversation, updateChatConversation, updateChatHistory, newChatHistory, deleteChatHistory } from '../controllers/chatbotController.js'

const router=express.Router({ mergeParams: true })

router.get('/', getChatHistory)
router.get('/', updateChatHistory)
router.get('/history', getChatHistory)
router.get('/:conversationId', getChatConversation)
router.put('/:conversationId', updateChatConversation)
router.post('/', newChatHistory)
router.delete('/:conversationId', deleteChatHistory)

export default router
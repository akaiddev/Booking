import express from 'express'
import { createRoom, createRoomReview, deleteRoom, getRoomById, getRooms, getTopRooms, updateRoom } from '../controllers/roomController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getRooms).post(protect, admin, createRoom)
router.route('/:id/reviews').post(protect, createRoomReview)
router.get('/top', getTopRooms)
router.route('/:id').get(getRoomById).delete(protect, admin, deleteRoom).put(protect, admin, updateRoom)

export default router

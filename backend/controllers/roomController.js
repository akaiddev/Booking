import asyncHandler from 'express-async-handler'
import Room from '../models/roomModel.js'

// @desc    Fetch all Rooms
// @route   GET /api/Rooms
// @access  Public

const getRooms = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {}

  const count = await Room.countDocuments({ ...keyword })
  const rooms = await Room.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ rooms, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single Room
// @route   GET /api/Room/:id
// @access  Public

const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id)

  if (room) {
    res.json(room)
  } else {
    res.status(404)
    throw new Error('Room not found')
  }
})

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin

const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id)

  if (room) {
    await room.remove()
    res.json({ message: 'Room removed' })
  } else {
    res.status(404)
    throw new Error('Room not found')
  }
})

// @desc    Create a Room
// @route   POST /api/rooms
// @access  Private/Admin

const createRoom = asyncHandler(async (req, res) => {
  const room = new Room({
    name: 'Sample name',
    rentPerDay: 0,
    user: req.user._id,
    image: ['/images/sample0.jpg', '/images/sample1.jpg', '/images/sample2.jpg'],
    type: 'None Delux',
    phoneNumber: 0,
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdRoom = await room.save()
  res.status(201).json(createdRoom)
})

// @desc    Update a Room
// @route   PUT /api/rooms/:id
// @access  Private/Admin

const updateRoom = asyncHandler(async (req, res) => {
  const { name, rentPerDay, description, image, type, phoneNumber, countInStock } = req.body

  const room = await Room.findById(req.params.id)

  if (room) {
    room.name = name
    room.rentPerDay = rentPerDay
    room.description = description
    room.image = image
    room.type = type
    room.phoneNumber = phoneNumber
    room.countInStock = countInStock
    const updatedRoom = await room.save()
    res.json(updatedRoom)
  } else {
    res.status(404)
    throw new Error('Room not found')
  }
})

// @desc    Create new review
// @route   POST /api/rooms/:id/reviews
// @access  Private

const createRoomReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const room = await Room.findById(req.params.id)

  if (room) {
    const alreadyReviewed = room.reviews.find((r) => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Room already reviewed')
    }

    const review = { name: req.user.name, rating: Number(rating), comment, user: req.user._id }

    room.reviews.push(review)

    room.numReviews = room.reviews.length

    room.rating = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length

    await room.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Room not found')
  }
})

// @desc    Get top rated rooms
// @route   GET /api/rooms/top
// @access  Public

const getTopRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({}).sort({ rating: -1 }).limit(3)

  res.json(rooms)
})

export { getRooms, getRoomById, deleteRoom, createRoom, updateRoom, createRoomReview, getTopRooms }

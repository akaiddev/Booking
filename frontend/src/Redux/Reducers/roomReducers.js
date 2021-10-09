import {
  ROOM_CREATE_FAIL,
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_RESET,
  ROOM_CREATE_REVIEW_FAIL,
  ROOM_CREATE_REVIEW_REQUEST,
  ROOM_CREATE_REVIEW_RESET,
  ROOM_CREATE_REVIEW_SUCCESS,
  ROOM_CREATE_SUCCESS,
  ROOM_DELETE_FAIL,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_TOP_FAIL,
  ROOM_TOP_REQUEST,
  ROOM_TOP_SUCCESS,
  ROOM_UPDATE_FAIL,
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_RESET,
  ROOM_UPDATE_SUCCESS,
} from '../Constants/roomConstants'

export const roomListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { loading: true, rooms: [] }
    case ROOM_LIST_SUCCESS:
      return { loading: false, rooms: action.payload.rooms, pages: action.payload.pages, page: action.payload.page }
    case ROOM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const roomDetailsReducer = (state = { room: { reviews: [], image: [] } }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return { loading: true, ...state }
    case ROOM_DETAILS_SUCCESS:
      return { loading: false, room: action.payload }
    case ROOM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const roomDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_DELETE_REQUEST:
      return { loading: true }
    case ROOM_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ROOM_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const roomCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_CREATE_REQUEST:
      return { loading: true }
    case ROOM_CREATE_SUCCESS:
      return { loading: false, success: true, room: action.payload }
    case ROOM_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ROOM_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const roomUpdateReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_UPDATE_REQUEST:
      return { loading: true }
    case ROOM_UPDATE_SUCCESS:
      return { loading: false, success: true, room: action.payload }
    case ROOM_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ROOM_UPDATE_RESET:
      return { room: {} }
    default:
      return state
  }
}

export const roomReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case ROOM_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case ROOM_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case ROOM_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const roomTopRatedReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_TOP_REQUEST:
      return { loading: true, rooms: [] }
    case ROOM_TOP_SUCCESS:
      return { loading: false, rooms: action.payload }
    case ROOM_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

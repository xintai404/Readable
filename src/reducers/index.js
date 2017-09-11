import {combineReducers} from 'redux'

import {
	SELECT_CATEGORY,
	SET_CATEGORIES,
	RECEIVE_POSTS,
	SORT_POSTS,
	ADD_POST,
	DEL_POST,
	EDIT_POST,
	VOTE_POST,
	RECEIVE_COMMENTS_BY_POST,

	RECEIVE_COMMENTS,
	SORT_COMMENTS,
	ADD_COMMENT,
	DEL_COMMENT,
	EDIT_COMMENT,
	VOTE_COMMENT,
} from '../actions'

function selectCategory(state="all", action){
	switch(action.type){
		case SELECT_CATEGORY: 
			return action.selectCategory
		default: 
			return 'all'
	}
}

function categories(state=[], action){
	switch(action.type){
		case SET_CATEGORIES:
			return action.categories
		default:
			return state
	}
}

const initComments ={
	orderBy: '',
	byId:{},
}

const initPosts = {
	orderBy: '',
	byId:{},
}   

function comment(state={}, action){
	switch(action.type){
		case EDIT_COMMENT:
			return {
				...state,
				...action.comment
			}

		case VOTE_COMMENT:
			return {
				...state,
				voteScore: state.voteScore + (action.vote==='upVote'? 1: action.vote==='downVote'?-1 : 0)
			}

		default:
			return state
	}
}
function post(state={}, action){
	switch(action.type){
		case EDIT_POST:
			return {
				...state,
				...action.post
			}

		case VOTE_POST:
			return {
				...state,
				voteScore: state.voteScore + (action.vote==='upVote'? 1: action.vote==='downVote'?-1 : 0)
			}
		 
		case RECEIVE_COMMENTS_BY_POST:
			return {
				...state,
				comments: action.comments.map(comment=> comment.id)
			}
		case ADD_COMMENT:
			return {
				...state,
				comments: state.comments.concat([action.comment.id])
			}

		case DEL_COMMENT:
			return {
				...state,
				comments: state.comments.filter(id => id!== action.id)
			}
		default:
			return state
	}
}

function posts(state=initPosts, action){
	let allIds, byId
	switch(action.type){
		case RECEIVE_POSTS:
			return {
				...state,
				byId: action.posts.reduce((obj, post)=>{
					obj[post.id] = post
					return obj
				},{})
			}

		case RECEIVE_COMMENTS_BY_POST:
			return {
				...state,
				byId: {
					...state.byId,
					[action.parentId]: post(state.byId[action.parentId], action)
				}
			}

		case ADD_POST:
			return {
				...state,
				byId:{
					...state.byId,
					[action.post.id]: action.post
				}

			}

		case EDIT_POST:
			return {
				...state,
				byId:{
					...state.byId,
					[action.post.id]: post(state.byId[action.post.id], action)
				}
			}

		case DEL_POST:
			return {
				...state,
				byId:{
					...state.byId,
					[action.id]: null,
				}
			}

		case VOTE_POST:
			return {
				...state,   
				byId:{
					...state.byId,
					[action.id]: post(state.byId[action.id], action)
				}
			}

		case SORT_POSTS:
			allIds = Object.keys(state.byId)
			allIds.sort((a,b) => {
				return state.byId[b][action.order] - state.byId[a][action.order]
			})
			return {
				...state,
				orderBy: action.order,
				byId: allIds.reduce((obj, id)=>{
					obj[id] = state.byId[id]
					return obj
				},{})
			}


		case SELECT_CATEGORY:
			byId = Object.assign({}, state.byId)
			Object.keys(byId).forEach(id=> {
				if(byId[id].category !== action.selectCategory)
					delete byId[id]
			})
			return {
				...state,
				byId: byId
			}

		case ADD_COMMENT:
			return {
				...state,
				byId: {
					...state.byId,
					[action.comment.parentId]: post(state.byId[action.comment.parentId], action)
				}
			}

		case  DEL_COMMENT:
			return {
				...state,
				byId: {
					...state.byId,
					[action.parentId]: post(state.byId[action.parentId], action)
				}
			}

		default:
			return state
	}
}

function comments(state=initComments, action){
	let allIds
	switch(action.type){
		case RECEIVE_COMMENTS:
			return {
				...state,
				byId: action.comments.reduce((obj, comment)=>{
					obj[comment.id] = comment
					return obj
				},{})
			}

		case ADD_COMMENT:
			return {
				...state,
				byId:{
					...state.byId,
					[action.comment.id]: action.comment
				}

			}

		case EDIT_COMMENT:
			return {
				...state,
				byId:{
					...state.byId,
					[action.comment.id]: comment(state.byId[action.comment.id], action)
				}
			}

		case DEL_COMMENT:
			return {
				...state,
				byId:{
					...state.byId,
					[action.id]: null,
				}
			}

		case VOTE_COMMENT:
			return {
				...state,
				byId:{
					...state.byId,
					[action.id]: comment(state.byId[action.id], action)
				}
			}

		case SORT_COMMENTS:
			allIds = Object.keys(state.byId)
			allIds.sort((a,b) => {
				return state.byId[b][action.order] - state.byId[a][action.order]
			})
			return {
				...state,
				orderBy: action.order,
				byId: allIds.reduce((obj, id)=>{
					obj[id] = state.byId[id]
					return obj
				},{})
			}

		default:
			return state
	}
}
export default combineReducers({
	selectCategory,
	categories,
	posts,
	comments
})
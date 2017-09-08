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
			return state
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
	items: []
}

const initPosts = {
	orderBy: '',
	items: []
}   


function posts(state=initPosts, action){
	let arr, order, idx
	switch(action.type){
		case RECEIVE_POSTS:
			return {
				...state,
				items: action.posts.filter(post => !post.deleted)
			}

		case ADD_POST:
			return {
				...state,
				items: state.items.concat([action.post])
			}

		case EDIT_POST:
			arr = state.items.slice()
			arr = arr.map(post => {
				if(post.id === action.post.id){
					return action.post
				}else{
					return post
				}
			})
			return {
				...state,
				items: arr
			}

		case DEL_POST:
			arr = state.items.slice()
			idx = arr.findIndex((post) => post.id === action.id)
			arr.splice(idx, 1)
			return {
				...state,
				items: arr
			}

		case VOTE_POST:
			arr = state.items.slice()
			arr = arr.map(post =>{
				if(post.id === action.id){
					post.voteScore += action.vote==='upVote'? 1: action.vote==='downVote'?-1 : 0
				}
				return post
			})
			return {
				...state,
				items: arr
			}

		case SORT_POSTS:
			order = action.order
			arr = state.items.slice()
			arr.sort((a,b) => {
				return b[order] - a[order]
			})
			return {
				orderBy: order,
				items: arr
			}


		case SELECT_CATEGORY:
			arr = state.items.slice()
			return {
				...state,
				items: arr.filter(post=> post.category === action.selectCategory)
			}

		default:
			return state
	}
}

function comments(state=initComments, action){
	let arr, order, idx
	switch(action.type){
		case RECEIVE_COMMENTS:
			return {
				...state,
				items: action.comments.filter(comment => !comment.deleted)
			}

		case ADD_COMMENT:
			return {
				...state,
				items: state.items.concat([action.comment])
			}

		case EDIT_POST:
			arr = state.items.slice()
			arr = arr.map(comment => {
				if(comment.id === action.comment.id){
					return action.comment
				}else{
					return comment
				}
			})
			return {
				...state,
				items: arr
			}

		case DEL_POST:
			arr = state.items.slice()
			idx = arr.findIndex((comment) => comment.id === action.id)
			arr.splice(idx, 1)
			return {
				...state,
				items: arr
			}

		case VOTE_POST:
			arr = state.items.slice()
			arr = arr.map(comment =>{
				if(comment.id === action.id){
					comment.voteScore += action.vote==='upVote'? 1: action.vote==='downVote'?-1 : 0
				}
				return comment
			})
			return {
				...state,
				items: arr
			}

		case SORT_POSTS:
			order = action.order
			arr = state.items.slice()
			arr.sort((a,b) => {
				return b[order] - a[order]
			})
			return {
				orderBy: order,
				items: arr
			}


		// case SELECT_CATEGORY:
		// 	arr = state.items.slice()
		// 	return {
		// 		...state,
		// 		items: arr.filter(comment=> comment.category === action.selectCategory)
		// 	}

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
import {combineReducers} from 'redux'

import {
	SELECT_CATEGORY,
	SET_CATEGORIES,
	RECEIVE_POSTS,
	SORT_POSTS,
	ADD_POST,
	DEL_POST,
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

const initPost = {
	id: null,
	timestamp: null,
	title: null,
	body: null,
	author: null,
	category: null,
	voteScore: null,
	deleted: null
}

const initComment ={
	id: null,
	parentId: null,
	timestamp: null,
	body: null,
	author: null,
	voteScore: null,
	deleted: null
}

const initPosts = {
	orderBy: '',
	items: []
}

// const post = (state=initPost, action){
// 	switch(action.type){
// 		case RECEIVE_POSTS:
// 			return {

// 			}

// 		default:
// 			return state;
// 	}
// }
// 
// function postsByCategory(state={}, action){
// 	switch(action.type){
// 		case RECEIVE_POSTS:
// 			return {
// 				...state,
// 				[action.category]: action.posts
// 			}
// 		default:
// 			return state
// 	}
// }

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
		case DEL_POST:
			arr = state.items.slice()
			idx = arr.findIndex((post) => post.id === action.id)
			arr.splice(idx, 1)
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

		default:
			return state
	}
}


export default combineReducers({
	selectCategory,
	categories,
	posts
})
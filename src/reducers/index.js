import {combineReducers} from 'redux'

import {
	SELECT_CATEGORY,
	SET_CATEGORIES,
	RECEIVE_POSTS,
	SORT_POSTS,
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

function posts(state=[], action){
	switch(action.type){
		case RECEIVE_POSTS:
			return action.posts

		case SORT_POSTS:
			let order = action.order
			let newState = state.slice()
			return newState.sort((a,b) => {
				return a[order] - b[order]
			})

		default:
			return state
	}
}


export default combineReducers({
	selectCategory,
	categories,
	posts
})
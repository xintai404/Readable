import * as api from '../utils/api'

export const SELECT_CATEGORY ='SELECT_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SORT_POSTS = 'SORT_POSTS'
export const ADD_POST = 'ADD_POST'
export const DEL_POST = 'DEL_POST'

export const selectCategory = selectCategory => {
	return {
		type: SELECT_CATEGORY,
		selectCategory
	}
}

export const receivePosts = (posts) => {
	return {
		type: RECEIVE_POSTS,
		posts
	}
}

export const setCategories = categories => {
	return {
		type: SET_CATEGORIES,
		categories
	}
}

export const fetchCategories = () => (dispatch) => {

	return api.getCategories()
			.then(function(data){
				let categories = data.categories.reduce((arr, item) => {
					arr.push(item.name)
					return arr
				},[])
				dispatch(setCategories(categories))
			})
}

export const fetchAllPosts = () => (dispatch) => {
	return api.getAllPosts()
			.then(data => dispatch(receivePosts( data)))
			.then(data => dispatch(orderPosts('voteScore')))
}

export const fetchPosts = category => (dispatch) => {
	return api.getPostsByCategory(category)
		.then(data => dispatch(receivePosts( data)))
	
}

export const orderPosts = order => {
	return {
		type: SORT_POSTS,
		order
	}
}

export const addPost = post => {
	return {
		type: ADD_POST,
		post
	}
}

export const delPost = id => {
	return {
		type: DEL_POST,
		id
	}
}

export const asyncAddPost = post => (dispatch, getState) => {
	return api.postPost(post)
			.then(() => dispatch(addPost(post)))
			.then(()=> dispatch(orderPosts(getState().posts.orderBy)))
}

export const asyncDelPost = id => (dispatch,getState) => {
	return api.delPost(id)
			.then(() => dispatch(delPost(id)))
}


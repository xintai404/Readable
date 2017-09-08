import * as api from '../utils/api'

export const SELECT_CATEGORY ='SELECT_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SORT_POSTS = 'SORT_POSTS'
export const ADD_POST = 'ADD_POST'
export const DEL_POST = 'DEL_POST'
export const EDIT_POST='EDIT_POST'
export const VOTE_POST= 'VOTE_POST'

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

export const editPost = post =>{
	return {
		type: EDIT_POST,
		post
	}
}

export const votePost = (id, vote) => {
	return {
		type: VOTE_POST,
		id,
		vote
	}
}

export const asyncVotePost = (id, vote) => (dispatch, getState) =>{
	return api.votePost(id, vote)
			.then(() => dispatch(votePost(id, vote)))
			.then(() => dispatch(orderPosts(getState().posts.orderBy)))
}

export const asyncAddPost = post => (dispatch, getState) => {
	return api.postPost(post)
			.then(() => dispatch(addPost(post)))
			.then(()=> dispatch(orderPosts(getState().posts.orderBy)))
}


export const asyncDelPost = id => (dispatch) => {
	return api.delPost(id)
			.then(() => dispatch(delPost(id)))
}

export const asyncEditPost = post => (dispatch) => {
	return api.editPost(post)
			.then(() => dispatch(editPost(post)))
}



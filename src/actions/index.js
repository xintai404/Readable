import * as api from '../utils/api'

export const SELECT_CATEGORY ='SELECT_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_CATEGORIES = 'SET_CATEGORIES'

export const selectCategory = selectCategory => {
	return {
		type: SELECT_CATEGORY,
		selectCategory
	}
}

export const receivePosts = (category,posts) => {
	return {
		type: RECEIVE_POSTS,
		category,
		posts
	}
}


export const fetchPosts = category => (dispatch) => {
	console.log('gggg')
	return api.getPostsByCategory(category)
		.then(data => dispatch(receivePosts(category, data)))
	
}



import * as api from '../utils/api'

export const SELECT_CATEGORY ='SELECT_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SORT_POSTS = 'SORT_POSTS'

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



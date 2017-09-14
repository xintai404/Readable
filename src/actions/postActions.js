import * as api from '../utils/api'
import {
	RECEIVE_POSTS,
	SORT_POSTS ,
	ADD_POST ,
	DEL_POST ,
	EDIT_POST,
	VOTE_POST,
	SELECT_CATEGORY ,
    SET_CATEGORIES, 
}from './type'

import {
	asyncDelComment
}from './commentActions'

export const selectCategory = selectCategory => {
	return {
		type: SELECT_CATEGORY,
		selectCategory
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

export const receivePosts = (posts) => {
	return {
		type: RECEIVE_POSTS,
		posts
	}
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

export const fetchAllPosts = () => (dispatch) => {
	let allPosts = []

	return api.getAllPosts()
			.then(posts => {
				allPosts = posts.map( post => 
					api.getCommentsByPost(post.id)
					.then(comments => {
						post.comments = comments.map(comment => comment.id)
						return post
					})

				)
				return Promise.all(allPosts)
				.then(posts => {
					posts = posts.filter(post => !post.deleted)
					return dispatch(receivePosts(posts))
				})
				.then(() => dispatch(orderPosts('voteScore')))

			})
}

export const fetchPosts = category => (dispatch) => {
	return api.getPostsByCategory(category)
		.then(data => dispatch(receivePosts( data)))
	
}

export const isNeedToFetchAllPosts = () => (dispatch, getState) => {
	if(Object.keys(getState().posts.byId).length === 0 ){
		return dispatch(fetchAllPosts())
	}else{
		return Promise.resolve()
	}
}

export const isNeedToFetchCategories = () => (dispatch, getState) => {
	if(getState().categories.length === 0){
		return dispatch(fetchCategories())
	}else{
		return Promise.resolve()
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


export const asyncDelPost = post => (dispatch) => {
	return Promise.all(post.comments.map(id => {
		return dispatch(asyncDelComment(id, post.id))
	}))
	.then(()=> 
		api.delPost(post.id)
			.then(() => dispatch(delPost(post.id)))
	
	)
}

export const asyncEditPost = post => (dispatch) => {
	return api.editPost(post)
			.then(() => dispatch(editPost(post)))
}
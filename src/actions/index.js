import * as api from '../utils/api'

export const SELECT_CATEGORY ='SELECT_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SORT_POSTS = 'SORT_POSTS'
export const ADD_POST = 'ADD_POST'
export const DEL_POST = 'DEL_POST'
export const EDIT_POST='EDIT_POST'
export const VOTE_POST= 'VOTE_POST'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DEL_COMMENT = 'DEL_COMMENT'
export const EDIT_COMMENT ='EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

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
	return api.getAllPosts()
			.then(data => dispatch(receivePosts( data)))
			.then(data => dispatch(orderPosts('voteScore')))
}

export const fetchPosts = category => (dispatch) => {
	return api.getPostsByCategory(category)
		.then(data => dispatch(receivePosts( data)))
	
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

export const receiveComments = (comments) => {
	return {
		type: RECEIVE_COMMENTS,
		comments
	}
}
export const orderComments = order => {
	return {
		type: SORT_COMMENTS,
		order
	}
}

export const addComment = comment => {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export const delComment = id => {
	return {
		type: DEL_COMMENT,
		id
	}
}

export const editComment = post =>{
	return {
		type: EDIT_COMMENT,
		post
	}
}

export const voteComment = (id, vote) => {
	return {
		type: VOTE_COMMENT,
		id,
		vote
	}
}

export const fetchComments = postId => (dispatch) => {
	return api.getCommentsByPost(postId)
		.then(data => dispatch(receiveComments( data)))
	
}
export const asyncVoteComment = (id, vote) => (dispatch, getState) =>{
	return api.voteComment(id, vote)
			.then(() => dispatch(voteComment(id, vote)))
			.then(() => dispatch(orderComments(getState().comments.orderBy)))
}

export const asyncAddComment = comment => (dispatch, getState) => {
	return api.postComment(comment)
			.then(() => dispatch(addComment(comment)))
			.then(()=> dispatch(orderComments(getState().comments.orderBy)))
}


export const asyncDelComment = id => (dispatch) => {
	return api.delComment(id)
			.then(() => dispatch(delComment(id)))
}

export const asyncEditComment = comment => (dispatch) => {
	return api.editComment(comment)
			.then(() => dispatch(editComment(comment)))
}



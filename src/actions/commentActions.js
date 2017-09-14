import * as api from '../utils/api'
import {
	RECEIVE_COMMENTS ,
	SORT_COMMENTS,
	ADD_COMMENT ,
	DEL_COMMENT,
	EDIT_COMMENT, 
	VOTE_COMMENT
}from './type'


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

export const delComment = (id, parentId) => {
	return {
		type: DEL_COMMENT,
		id,
		parentId
	}
}

export const editComment = comment =>{
	return {
		type: EDIT_COMMENT,
		comment
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
		.then(comments => {
			comments = comments.filter(comment => !comment.deleted && !comment.parentDeleted)
			return dispatch(receiveComments( comments))
		})
	
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

export const asyncDelComment = (id,parentId) => (dispatch) => {
	return api.delComment(id)
			.then(() => dispatch(delComment(id, parentId)))
}

export const asyncEditComment = comment => (dispatch) => {
	return api.editComment(comment)
			.then(() => dispatch(editComment(comment)))
}

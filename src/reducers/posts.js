import {
	RECEIVE_POSTS,
	SORT_POSTS,
	ADD_POST,
	DEL_POST,
	EDIT_POST,
	VOTE_POST,
	RECEIVE_COMMENTS_BY_POST,
	ADD_COMMENT,
	DEL_COMMENT,
} from '../actions/type'

const initPosts = {
	orderBy: 'voteScore',
	byId:{},
}

function post(state={}, action){
	switch(action.type){
		case ADD_POST:
			return {
				...state,
				...action.post,
				comments:[]
			}
		case EDIT_POST:
			return {
				...state,
				...action.post
			}

		case VOTE_POST:
			return {
				...state,
				voteScore: state.voteScore + (action.vote==='upVote'? 1: action.vote==='downVote'?-1 : 0)
			}
		 
		case RECEIVE_COMMENTS_BY_POST:
			return {
				...state,
				comments: action.comments.map(comment=> comment.id)
			}
		case ADD_COMMENT:
			return {
				...state,
				comments: state.comments?state.comments.concat([action.comment.id]): [action.comment.id]
			}

		case DEL_COMMENT:
			let comments = state.comments.slice()
			let idx = comments.indexOf(action.id)
			comments.splice(idx,1)
			return {
				...state,
				comments: comments
			}
		default:
			return state
	}
}

export default function posts(state=initPosts, action){
	let allIds, byId
	switch(action.type){
		case RECEIVE_POSTS:
			return {
				...state,
				byId: action.posts.reduce((obj, post)=>{
					obj[post.id] = post
					return obj
				},{})
			}

		case RECEIVE_COMMENTS_BY_POST:   
			return {
				...state,
				byId: {
					...state.byId,
					[action.parentId]: post(state.byId[action.parentId], action)
				}
			}

		case ADD_POST:
			return {
				...state,
				byId:{
					...state.byId,
					[action.post.id]: post(state.byId[action.post.id], action)
				}

			}

		case EDIT_POST:
			return {
				...state,
				byId:{
					...state.byId,
					[action.post.id]: post(state.byId[action.post.id], action)
				}
			}

		case DEL_POST:
			byId = Object.assign({}, state.byId)
			delete(byId[action.id])
			return {
				...state,
				byId: byId
			}

		case VOTE_POST:
			return {
				...state,   
				byId:{
					...state.byId,
					[action.id]: post(state.byId[action.id], action)
				}
			}

		case SORT_POSTS:
			allIds = Object.keys(state.byId)
			allIds.sort((a,b) => {
				return state.byId[b][action.order] - state.byId[a][action.order]
			})
			return {
				...state,
				orderBy: action.order,
				byId: allIds.reduce((obj, id)=>{
					obj[id] = state.byId[id]
					return obj
				},{})
			}

		case ADD_COMMENT:
			return {
				...state,
				byId: {
					...state.byId,
					[action.comment.parentId]: post(state.byId[action.comment.parentId], action)
				}
			}

		case  DEL_COMMENT:
			return {
				...state,
				byId: {
					...state.byId,
					[action.parentId]: post(state.byId[action.parentId], action)
				}
			}

		default:
			return state
	}
}
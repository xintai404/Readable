import {
	RECEIVE_COMMENTS,
	SORT_COMMENTS,
	ADD_COMMENT,
	DEL_COMMENT,
	EDIT_COMMENT,
	VOTE_COMMENT
} from '../actions/type'

const initComments ={
	orderBy: 'voteScore',
	byId:{},
}       

function comment(state={}, action){
	switch(action.type){
		case EDIT_COMMENT:
			return {
				...state,
				...action.comment
			}

		case VOTE_COMMENT:
			return {
				...state,
				voteScore: state.voteScore + (action.vote==='upVote'? 1: action.vote==='downVote'?-1 : 0)
			}

		default:
			return state
	}
}


export default function comments(state=initComments, action){
	let allIds, byId
	switch(action.type){
		case RECEIVE_COMMENTS:
			return {
				...state,
				byId: action.comments.reduce((obj, comment)=>{
					obj[comment.id] = comment
					return obj
				},{})
			}

		case ADD_COMMENT:
			return {
				...state,
				byId:{
					...state.byId,
					[action.comment.id]: action.comment
				}

			}

		case EDIT_COMMENT:
			return {
				...state,
				byId:{
					...state.byId,
					[action.comment.id]: comment(state.byId[action.comment.id], action)
				}
			}

		case DEL_COMMENT:
			byId = Object.assign({}, state.byId)
			delete byId[action.id]
			return {
				...state,
				byId: byId
			}

		case VOTE_COMMENT:
			return {
				...state,
				byId:{
					...state.byId,
					[action.id]: comment(state.byId[action.id], action)
				}
			}

		case SORT_COMMENTS:
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

		default:
			return state
	}
}
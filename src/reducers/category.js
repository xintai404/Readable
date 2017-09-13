import {
	SELECT_CATEGORY,
	SET_CATEGORIES,
} from '../actions/type'

export function selectCategory(state="all", action){
	switch(action.type){
		case SELECT_CATEGORY: 
			return action.selectCategory
		default: 
			return 'all'
	}
}

export function categories(state=[], action){
	switch(action.type){
		case SET_CATEGORIES:
			return action.categories
		default:
			return state
	}
}
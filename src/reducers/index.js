import {combineReducers} from 'redux'
import posts from './posts'
import comments from './comments'
import {selectCategory, categories} from './category'

export default combineReducers({
	selectCategory,
	categories,
	posts,
	comments
})
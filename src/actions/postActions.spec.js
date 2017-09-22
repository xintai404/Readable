import * as types from './type'
import * as actions from './postActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const posts = [
	{
		id: 'p1',
		deleted: false,
		comments: ['c1','c2'],
		voteScore: 1
	},
	{
		id: 'p2',
		deleted: false,
		comments: [],
		voteScore: 1
	}
]

const comments = [
	{id: 'c1'},
	{id: 'c2'},
]

describe('category actions', () =>{
	afterEach(() => {
		nock.cleanAll()
	})
	it('should create action to select category', ()=> {
		const selectCategory = 'react'
		const expectedAction = {
			type: types.SELECT_CATEGORY,
			selectCategory
		}
		expect(actions.selectCategory(selectCategory)).toEqual(expectedAction)
	})

	it('should need to get categories and create action to set categories', () => {
		const categories = [{name:'react'}, {name:'redux'}]
		nock('http://localhost:3001')
		.get('/categories')
		.reply(200, {categories: categories})

		const expectedAction = [
			{type: types.SET_CATEGORIES, categories: ['react', 'redux']}
		]

		const store = mockStore({categories: []})
		
		return store.dispatch(actions.isNeedToFetchCategories())
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should not to get categories and create action to set categories', () => {
		const expectedAction = []

		const store = mockStore({categories: ['react']})
		
		return store.dispatch(actions.isNeedToFetchCategories())
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})
})  

describe('post actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})

	it('should nedd to fetch all posts', () =>{
		nock('http://localhost:3001')
		.get('/posts')
		.reply(200, posts)

		nock('http://localhost:3001')
		.get('/posts/p1/comments')
		.reply(200, comments)

		nock('http://localhost:3001')
		.get('/posts/p2/comments')
		.reply(200, [])

		const expectedAction = [
			{type: types.RECEIVE_POSTS, posts},
			{type: types.SORT_POSTS, order: 'voteScore'}
		]

		const store = mockStore({posts: {byId: []}})

		return store.dispatch(actions.isNeedToFetchAllPosts())
			.then( () => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should not to fetch all posts', () => {
		const expectedAction = []

		const store = mockStore({posts: {byId: [1]}})

		return store.dispatch(actions.isNeedToFetchAllPosts())
			.then( () => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should get posts by category', ()=> {
		const category = 'react'
		const expectedAction = [{
			type: types.RECEIVE_POSTS, posts
		}]
		const store = mockStore({})

		nock('http://localhost:3001')
		.get('/react/posts')
		.reply(200, posts)


		return store.dispatch(actions.fetchPosts(category))
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should vote for post', () => {
		nock('http://localhost:3001')
		.post('/posts/p1', { 
			option: 'upVote'
		})
		.reply(201, {ok: true})

		const expectedAction = [
			{type: types.VOTE_POST, id: 'p1', vote: 'upVote'},
			{type: types.SORT_POSTS, order: 'voteScore'}
		]

		const store = mockStore({
			posts: {
				orderBy: 'voteScore'
			},
		})

		return store.dispatch(actions.asyncVotePost('p1', 'upVote'))
			.then( () => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should add post', ()=> {
		const post ={id: 'p1', voteScore: 1}
		nock('http://localhost:3001')
		.post('/posts', {...post})
		.reply(201, {ok: true})

		const expectedAction = [
			{type: types.ADD_POST, post},
			{type: types.SORT_POSTS, order: 'voteScore'}
		]

		const store = mockStore({
			posts: {
				orderBy: 'voteScore'
			},
		})

		return store.dispatch(actions.asyncAddPost(post))
			.then( () => {
				expect(store.getActions()).toEqual(expectedAction)
		})		
	})


	it('should edit post', () => {
		const post ={id: 'p1', title: 'watch', body: 'watch out'}
		nock('http://localhost:3001')   
		.put('/posts/p1', {
			title: post.title,
			body: post.body
		})
		.reply(200, {ok: true})

		const expectedAction = [
			{type: types.EDIT_POST, post},
		]

		const store = mockStore({})

		return store.dispatch(actions.asyncEditPost(post))
			.then( () => {
				expect(store.getActions()).toEqual(expectedAction)
		})	
	})

	it('should delete post', ()=> {
		const post ={id: 'p1', comments: [1,2]}
		nock('http://localhost:3001')
		.delete('/posts/p1')
		.reply(200, {ok: true})

		nock('http://localhost:3001')
		.delete('/comments/2')
		.reply(200, {ok: true})

		nock('http://localhost:3001')
		.delete('/comments/1')
		.reply(200, {ok: true})

		const expectedAction = [
			{type: types.DEL_COMMENT, id: 1, parentId: 'p1'},
			{type: types.DEL_COMMENT, id: 2, parentId: 'p1'},
			{type: types.DEL_POST, id: post.id},
			
		]     

		const store = mockStore({})

		return store.dispatch(actions.asyncDelPost(post))
			.then( () => {
				expect(store.getActions()).toEqual(expectedAction)
		})		
	})
})
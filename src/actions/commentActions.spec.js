import * as types from './type'
import * as actions from './commentActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const comments = [
	{
		id: 'c1',
		parentId: 'p1',
		deleted: false,
		parentDeleted:false,
		voteScore: 1
	},
	{
		id: 'c2',
		parentId: 'p1',
		deleted: false,
		parentDeleted: false,
		voteScore: 1
	}
]

describe('comment actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})

	it('should fetch all comments', () => {
		nock('http://localhost:3001')
		.get('/posts/p1/comments')
		.reply(200, comments)

		const expectedAction = [
			{type: types.RECEIVE_COMMENTS, comments}
		]

		const store = mockStore({})
		
		return store.dispatch(actions.fetchComments('p1'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should vote for comments', () => {
		nock('http://localhost:3001')
		.post('/comments/c1',{
			option: 'upVote'
		})
		.reply(200, comments)

		const content = {
			id: 'c1',
			vote:'upVote'
		}

		const expectedAction = [
			{type: types.VOTE_COMMENT, ...content},
			{type: types.SORT_COMMENTS, order: 'voteScore'}
		]

		const store = mockStore({comments: {
			orderBy: 'voteScore'
		}})
		
		return store.dispatch(actions.asyncVoteComment(content.id, content.vote))
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should add comment', () =>{
		const newComment = {
			id: 'c3',
			parentId: 'p1',
			deleted: false,
			parentDeleted: false,
			voteScore: 1
		}
		nock('http://localhost:3001')
		.post('/comments',{
			...newComment
		})
		.reply(201, {ok: true})

		const expectedAction = [
			{type: types.ADD_COMMENT, comment: newComment},
			{type: types.SORT_COMMENTS, order: 'voteScore'}
		]

		const store = mockStore({comments: {
			orderBy: 'voteScore'
		}})
		
		return store.dispatch(actions.asyncAddComment(newComment))
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should edit comment', () => {
		const newComment = {
			id: 'c1',
			parentId: 'p1',
			deleted: false,
			parentDeleted: false,
			voteScore: 1
		}
		nock('http://localhost:3001')
		.put('/comments/c1',{
			body: /.*/,
			timestamp: /.*/
		})
		.reply(200, {ok: true})

		const expectedAction = [
			{type: types.EDIT_COMMENT, comment: newComment}
		]

		const store = mockStore({comments: {
			orderBy: 'voteScore'
		}})
		
		return store.dispatch(actions.asyncEditComment(newComment))
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})

	it('should del comment', () => {
		nock('http://localhost:3001')
		.delete('/comments/c1')
		.reply(200, {ok: true})

		const delComment = {id: 'c1', parentId: 'p1'}
		const expectedAction = [
			{type: types.DEL_COMMENT, ...delComment}
		]

		const store = mockStore({comments: {
			orderBy: 'voteScore'
		}})
		
		return store.dispatch(actions.asyncDelComment(delComment.id, delComment.parentId))
			.then(() => {
				expect(store.getActions()).toEqual(expectedAction)
		})
	})
})


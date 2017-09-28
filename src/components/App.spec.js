import ConnectedApp , { App } from './App'
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import PostList from './PostList'

const mockStore = configureStore()
function setup(){
	const initStore = {
		categories: ['react', 'redux'],
		posts: {
			byId:{
				p1:{     
					id: 'p1',
					voteScore:1
				}
			}
		}
	}

	const store = mockStore(initStore)
	const props = {
		categories: initStore.categories,
		posts: initStore.posts,
		fetchCategories: jest.fn(),
		fetchAllPosts: jest.fn()
	}

	return {
		props,
		store
	}
}
describe('<App />', () => {
	it('render <App /> without error', () =>{
		const { props } = setup()
		const wrapper = shallow(<App {...props} />)
		expect(wrapper.length).toEqual(1)

		expect(wrapper.first('div').hasClass('container')).toBe(true)
		expect(wrapper.find('.list > li').length).toBe(2)

		expect(wrapper.find(PostList).length).toBe(1)
		wrapper.instance().componentDidMount();
		expect(props.fetchCategories.mock.calls.length).toBe(1)
		expect(props.fetchAllPosts.mock.calls.length).toBe(1)
	})

	it('render connected <App /> without error', () => {
		const { store } = setup()
		const wrapper = shallow(<ConnectedApp store={store} />)
		expect(wrapper.length).toEqual(1)
		expect(wrapper.find(App).length).toBe(1)
		expect(wrapper.find(App).prop('categories').length).toBe(2)
		expect(wrapper.find(App).prop('posts').length).toBe(1)
	})
})
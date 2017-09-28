import NotFound from './NotFound'
import React from 'react'
import { shallow } from 'enzyme'

describe('<NotFound />', () => {
	it('render <NotFound /> without error', () =>{
		const wrapper = shallow(<NotFound/>)
		expect(wrapper.length).toEqual(1)

		expect(wrapper.first('div').length).toBeTruthy()
		expect(wrapper.find('h2').length).toBe(1)
	})
})
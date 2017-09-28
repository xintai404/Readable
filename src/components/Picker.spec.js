import Picker from './Picker'
import React from 'react'
import { shallow } from 'enzyme'

describe('<Picker />', () => {
	it('render <Picker /> without error', () =>{
		const props = {
			value: 'react',
			options:['react', 'redux'],
			onChange: jest.fn()
		}
		const wrapper = shallow(<Picker {...props}/>)
		expect(wrapper.length).toEqual(1)

		expect(wrapper.first('div').length).toBeTruthy()
		expect(wrapper.find('select').length).toBe(1)
		expect(wrapper.find('select').prop('value')).toBe('react')
		expect(wrapper.find('option').length).toBe(2)
		wrapper.find('select').simulate('change', {target: {value: 'redux'}})
		expect(props.onChange.mock.calls.length).toBe(1)
	})
})
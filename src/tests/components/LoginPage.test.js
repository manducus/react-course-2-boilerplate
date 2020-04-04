import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { LoginPage } from '../../components/LoginPage'

let startLogin, wrapper

beforeEach(() => {
    startLogin = jest.fn()
    wrapper = shallow(<LoginPage startLogin={startLogin}/>)
});

test('should correctly render LoginPage', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
});

test('should call startLogin on button click', () => {
    wrapper.find("button").simulate("click")
    expect(startLogin).toHaveBeenCalled();
});
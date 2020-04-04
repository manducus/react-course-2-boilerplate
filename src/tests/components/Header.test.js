import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { Header } from '../../components/Header'

// react-test-renderer allows us to render our components inside of jest regular JS code,
// nad then we can assert something about what got rendered.

// there are 2 main ways we can test react components
// - shallow rendering
// - full (DOM) rendering

// snapshots allow us to track changes to data over time
// press "u" key after test to update snapshot

let startLogout, wrapper

beforeEach(() => {
    startLogout = jest.fn()
    wrapper = shallow(<Header startLogout={startLogout}/>)
});

test('should render Header correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
    // const renderer = new ShallowRenderer()
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});
// toJSON takes the wrapper and extracts just the meaningful stuff, the rendered output

test('should call startLogout on button click', () => {
    wrapper.find("button").simulate("click")
    expect(startLogout).toHaveBeenCalled();
});
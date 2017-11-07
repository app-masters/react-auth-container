import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Auth from './auth';

describe('Auth test', () => {
    it('should render component', () => {
        const wrapper = shallow(<Auth />);
        expect(wrapper.find('.Auth').length).toBe(1);
    });
});

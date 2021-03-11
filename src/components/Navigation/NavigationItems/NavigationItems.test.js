import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter:new Adapter()})

describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
         wrapper=shallow(<NavigationItems/>);
    });
    it('should render two <NavigationItems/> when user is no authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render two <NavigationItems/> when user is authenticated',()=>{
        // wrapper=shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render two <NavigationItems/> when there is a logout button or not  ',()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem links="/logout">Logout</NavigationItem>)).toEqual(true);
    });
})
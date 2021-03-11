import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buildcontrols from '../../components/Burger/BuildControls/BuildControls';
import {BurgerBuilder} from './BurgerBuilder';
configure({adapter:new Adapter()})

describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
         wrapper=shallow(<BurgerBuilder  onInitIngredient={()=>{}}/>);
    });
    it('should render Buildcontrol when ing is passed',()=>{
        wrapper.setProps({ing:{Salad:0}});
        expect(wrapper.find(Buildcontrols)).toHaveLength(1);
    });
   
})
import React from "react";
import ReactDOM from 'react-dom';
import App from '../App';
import Flights from "../components/Flights";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';

configure({adapter: new Adapter()});

const props = {
  loading:
  flights:
}

describe('Composant Flights', () => {

  

  it('renders without crashing', () => {
    const wrapper = shallow(<Flights />)

    expect(wrapper).to.contain(<GuessCount guesses={0} />)
  })
})

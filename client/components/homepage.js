import React, {Component} from 'react'
import FooterWithUs from './footerWithUs';
import Filters from './filters';

class Homepage extends Component {
  render() {
    return (
      <div>
        <Filters/>
        <FooterWithUs/>
      </div>
    )
  }
}

export default Homepage

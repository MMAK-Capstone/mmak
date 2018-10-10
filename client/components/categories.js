import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/categories'
import {withRouter} from 'react-router-dom'
import FooterWithUs from './footerWithUs';
import Filters from './filters';

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.match.params.categoryName
    }
  }

  componentDidMount() {
    this.props.fetchCategory(this.state.type)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const nextType = this.props.match.params.categoryName
    if (nextType !== this.state.type) {
      this.setState(
        {
          type: nextType
        },
        this.props.fetchCategory(nextType)
      )
    }
  }

  render() {
    const type = this.props.match.params.categoryName
    const typeCategory = this.props.typeCategory

    if (!typeCategory.length) {
      return <div>
        <h2>No Games Yet</h2>
        <FooterWithUs/>
      </div>
    } else {
      if (typeCategory.length === 1){
        return (
          <div>
            <Filters/>
              <div className="imgClassFirst"><img src={typeCategory[0].gif} width="350" height="438"/>
                <div class="aFun">{typeCategory[0].description}</div>
              </div>
            <FooterWithUs/>
          </div>
        )
      } else {
        return (
          <div>
            <Filters/>
              <div className="imgClassFirst"><img src={typeCategory[0].gif} width="350" height="438"/>
                <div className="a">{typeCategory[0].description}</div>
              </div>
            <div className="imgClass"><img src={typeCategory[1].gif} width="350" height="438"/>
              <div className="b">{typeCategory[1].description}</div>
            </div>
            <FooterWithUs/>
          </div>
        )
      }
    }
  }
}

{/*<div><img src={typeCategory[0].gif} width="400" height="500"/></div>*/}
{/*<div className="b">{typeCategory[0].description}</div>*/}

//{typeCategory.map(game => (<div key={game.id}>{game.gif}</div>))}

const mapStateToProps = state => {
  return {
    typeCategory: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: category => {
      dispatch(fetchCategory(category))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))

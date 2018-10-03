import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/categories'
import {Link, withRouter} from 'react-router-dom'


class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: this.props.match.params.categoryName
    }
  }

  componentDidMount(){
    this.props.fetchCategory(this.state.type);
    console.log("we are in componentDidMount", this.props);
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

  render(){
    const type = this.props.match.params.categoryName;
    const typeCategory = this.props.typeCategory;
    console.log("we are in Categories Component", typeCategory);

    if (!typeCategory.length) return <h2>No Games Yet</h2>
    return (
      <div>
        <h1>{type}</h1>
        <div>
          {typeCategory.map(game => (<div key={game.id}>{game.gif}</div>))}
        </div>
      </div>
    )
  }
}

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

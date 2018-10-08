import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { addNewReview, getSingleGame } from '../store/game';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Review extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      rating: 0
    }

    this.onStarClick = this.onStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleSubmit = event => {
    event.preventDefault()
    const {rating} = this.state
    console.log(`here are the props within handlesbumit of the review component`, this.props)
    this.props.postReview(rating);
    this.props.history.push(`/game/${this.props.match.params.gameId}`)
  }
 
  render() {
    const { rating } = this.state;
    const {classes} = this.props;
    const reviews = this.props.reviews
    return (                
        <div>
          <h2>Game Rating: {rating}</h2>
          <form onSubmit={this.handleSubmit} target="_self" method="GET">
            <StarRatingComponent 
              name="reviewRating" 
              starCount={10}
              editing = {true}
              value={this.state.rating}
              onStarClick={this.onStarClick}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Submit Rating
            </Button>
          </form>
        </div>
    ); 
  }
}
Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log(`here is the state in the review component`, state)
  return {
    reviews: state.gameReducer.singleGame.reviews,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleGame: id => dispatch(getSingleGame(id)),
    postReview: review => dispatch(addNewReview(review))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Review)));


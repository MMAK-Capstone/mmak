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
    this.props.postReview({rating, gameId: this.props.match.params.gameId, userId: this.props.user.id});
    this.props.history.push(`/game/${this.props.match.params.gameId}`)
  }

  componentDidMount(){
    this.props.getSingleGame(this.props.match.params.gameId)
  }

  render() {
    const { rating } = this.state;
    const {classes} = this.props;
    console.log(`here are the props`, this.props)
    const reviews = this.props.reviews;
    const user = this.props.user.username
    return (                
        <div>
          <h2>Game Rating: {rating}</h2>
          <form onSubmit={this.handleSubmit} target="_self" method="POST">
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
          <h2>Previous Game Reviews</h2>
          <ul>
            {reviews? reviews.map(review => (
              <li key ={review.id}>
                Rating#{review.id}:
                <StarRatingComponent
                  name="reviewRating"
                  starCount={review.rating}
                  value={review.rating}
                  starColor="Blue"
                />
              </li>
            )): null}
          </ul>
        </div>
    ); 
  }
}
Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    reviews: state.gameReducer.singleGame.reviews,
    user: state.user,
    singleGame: state.gameReducer.singleGame
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleGame: id => dispatch(getSingleGame(id)),
    postReview: review => dispatch(addNewReview(review))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Review)));


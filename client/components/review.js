import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleSubmit = event => {
    event.preventDefault()
    const {rating} = this.state
    this.props.postReview({ rating });
  }
 
  render() {
    const { rating } = this.state;
    const {classes} = this.props;
    return (                
      <div>
        <h2>Game Rating: {rating}</h2>
        <form target="_self" method="GET">
          <StarRatingComponent 
            name="reviewRating" 
            starCount={10}
            editing = {true}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <Button align="center" variant="contained" color="primary" className={classes.button}>
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
  return {
    
  }
}
export default withStyles(styles)(Review);


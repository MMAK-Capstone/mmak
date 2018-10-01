import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <AppBar position="static">
      <Toolbar>
         <Typography variant="title" color="inherit" style={{flexGrow: 1}}>Mmak's Game Room</Typography>
      {isLoggedIn ? (
        <div>
          <Button color="inherit" component={Link} to="/homepage">HomePage</Button>
          <a href="#" onClick={handleClick}>Logout</a>
        </div>
      ) : (
        <div>
          <Button color="inherit" component={Link} to="/login" >Login</Button>
          <Button color="inherit" component={Link} to="/signup" >Sign Up</Button>
        </div>
      )}
      </Toolbar>
    </AppBar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

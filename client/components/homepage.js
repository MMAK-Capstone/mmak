import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'



class Homepage extends Component {
  render(){
    return (
      <div>
    <AppBar position="static">
      <Toolbar>

        <Typography variant="title" color="inherit">NiceLogo</Typography>
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </Toolbar>
    </AppBar>

    </div>);
  }
}

import React from 'react';
import Iframe from 'react-iframe';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
  });
  
const GamePage = () => (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">Mmak's Game Room</Typography>
                <Button component={Link} to="/">Homepage</Button>
                <Button>Logout</Button>
                <Button component={Link} to="/dashboard">Your Dashboard</Button>
            </Toolbar>
        </AppBar>
        <h1>This is the Game Page</h1>
        <Iframe url="https://test-game-46120.firebaseapp.com/"
                width="100%"
                height="650px"
                id="myId"
                className="myGames"
                display="initial"
                position="relative"
                allowFullScreen/>
    </div>
)

export default withStyles(styles)(GamePage);
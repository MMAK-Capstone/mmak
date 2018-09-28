import React, {Component} from 'react';
import Iframe from 'react-iframe';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
    },
  });
  
class Dashboard extends Component {
    render (){
        return (
            <div>
            <h1>This is the Dashboard</h1>
                <Iframe url="https://test-game-46120.firebaseapp.com/"
                width="450px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                allowFullScreen/>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);
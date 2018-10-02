import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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

    rightToolbar: {
      marginLeft: 'auto',
      marginRight: -12
    }, 

    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: 900,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    }
  });

let testGames = [
  {
    name: "City Runner" ,
    description: "Zip through the city and avoid running into the obstacles. If you do, then you'll restart the level. Try to get the best score possible. And have fun!",
    gif: "/gamePics/testgame.gif",
    score: 250
  
  },

  {
    name: "Puzzle Happiness" ,
    description: "Solve the puzzle before the timer goes off so that you can see your beautiful creation.",
    gif: "/gamePics/testpuzzle.gif",
    score: 35
  
  }
];

const Dashboard = (props) => {
  const {classes} = props;
  return (
    <div>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">Mmak's Game Room</Typography>
              <Button component={Link} to="/">Homepage</Button>
              <Button>Logout</Button>
              <section className={classes.rightToolbar}>
            <Typography variant="title" color="inherit">Hello, Asya!</Typography>
              </section>
          </Toolbar>
      </AppBar>
          <h1 align = "center">This is the Dashboard</h1>
          <div className={classes.root}>
            <GridList align ="center" cellHeight={500} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto', width:'auto'}}>
                <ListSubheader component="div">Your Dashboard</ListSubheader>
              </GridListTile>
              {testGames.map(game => (
                <GridListTile key={game.gif}>
                  <img src={game.gif} alt={game.name} />
                  <GridListTileBar
                    title={game.name}
                    subtitle={<span>{game.description}</span>}
                    actionIcon={
                      <IconButton className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
    </div>

  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
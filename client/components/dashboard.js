import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    gridList: {
      width: 1000,
      height: 500
    }
  });

//TODO: Link up redux and remove dummy data from let testGames through let testUser. 
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

let testUser = 
  {
    username: "Asya-Is-Awesome",
    imageUrl: '/pictures/Asya.jpg'
  };


const Dashboard = (props) => {
  const {classes} = props;
  return (
    <div>
      <h2 align = "center" >Hello {testUser.username}</h2> 
      <div align="center"><Avatar src={testUser.imageUrl}/></div>
          <div className={classes.root}>
            <GridList align ="center" cellHeight={180} spacing ={40} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto'}}>
                <ListSubheader component="div">Your Dashboard</ListSubheader>
              </GridListTile>
              {testGames.map(game => (
                <GridListTile key={game.gif}>
                  <img src={game.gif} alt={game.name} />
                  <GridListTileBar
                    title={game.name}
                    subtitle={<span>Current Score: {game.score}</span>}
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
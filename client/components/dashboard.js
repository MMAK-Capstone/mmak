import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom'

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
      height: 350
    }
  });

//TODO: Link up redux and remove dummy data from let testGames through let testUser. 
let testGames = [
  {
    id: 1,
    name: "Math Masters" ,
    description: "Are the math facts and riddles true or false? Earn 100 points to win!",
    gif: "/gamePics/math-masters.gif",
    score: 250,
    gameUrl:"https://kswright.itch.io/math-masters"
  
  },

  {
    id: 2,
    name: "CityRunner" ,
    description: "Solve the puzzle before the timer goes off so that you can see your beautiful creation.",
    gif: "/gamePics/testpuzzle.gif",
    score: 35, 
    gameUrl:"https://test-game-46120.firebaseapp.com/"
  
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
      <h2 align = "center" className="greeting">Hello {testUser.username}</h2> 
      <div align="center"><Avatar src={testUser.imageUrl}/></div>
          <div className={classes.root}>
            <GridList align ="center" cellHeight={180} spacing ={40} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto'}}>
                <ListSubheader component="div">Your Dashboard</ListSubheader>
              </GridListTile>
              {testGames.map(game => (
                <GridListTile key={game.gif}>
                <a href={`/game/${game.id}`}>
                  <img src={game.gif} alt={game.name} />
                </a>
                  <GridListTileBar
                    titlePosition="top" title={<Link to={`/game/${game.id}`} className="link">{game.name}</Link>}
                    // subtitle={<span>Current Score: {game.score}</span>} {/*Use this functionality if we can get link score from the game to the dashboard*/}
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
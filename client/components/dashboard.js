import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom'
import Review from './review';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 10,
      paddingBottom: theme.spacing.unit * 50,//if we add more colums, increase the spacing
    },
    gridList: {
      width: 2000,
      height: 1000
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
    gameUrl:"https://mmak-math-masters.firebaseapp.com/",
    category: "edu"
  
  },

  {
    id: 2,
    name: "Island Runner" ,
    description: "How long can you run through the island while dodging vines and branches? Play this game to find out!",
    gif: "/gamePics/island-runner.gif",
    score: 35, 
    gameUrl:"https://island-runner-9bd31.firebaseapp.com/",
    category: "fun"
  
  },
  {
  id: 3,
    name: "Science Fighter" ,
    description: "Help the scientist defeat the environmental injustices! Complete level 3 in order to win!",
    gif: "/gamePics/testgame.gif",
    score: 35, 
    gameUrl:"https://test-game-46120.firebaseapp.com/",
    category: "edu"
  
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
      <h2 align = "center" className="greeting">Welcome to Your Dashboard, {testUser.username}</h2> 
      <div align="center"><Avatar src={testUser.imageUrl}/></div>
          <div className={classes.root}>
            <GridList align ="center" cellHeight={45} cols={1}spacing ={250} className={classes.gridList}>
              {testGames.map(game => (
                <div class="parent">
                <GridListTile class="child inline-block-child" align="center" key={game.gif} style={{height: 650, width: 450}}>
                <a href={`/game/${game.id}`}>
                  <img src={game.gif} alt={game.name} />
                </a>
                  <GridListTileBar
                    titlePosition="top" title={<Link to={`/game/${game.id}`} className="link">{game.name}</Link>}
                  />
                  <Review/>
                </GridListTile>
                </div>
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
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllGames} from '../store/game';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 10,
      paddingBottom: theme.spacing.unit * 50,//Increase the spacing in order to add more columns
    },
    gridList: {
      width: 2000,
      height: 1000
    }
  });

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  componentDidMount(){
    this.props.getAllGames()
  }

  render(){
    const {classes} = this.props;
    const games = this.props.games;
    const user = this.props.user
  return (
    <div>
      <h2 align = "center" className="greeting">Welcome to the Game Room, {user.username}</h2> 
          <div className={classes.root}>
            <GridList align ="center" cellHeight={45} cols={1}spacing ={250} className={classes.gridList}>
              {games.map(game => (
                <div class="parent">
                <GridListTile class="child inline-block-child" align="center" key={game.gif} style={{height: 650, width: 450}}>
                <a href={`/game/${game.id}`}>
                  <img src={game.gif} alt={game.name} />
                </a>
                  <GridListTileBar
                    titlePosition="top" title={<Link to={`/game/${game.id}`} className="link">{game.name}</Link>}
                  />
                </GridListTile>
                </div>
              ))}
            </GridList>
          </div>
          
    </div> 
  )
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user,
    games: state.gameReducer.games
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllGames: () => dispatch(getAllGames())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard)));
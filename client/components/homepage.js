import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    "width": 1000,
    "height": 'auto',
    "overflowY": 'auto',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  indvCell:{
    "borderRadius": 45,
  },
});

const we = [
  {
    img: '/pictures/Michelle.JPG',
    title: 'Michelle',
    description: "ansakkk"
  },
  {
    img: '/pictures/Megha.jpg',
    title: 'Megha',
    description: "kjkjdkjsk"
  },
  {
    img: '/pictures/Asya.jpg',
    title: 'Asya',
    description:"jhjhjhjk"
  },
  {
    img: '/pictures/Keyairra.png',
    title: 'Keyairra',
    description:"djshdshdjk"
  },
];

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
        <Tabs>
          <Tab label="Education Game">
            <div>
              <h2>Education Game</h2>
            </div>
          </Tab>
          <Tab label="Fun Game">
            <div>
              <h2>Fun Game</h2>
            </div>
          </Tab>
        </Tabs>
          <div style={styles.root}>
            <GridList cellHeight={100} style={styles.gridList} cols={2}>
              {we.map((tile) => (
                <GridListTile key={tile.img} style={styles.indvCell}>
                  <Avatar alt={tile.title} src={tile.img}/>
                  <GridListTileBar title={tile.title} subtitle={tile.description} actionIcon={
                    <IconButton><StarBorderIcon/></IconButton>
                  }/></GridListTile>
              ))}
            </GridList>
          </div>
    </div>
    );
  }
}

export default withStyles(styles)(Homepage);



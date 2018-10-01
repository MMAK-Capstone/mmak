import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
    description: "Michelle is a Fullstack Engineer who would enjoy working someplace that loves paying it forward to their communities",
    linkedin: "https://www.linkedin.com/in/michellemessenger/",
  },
  {
    img: '/pictures/Megha.jpg',
    title: 'Megha',
    description: "Megha is an Energetic and Passionate Fullstack developer able to build a Web presence from the ground up from concept, navigation, layout and programming. Would like to work with Software Development Co. for front-end and back-end",
    linkedin:"https://www.linkedin.com/in/megha-25/"
  },
  {
    img: '/pictures/Asya.jpg',
    title: 'Asya',
    description:"Asya would love to work in FinTech and just to work :)",
    linkedin: "https://www.linkedin.com/in/asya-slutskaya-978242141/"
  },
  {
    img: '/pictures/Keyairra.png',
    title: 'Keyairra',
    description:"Keyairra is a Fullstack Javascript Developer who is interested in EdTech, Gaming, and Social Impact companies",
    linkedin: "https://www.linkedin.com/in/keyairra-s-wright/"
  },
];

class Homepage extends Component {
  render(){
    return (
    <div>
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
            <GridList cellHeight={110} style={styles.gridList} cols={4}>
              {we.map((tile) => (
                <GridListTile key={tile.img} style={{flexGrow: 2}}>
                  <Avatar src={tile.img}/>
                  <GridListTileBar title={tile.title} subtitle={tile.description} actionIcon={
                    <a href={tile.linkedin}><IconButton><StarBorderIcon/></IconButton></a>
                  }/></GridListTile>
              ))}
            </GridList>
          </div>
    </div>
    );
  }
}

export default withStyles(styles)(Homepage);

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/categories'
import {Link, withRouter} from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'
import Paper from '@material-ui/core/Paper/Paper'
import GridList from '@material-ui/core/GridList/GridList'
import GridListTile from '@material-ui/core/GridListTile/GridListTile'
import Avatar from '@material-ui/core/Avatar/Avatar'
import GridListTileBar from '@material-ui/core/GridListTileBar/GridListTileBar'
import IconButton from '@material-ui/core/IconButton/IconButton'
import StarBorderIcon from '@material-ui/core/SvgIcon/SvgIcon'
import {withStyles} from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    'width': 1000,
    'overflowY': 'auto'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  indvCell: {
    'borderRadius': 45
  }
})

const we = [
  {
    img: '/pictures/Michelle.JPG',
    title: 'Michelle',
    description: 'Michelle is a Fullstack Engineer who would enjoy working someplace that loves paying it forward to their communities',
    linkedin: 'https://www.linkedin.com/in/michellemessenger/'
  },
  {
    img: '/pictures/Megha.jpg',
    title: 'Megha',
    description: 'Megha is an Energetic and Passionate Fullstack developer able to build a Web presence from the ground up from concept, navigation, layout and programming. Would like to work with Software Development Co. for front-end and back-end',
    linkedin: 'https://www.linkedin.com/in/megha-25/'
  },
  {
    img: '/pictures/Asya.jpg',
    title: 'Asya',
    description: 'Asya would love to work in FinTech and just to work :)',
    linkedin: 'https://www.linkedin.com/in/asya-slutskaya-978242141/'
  },
  {
    img: '/pictures/Keyairra.png',
    title: 'Keyairra',
    description: 'Keyairra is a Fullstack Javascript Developer who is interested in EdTech, Gaming, and Social Impact companies',
    linkedin: 'https://www.linkedin.com/in/keyairra-s-wright/'
  }
]

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.match.params.categoryName
    }
  }

  componentDidMount() {
    this.props.fetchCategory(this.state.type)

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const nextType = this.props.match.params.categoryName
    if (nextType !== this.state.type) {
      this.setState(
        {
          type: nextType
        },
        this.props.fetchCategory(nextType)
      )
    }
  }

  render() {
    const type = this.props.match.params.categoryName
    const typeCategory = this.props.typeCategory

    if (!typeCategory.length) {
      return <div>
        <Paper>
          <Tabs indicatorColor="secondary" centered>
            <Tab className="flash" label="You should login for playing"/>
            <Tab label="Education Game" component={Link} to="/categories/edu"/>
            <Tab label="Fun Game" component={Link} to="/categories/fun"/>
            <Tab className="flash" label="You should login for playing"/>
          </Tabs>
        </Paper>
        <h2>No Games Yet</h2>
        <div className="footer">
          <div style={styles.root}>
            <GridList cellHeight={110} style={styles.gridList} cols={4}>
              {we.map((tile) => (
                <GridListTile key={tile.img} style={{flexGrow: 2}}>
                  <Avatar src={tile.img}/>
                  <GridListTileBar title={tile.title} actionIcon={
                    <a href={tile.linkedin}><IconButton><StarBorderIcon/></IconButton></a>
                  }/>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    } else {
      return (
        <div>
          <Paper>
            <Tabs indicatorColor="secondary" centered>
              <Tab className="flash" label="You should login for playing"/>
              <Tab label="Education Game" component={Link} to="/categories/edu"/>
              <Tab label="Fun Game" component={Link} to="/categories/fun"/>
              <Tab className="flash" label="You should login for playing"/>
            </Tabs>
          </Paper>
          <div><img src={typeCategory[0].gif} width="400" height="500"/></div>
          <div className="b">{typeCategory[0].description}</div>
          <div className="footer">
            <div style={styles.root}>
              <GridList cellHeight={110} style={styles.gridList} cols={4}>
                {we.map((tile) => (
                  <GridListTile key={tile.img} style={{flexGrow: 2}}>
                    <Avatar src={tile.img}/>
                    <GridListTileBar title={tile.title} actionIcon={
                      <a href={tile.linkedin}><IconButton><StarBorderIcon/></IconButton></a>
                    }/>
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
        </div>
      )
    }
  }
}

//{typeCategory.map(game => (<div key={game.id}>{game.gif}</div>))}

const mapStateToProps = state => {
  return {
    typeCategory: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: category => {
      dispatch(fetchCategory(category))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Categories)))

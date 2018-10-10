import React, {Component} from 'react'
import FooterWithUs from './footerWithUs';
import Filters from './filters';

class Homepage extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        <Paper>
          <Tabs indicatorColor="secondary" centered>
            <Tab className="flash" label="Login To Play"/>
            <Tab label="Education Game" component={Link} to="/categories/edu"/>
            <Tab label="Fun Game" component={Link} to="/categories/fun"/>
            <Tab className="flash" label="Login To Play"/>
          </Tabs>
        </Paper>
        <div class="footer">
        <div style={styles.root}>
          <GridList cellHeight={110} style={styles.gridList} cols={4}>
            {we.map((tile) => (
              <GridListTile key={tile.img} style={{flexGrow: 2}}>
                <Avatar src={tile.img}/>
                <GridListTileBar title={tile.title} subtitle={tile.description} actionIcon={
                  <a href={tile.linkedin}><Tooltip title={tile.description}><IconButton><StarBorderIcon/></IconButton></Tooltip></a>
                }/>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
=======
        <Filters/>
        <FooterWithUs/>
>>>>>>> 9afc5da31c38b98e2c528aa444195fb4e6f63008
      </div>
    )
  }
}

export default Homepage

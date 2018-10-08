import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import Review from './review';
import {getSingleGame} from '../store/game';

class GamePage extends React.Component {
    constructor (){
        super()
    }

    componentDidMount(){
        console.log(`here are the props in the game component`, this.props)
        this.props.getSingleGame(this.props.match.params.gameId)
    }

    render(){
        const game = this.props.singleGame;
        return(
            <div>
                <h2 align='center' className="game">{game.name}</h2> 
                <div class="resp-container">
                    <iframe class="resp-iframe" src={game.gameUrl} gesture="media"  allow="encrypted-media" allowfullscreen scrolling="no"></iframe>
                </div>
                <Review/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        singleGame: state.gameReducer.singleGame
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getSingleGame: id => dispatch(getSingleGame(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (GamePage));
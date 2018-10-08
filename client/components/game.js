// import React from 'react';

// let testGames = [
//     {
//       id: 1,
//       name: "Math Masters" ,
//       description: "Are the math facts and riddles true or false? Earn 100 points to win!",
//       gif: "/gamePics/math-masters.gif",
//       score: 250,
//       gameUrl:"https://mmak-math-masters.firebaseapp.com/",
//       category: "edu"
    
//     },
  
//     {
//       id: 2,
//       name: "Island Runner" ,
//       description: "How long can you run through the island while dodging vines and branches? Play this game to find out!",
//       gif: "/gamePics/island-runner.gif",
//       score: 35, 
//       gameUrl:"https://island-runner-9bd31.firebaseapp.com/",
//       category: "fun"
    
//     },
//     {
//     id: 3,
//       name: "Science Fighter" ,
//       description: "Help the scientist defeat the environmental injustices! Complete level 3 in order to win!",
//       gif: "/gamePics/testgame.gif",
//       score: 35, 
//       gameUrl:"https://test-game-46120.firebaseapp.com/",
//       category: "edu"
    
//     }
// ]

// const GamePage = () => (
//     <div>
//         {testGames.map(game => (
//             <div>
//                 <h2 align='center' className="game">{game.name}</h2> 
//                 <div class="resp-container">
//                 <iframe class="resp-iframe" src={game.gameUrl} gesture="media"  allow="encrypted-media" allowfullscreen scrolling="no"></iframe>
//                 </div>
//             </div>
//         )
//         )}
//     </div>
// )

// export default GamePage;


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {getSingleGame} from '../store/game';

class GamePage extends Component {
    constructor (){
        super()
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.props.getSingleGame(Number(this.props.id))
    }

    render(){
        const game = this.props.singleGame;
        if (this.props.error){
            return (
                <div>
                    <h1>Sorry, game not found</h1>
                    <NavLink to='/dashboard'>
                    Return to Your Dashboard
                    </NavLink>
                </div>
            )
        }
        return(
            <div>
                <h2 align='center' className="game">{game.name}</h2> 
                <div class="resp-container">
                    <iframe class="resp-iframe" src={game.gameUrl} gesture="media"  allow="encrypted-media" allowfullscreen scrolling="no"></iframe>
                </div>        
        )
        )}
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
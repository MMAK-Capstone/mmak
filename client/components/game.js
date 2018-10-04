import React from 'react';

let testGames = 
    {
      id: 1,
      name: "Math Masters" ,
      description: "Are the math facts and riddles true or false? Earn 100 points to win!",
      gif: "/gamePics/math-masters.gif",
      score: 250,
      gameUrl:"" //get link from firebase- using itchio causes game embedding to happen through a widget rather than on our actual site
    
    }

const GamePage = () => (
    <div>
        <h2 align='center' className="game">{testGames.name}</h2> {/*Make this dynamic based on which game was selected from dashboard*/}
        <div class="resp-container">
          <iframe class="resp-iframe" src="https://test-game-46120.firebaseapp.com/" gesture="media"  allow="encrypted-media" allowfullscreen scrolling="no"></iframe>
        </div>
    </div>
)

export default GamePage;


import React from 'react';

const GamePage = () => (
    <div>
        <h2 align='center'>City Runner</h2> {/*Make this dynamic based on which game was selected from dashboard*/}
        <div class="resp-container">
          <iframe class="resp-iframe" src="https://test-game-46120.firebaseapp.com/" gesture="media"  allow="encrypted-media" allowfullscreen scrolling="no"></iframe>
        </div>
    </div>
)

export default GamePage;
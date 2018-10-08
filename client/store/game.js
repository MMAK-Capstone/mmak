import axios from 'axios';

//action type
const GOT_SINGLE_GAME = 'GOT_SINGLE_GAME';
const GOT_ALL_GAMES = 'GOT_ALL_GAMES';

//action creator
const gotSingleGame = game => ({type: GOT_SINGLE_GAME, game});
const gotAllGames = games => ({type: GOT_ALL_GAMES, games});

//thunk
export const getSingleGame = id => {
    return async dispatch => {
        const {data} = await axios.get(`/api/game/${id}`);
        dispatch(gotSingleGame(data))///TODO: return here if error
    }
}

export const getAllGames = () => {
    return async dispatch => {
        const response = await axios.get('/api/game')
        const games = response.data
        dispatch(gotAllGames(games));
    }
}

const initialState = {
    games: [],
    singleGame:{}
}
//reducer
const gameReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_SINGLE_GAME:
            return {...state, singleGame: {...action.game}}
        case GOT_ALL_GAMES:
            return {...state, games: action.games}
        default:
            return state;
    }
};

export default gameReducer;
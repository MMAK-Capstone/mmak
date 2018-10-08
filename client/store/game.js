import axios from 'axios';

//action type
const GOT_SINGLE_GAME = 'GOT_SINGLE_GAME';
const GOT_ALL_GAMES = 'GOT_ALL_GAMES';
const ADDED_REVIEW ='ADDED_REVIEW';
const GOT_REVIEWS = 'GOT_REVIEWS';

//action creator
const gotSingleGame = game => ({type: GOT_SINGLE_GAME, game});
const gotAllGames = games => ({type: GOT_ALL_GAMES, games});
const gotReviews = reviews => ({type: GOT_REVIEWS, reviews})
const addedReview = review => ({ type: ADDED_REVIEW, review})

//thunk
export const getSingleGame = id => {
    return async dispatch => {
        const {data} = await axios.get(`/api/game/${id}`);
        dispatch(gotSingleGame(data[0]))///TODO: return here if error
    }
}

export const getAllGames = () => {
    return async dispatch => {
        const response = await axios.get('/api/game')
        const games = response.data
        dispatch(gotAllGames(games));
    }
}

export const getReviews = gameId => {
    return async dispatch => {
      const {data} = await axios.get(`/api/game/${gameId}/reviews`)
      dispatch(gotReviews(data))
    }
  }

export const addNewReview = review => {
    return async dispatch => {
      const response = await axios.post(
        `/api/game/${review.gameId}/reviews`,
        review
      )
      const data = response.data
      dispatch(addedReview(data))
    }
  }

const initialState = {
    games: [],
    singleGame:{},
    reviews:[]
}
//reducer
const gameReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_SINGLE_GAME:
            return {...state, singleGame: {...action.game}}
        case GOT_ALL_GAMES:
            return {...state, games: action.games}
        case GOT_REVIEWS:
            return {...state, reviews: [...action.reviews]}
        case ADDED_REVIEW:
            return {
              ...state, reviews: [...state.reviews, action.review]
            }
        default:
            return state;
    }
};

export default gameReducer;
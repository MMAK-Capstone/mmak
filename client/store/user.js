import axios from 'axios';
import history from '../history';
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_USER = 'SET_USER';
const GET_LOGIN = 'GET_LOGIN';
/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const setUser = (user) => ({ type: SET_USER, user });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
	try {
		const res = await axios.get('/auth/me');
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

export const setUserThunk = (user) => (dispatch) => {
	console.log('setting user thunk', user);
	dispatch(getUser(user));
	history.push('/dashboard');
};

export const auth = (user) => async (dispatch) => {
	let res;
	try {
		res = await axios.post(`/auth/login`, user);
	} catch (authError) {
		console.error(authError);
		return dispatch(getUser({ error: authError }));
	}

	try {
		dispatch(getUser(res.data));
		history.push('/home');
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};
export const signupthunk = (user) => async (dispatch) => {
	let res;
	try {
		res = await axios.post('/auth/signup', user);
		dispatch(setUser(res.data));
	} catch (err) {
		console.error(err);
	}
};
export const logout = () => async (dispatch) => {
	try {
		await axios.post('/auth/logout');
		dispatch(removeUser());
		history.push('/login');
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		case SET_USER:
			return {
				state: action.user
			};
		case GET_LOGIN:
			return {
				state: action.user
			};
		default:
			return state;
	}
}

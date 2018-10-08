import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
	console.log('FunctionComponent', props);
	const { username } = props;
	console.log('username', username);
	return (
		<div>
			<h3>Welcome, {username}</h3>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	console.log('HomMapState', state);
	return {
		username: state.user.username
	};
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	username: PropTypes.string
};

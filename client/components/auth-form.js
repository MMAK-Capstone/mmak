import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { Paper } from 'material-ui';
import { auth } from '../store';
import { Button } from '@material-ui/core';
const style = {
	preview: {
		position: 'relative'
	},
	captureContainer: {
		position: 'absolute',
		justifyContent: 'center',
		width: '50px',
		height: '50px'
	},
	captureButton: {
		height: '20px',
		width: '70px',
		margin: 20
	},
	captureImage: {
		width: '300px',
		height: '300px'
	},
	control: {
		padding: 20,
		height: '100px'
	},
	paper: {
		height: 140,
		width: 100
	}
};
class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}
	handleSubmit(evt) {
		evt.preventDefault();
		this.props.submitUser({ ...this.state }).then(() => {
			this.props.history.push('/dashboard');
		});
	}
	render() {
		const { name, displayName, error } = this.props;

		return (
			<div>
				<MuiThemeProvider>
					<Grid item xs={12}>
						<Paper className={style.control}>
							<Grid container alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
								<Grid item>
									<Typography align="center" variant="headline" color="primary">
										FaceID Not Found.. Please Enter User Name and Password!!
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<form onSubmit={this.handleSubmit} name={name}>
						<div>
							<div>
								<Grid item xs={12} justify="center" alignItems="center">
									<Paper className={style.control}>
										<Grid
											container
											alignItems="center"
											justify="center"
											style={{ minHeight: '10vh' }}
										>
											<Grid item>
												<TextField
													floatingLabelText="Enter User Name *"
													name="username"
													onChange={this.handleChange}
												/>

												<div>
													<TextField
														floatingLabelText="Enter Password *"
														name="password"
														type="password"
														onChange={this.handleChange}
													/>
												</div>
												{error &&
												error.response && <InputLabel> {error.response.data} </InputLabel>}
												<div>
													<Button
														type="submit"
														style={style.captureButton}
														variant="raised"
														color="secondary"
													>
														{displayName}
													</Button>
												</div>
											</Grid>
										</Grid>
									</Paper>
								</Grid>
							</div>
						</div>
						{/* {error && error.response && <div> {error.response.data} </div>} */}
					</form>
				</MuiThemeProvider>
			</div>
		);
	}
}
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.user.error
	};
};
const mapDispatch = (dispatch) => {
	return {
		submitUser: (user) => dispatch(auth(user))
	};
};
export const Login = connect(mapLogin, mapDispatch)(AuthForm);
/**
 * PROP TYPES
 */
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	error: PropTypes.object
};

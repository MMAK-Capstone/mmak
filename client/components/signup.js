import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import Camera from 'react-camera';
import { connect } from 'react-redux';
import { signupthunk } from '../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Paper } from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const style = {
	preview: {
		position: 'fixed'
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
	},
	camera: {
		height: '100px',
		width: '30px'
	}
};

const styles = (theme) => ({
	root: {
		width: '100%'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '70vh'
	},
	cameraAndImage: {
		height: '70vh'
	},
	camera: {
		height: '10',
		width: '5'
	},
	captureButton: {
		height: '20px',
		width: '70px'
	}
});

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			username: '',
			fileName: '',
			password: ''
		};
		this.takePicture = this.takePicture.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submitFile = this.submitFile.bind(this);
	}
	submitFile = (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('file', this.state.file);
		axios
			.post(`/upload-signup-image`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: formData
			})
			.then((response) => {
				this.setState({ fileName: response.data });
				this.props
					.submitUser({ ...this.state })
					.then(() => {
						this.props.history.push('/dashboard');
					})
					.catch((error) => {
						console.error('Signup Error', error);
					});
				// console.log('State is', this.state);
			})
			.catch((error) => {
				console.error('Signup Error', error);
			});
	};
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}
	takePicture() {
		this.camera.capture().then((data) => {
			this.setState({ file: data });
			this.img.src = URL.createObjectURL(data);
			this.img.onload = () => {
				URL.revokeObjectURL(this.src);
			};
			var photo = {
				uri: data,
				type: 'image/jpeg',
				name: 'photo.jpg'
			};

			var uploadForm = new FormData();
			uploadForm.userKey = this.state.userKey;
			uploadForm.append('image', photo);
		});
	}

	render() {
		// const { classes } = this.props;
		// return (
		// 	<div>
		// 		<MuiThemeProvider>
		// 			<Grid Container direction="column">
		// 				<Grid container spacing={24}>
		// 					<Grid item xs={12}>
		// 						<Paper className={style.control}>
		// 							<Typography align="center" variant="headline" color="primary">
		// 								Create your Account
		// 							</Typography>
		// 						</Paper>
		// 					</Grid>
		// 				</Grid>
		// 				<Grid container item spacing={8}>
		// 					<Grid item sm={8}>
		// 						<Paper>
		// 							<Grid Container item direction="row-reverse">
		// 								<Grid item sm={3}>
		// 									<Paper className={style.camera}>xs1</Paper>
		// 									{/* <Camera
		// 									style={style.camera}
		// 									ref={(cam) => {
		// 										this.camera = cam;
		// 									}}
		// 								/> */}
		// 								</Grid>
		// 								<Grid item sm={3}>
		// 									<Paper className={style.camera}>xs</Paper>
		// 									{/* <img
		// 									style={style.camera}
		// 									ref={(img) => {
		// 										this.img = img;
		// 									}}
		// 								/> */}
		// 								</Grid>
		// 							</Grid>
		// 							<Grid container spacing={12} className={classes.captureButton}>
		// 								<Grid item xs>
		// 									{/* <Button type="button" variant="raised" color="secondary" onClick={this.takePicture}>
		// 								Take Photo
		// 							</Button> */}
		// 									xs3
		// 								</Grid>
		// 							</Grid>
		// 						</Paper>
		// 					</Grid>
		// 					<Grid item sm={4}>
		// 						<Paper className={classes.paper}>xs</Paper>
		// 					</Grid>
		// 				</Grid>
		// 			</Grid>
		// 		</MuiThemeProvider>
		// 	</div>
		// );
		return (
			<div>
				<MuiThemeProvider>
					<Grid item xs={12}>
						<Paper className={style.control}>
							<Grid container alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
								<Grid item>
									<Typography align="center" variant="headline" color="primary">
										Create your Account
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid Container alignItems="center" />
					<form onSubmit={this.submitFile}>
						<div style={style.container}>
							<Grid item xs={12}>
								<Paper className={style.control}>
									<Grid container alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
										<Grid item>
											<Grid item xs={12}>
												<Paper className={style.control}>
													<Grid
														container
														alignItems="center"
														justify="center"
														style={{ minHeight: '8vh' }}
													>
														<Grid item>
															<Camera
																style={style.captureImage}
																ref={(cam) => {
																	this.camera = cam;
																}}
															/>
															<img
																style={style.captureImage}
																ref={(img) => {
																	this.img = img;
																}}
															/>
															<br />
															<Button
																type="button"
																variant="raised"
																color="secondary"
																onClick={this.takePicture}
															>
																Take Photo
															</Button>
														</Grid>
													</Grid>
												</Paper>
											</Grid>
											<Grid item xs={12}>
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
															<br />
															<TextField
																name="password"
																type="password"
																floatingLabelText="Enter Password *"
																onChange={this.handleChange}
															/>
															<Button
																type="submit"
																style={style.captureButton}
																variant="raised"
																color="secondary"
															>
																SignUp
															</Button>
														</Grid>
													</Grid>
												</Paper>
											</Grid>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
							{this.props.error &&
							this.props.error.response && <div> {this.props.error.response.data} </div>}
						</div>
					</form>
				</MuiThemeProvider>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		error: state.user.error
	};
};
const mapDispatch = (dispatch) => {
	return {
		submitUser: (user) => dispatch(signupthunk(user))
	};
};
// Signup.propTypes = {
// 	classes: PropTypes.object.isRequired
// };
// const withStyleSignUp = withStyles(styles)(Signup);
export default connect(mapStateToProps, mapDispatch)(Signup);

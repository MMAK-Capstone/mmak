import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
// import TextField from 'material-ui/TextField';
import Camera from 'react-camera';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Paper } from 'material-ui';
import { setUserThunk } from '../store';
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
		width: '400px',
		height: '400px'
	},
	control: {
		padding: 20,
		height: '50px'
	},
	paper: {
		height: 140,
		width: 100
	}
};

class FaceLogin extends Component {
	constructor() {
		super();
		this.takePicture = this.takePicture.bind(this);
	}

	takePicture() {
		this.camera.capture().then((data) => {
			// axios.post('/create-collection-of-user');
			const formData = new FormData();
			formData.append('file', data);
			axios
				.post(`/lookup-user`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					body: formData
				})
				.then((response) => {
					console.log('Received User', response.data);
					this.props.setUser(response.data);
				})
				.catch((err) => {
					console.log('Client got', err);
					this.props.history.push('/login');
				});
		});
	}
	render() {
		return (
			<div>
				<MuiThemeProvider>
					<Grid item xs={12}>
						<Paper className={style.control}>
							<Grid container alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
								<Grid item>
									<Typography align="center" variant="headline" color="primary">
										Login With Face
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<div>
						<div style={style.container}>
							<Grid item xs={12}>
								<Paper className={style.control}>
									<Grid container alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
										<Grid item>
											<Camera
												style={style.captureImage}
												ref={(cam) => {
													this.camera = cam;
												}}
											/>
											<br />
											<Button
												type="button"
												variant="raised"
												color="secondary"
												onClick={this.takePicture}
											>
												Face Login
											</Button>
											{this.props.error &&
											this.props.error.response && <div> {this.props.error.response.data} </div>}
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						</div>
					</div>
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
		setUser: (user) => dispatch(setUserThunk(user))
	};
};

export default connect(mapStateToProps, mapDispatch)(FaceLogin);

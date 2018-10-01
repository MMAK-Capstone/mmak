import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import Camera from 'react-camera';
import { connect } from 'react-redux';
import signupthunk from '../store';
import Grid from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Paper } from 'material-ui';
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
		width: '100px',
		height: '100px'
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

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			file: null,

			username: ''
		};
		this.takePicture = this.takePicture.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	submitFile = (event) => {
		event.preventDefault();
		this.props.submitUser({ ...this.state }).then(() => {
			this.props.history.push('/');
		});
		const formData = new FormData();
		formData.append('file', this.state.file);
		axios
			.post(`/test-upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: formData
			})
			.then((response) => {
				// handle your response;
				console.log('response', response);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}
	comparePicture() {
		const res = axios.get('/compare-images');
	}
	takePicture() {
		this.camera.capture().then((data) => {
			this.setState({ file: data });
			// var uploadUrl = this.state.uploadUrl;
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
					<div>
						<form onSubmit={this.submitFile}>
							<div style={style.container}>
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
								<TextField floatingLabelText="Enter Username" onChange={this.handleChange} />
								<br />
								<TextField type="password" floatingLabelText="Enter Password" />
								<Button type="submit" style={style.captureButton} variant="raised" color="secondary">
									SignUp
								</Button>
								{this.props.error &&
								this.props.error.response && <div> {this.props.error.response.data} </div>}
								<Button type="button" variant="raised" color="secondary" onClick={this.takePicture}>
									Take Photo
								</Button>
								{/* <Button type="submit" variant="raised" color="secondary">
									Send
								</Button> */}
								<Button type="button" variant="raised" color="secondary" onClick={this.comparePicture}>
									Compare
								</Button>
							</div>
						</form>
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
		submitUser: (user) => dispatch(signupthunk(user))
	};
};

export default connect(mapStateToProps, mapDispatch)(Signup);

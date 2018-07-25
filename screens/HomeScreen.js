import React from 'react';
import {
	Image,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import ApiService from '../services/ApiService';

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'main',
	};
	
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			men: {
				image: require('../assets/images/people/men/black.png'),
				occupied: false
			},
			women: {
				image: require('../assets/images/people/women/black.png'),
				occupied: false
			}
		};
		
	}
	
	componentDidMount() {
		this._onRefresh();
	}
	
	api = new ApiService();
	
	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
					/>
				}>
					<View style={styles.imagesContainer}>
						<View style={styles.singleImageContainer}>
							
							<Image
								source={
									this.state.men.image
								}
								style={styles.welcomeImage}
							/>
							<View>
								<Text style={{textAlign: 'center', color: this._setOccupiedState('men') ? '#FF2E2E' : '#06B904'}}>
									{(() =>this._setOccupiedState('men') ? 'Taken' : 'Free')()}
								</Text>
							</View>
						</View>
						<View>
							<Image
								source={
									this.state.women.image
								}
								style={styles.welcomeImage}
							/>
							<View>
								<Text style={{textAlign: 'center', color: this._setOccupiedState('women') ? '#FF2E2E' : '#06B904'}}>
									{(() => this._setOccupiedState('women') ? 'Taken' : 'Free')()}
								</Text>
							</View>
						</View>
					</View>
					
					<View style={styles.getStartedContainer}>
						<Text style={styles.getStartedText}>
							Bathroom Ai
						</Text>
					</View>
				</ScrollView>
			</View>
		);
	}
	
	_setOccupiedState(bathroom) {
		let occupied = false;
		switch(bathroom) {
			case 'men':
				occupied = this.state.men.occupied;
				break;
			case 'women':
				occupied = this.state.women.occupied;
				break;
		}
		
		return occupied;
	}
	
	_fetchData() {
		return this.api.getBathroomStats('https://bathroom-ai.herokuapp.com/api/rooms');
	};
	
	_onRefresh = () => {
		this.setState({refreshing: true});
		this._fetchData().then((data) => {
			let response = data.data;
			this.setState({
				refreshing: false,
				men: {
					image: response[0].occupied ? bathroomStatus.men.taken : bathroomStatus.men.free,
					occupied: response[0].occupied
				},
				women: {
					image: response[1].occupied ? bathroomStatus.women.taken : bathroomStatus.women.free,
					occupied: response[1].occupied
				}
			});
			console.log({
				men: {
					occupied: response[0].occupied
				},
				women: {
					occupied: response[1].occupied
				}
			});
		});
	}
	
	
}

const bathroomStatus = {
	men: {
		taken: require('../assets/images/people/men/red.png'),
		free: require('../assets/images/people/men/green.png')
	},
	women: {
		taken: require('../assets/images/people/women/red.png'),
		free: require('../assets/images/people/women/green.png')
	},
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imagesContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	singleImageContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeImage: {
		width: 100,
		height: 150,
		resizeMode: 'contain',
		marginTop: 3,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	navigationFilename: {
		marginTop: 5,
	},
});

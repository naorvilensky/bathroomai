import React from 'react';
import {
	Image,
	Platform,
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
				image: require('../assets/images/people/men.png'),
				occupied: false
			},
			women: {
				image: require('../assets/images/people/women.png'),
				occupied: false
			}
			
		};
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
								<Text style={{textAlign: 'center'}}>
									{this.state.men.occupied ? 'Taken' : 'Free'}
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
								<Text style={{textAlign: 'center'}}>
									{this.state.men.occupied ? 'Taken' : 'Free'}
								</Text>
							</View>
						</View>
					</View>
					
					<View style={styles.getStartedContainer}>
						<Text style={styles.getStartedText}>
							Bathroom Ai
						</Text>
					</View>
					
					{/*					<View style={styles.helpContainer}>
						<TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
							<Text style={styles.helpLinkText}>Doing an API Request!</Text>
						</TouchableOpacity>
					</View>*/}
				</ScrollView>
				
				{/*				<View style={styles.tabBarInfoContainer}>
					<Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
					
					<View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
						<MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
					</View>
				</View>*/}
			</View>
		);
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
					image: this.state.men.image,
					occupied: response[0].occupied
				},
				women: {
					image: this.state.women.image,
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imagesContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
		
	},
	singleImageContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
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
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
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

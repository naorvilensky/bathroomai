import axios from 'axios';

export default class ApiService {
	constructor() {
	
	}
	
	getBathroomStats() {
		return axios.get('https://bathroom-ai.herokuapp.com/api/rooms');
	}
	
	
}
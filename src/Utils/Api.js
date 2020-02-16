import axios from 'axios';
import Session from './Session.js';

const instance = axios.create({
	baseURL: `http://192.168.0.106:8888/api`,
 	headers:{ Authorization: 'Bearer ' + Session.getToken() }
})

instance.interceptors.response.use(function (response){
   let originalRequest = response.config;

	if (response.data.AppData.message === 'token_expired') {
		return instance.post('/auth/refresh', { data: { os:'string' } }, { headers:{ Authorization: 'Bearer ' + Session.getToken() } })
			.then( response => {
				//console.log(response)
				Session.setToken(response.data.Data.token)
				originalRequest.headers['Authorization'] = 'Bearer ' + Session.getToken()
				return axios(originalRequest)
			})
	}
	return response;
}, function(error){
	return Promise.reject(error)
})

export default instance;
import Api from './Api.js';
import User from './User.js';

export function auth(token) {
	if(token){
		return true
	 // 	return Api.post('/auth/me?token=' + token)
		// .then( response => {
		// 	if( response.data.AppData.status === 'success'){
		// 		return true
		// 	}
		// 	else {
		// 		window.location.href = '/login'
		// 	}
		// })
		// .catch( error => { return error })
	}
	else {
		window.location.href = '/login'
	}
}

export function checkProfileData(input){
	const formData = new FormData();
   if (Object.keys(input['name']).length > 2){
			formData.append('data[name]', input['name']);
	}
	if (Object.keys(input['mobile_phone']).length > 1){
		formData.append('data[mobile_phone]', input['mobile_phone']);
	}
	if (Object.keys(input['dob']).length > 2){
			formData.append('data[dob]', input['dob']);
	}
	if (Object.keys(input['gender']).length > 0){
			formData.append('data[gender]', input['gender']);
	}
	if (input['selectedFile'] !== null && input['login_type'] === 'email' ){
			formData.append('data[image]', input['selectedFile']);
	}
	return formData
}

export function checkPromoData(input){
		const formData = new FormData();
		console.log(input)
		if (Object.keys(input['title']).length > 2){
			formData.append('data[title]', input['title']);
		}

		if (Object.keys(input['description']).length > 2){
			formData.append('data[description]', input['description']);
		}

		if(input['promo_id']){
			formData.append('data[id]', input['promo_id'])
		}

		formData.append('data[image]', input['selectedFile']);
		formData.append('data[address]', input['address']);
		formData.append('data[start_date]', input['start_date']);
		formData.append('data[end_date]', input['end_date']);
		formData.append('data[type_id]', input['type_id']);
		formData.append('data[promolat]', input['promolat']);
		formData.append('data[promolong]', input['promolong']);
		formData.append('data[promostate]', input['promostate']);
		formData.append('data[promocountry]', input['promocountry']);
		formData.append('data[wazeable]', input['wazeable']);
		formData.append('data[app_id]', User.app_id);
		formData.append('data[userlat]', User.lat);
		formData.append('data[userlong]', User.long);
		formData.append('data[userstate]', User.state);
		formData.append('data[usercountry]', User.country);

		return formData
}

export function likeHandler(id, posts, index, status){
	let postUpdate = Object.assign({}, posts);
	if (status === false){
		return Api.post('/promos/like', { data: { app_id: 1, promo_id: id } })
		.then(response => {
			postUpdate.posts[index].likes = response.data.Data.likes;
			postUpdate.posts[index].liked = response.data.Data.liked
			return postUpdate.posts
		})
		.catch( error => {
			return 'fail'
		})
	}
	else if (status === true){
		return Api.post('/promos/dislike', { data: { app_id: 1, promo_id: id } })
		.then(response => {
			postUpdate.posts[index].likes = response.data.Data.likes;
			postUpdate.posts[index].liked = response.data.Data.liked
			return postUpdate.posts
		})
		.catch( error => {
			return 'fail'
		})
	}
	else {
		return 'token_expired'
	}
}

export function saveHandler(id, posts, index, status){
	let postUpdate = Object.assign({}, posts);
	//console.log(status)
	if (status === false){
		return Api.post('/promos/save', { data: { app_id: 1, promo_id: id } })
		.then(response => {
			console.log(response)
			postUpdate.posts[index].saves = response.data.Data.saves;
			postUpdate.posts[index].saved = true // [bug] = response return false after successful save
			return postUpdate.posts
		})
		.catch( error => {
			return 'fail'
		})
	}
	else if (status === true){
		return Api.post('/promos/unsave', { data: { app_id: 1, promo_id: id } })
		.then(response => {
			console.log(response)
			postUpdate.posts[index].saves = response.data.Data.saves;
			postUpdate.posts[index].saved = response.data.Data.saved
			return postUpdate.posts
		})
		.catch( error => {
			return 'fail'
		})
	}
	else {
		return 'token_expired'
	}
}

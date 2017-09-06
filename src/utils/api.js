const api = "http://localhost:5001"

let token = localStorage.token;
if(!token){
	token = localStorage.token = 'readable'
}

const headers ={
	'Accept' : 'application/json',
	'Authorization':token
}

export const getCategories = () => 
	fetch(`${api}/categories`, {headers})
	.then(res=> res.json())

export const getAllPosts = () => 
	fetch(`${api}/posts`, {headers})      
	.then(res => res.json())

export const getPostsByCategory = category => 
	fetch(`${api}/${category}/posts`, {headers})
	.then(res => res.json())


export const getPost = id => 
	fetch(`${api}/posts/id`, {headers} )
	.then(res => res.json())

export const postPost = post =>
	fetch(`${api}/posts`,{
		method: 'POST',
		headers:{
			...headers,
			'Content-Type':'application/json'
		},
		body: JSON.stringify(post)
	})

export const delPost = id => 
	fetch(`${api}/posts/${id}`,{
		method: 'DELETE',
		headers,
	})
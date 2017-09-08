const api = "http://localhost:3001"

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

export const editPost = post=> 
	fetch(`${api}/posts/${post.id}`, {
		method: 'PUT',
		headers:{
			...headers,
			'Content-Type':'application/json'
		},
		body: JSON.stringify({title: post.title, body: post.body})
	})

export const votePost = (id, vote)=>
	fetch(`${api}/posts/${id}`,{
		method: 'POST',
		headers:{
			...headers,
			'Content-Type':'application/json'
		},
		body: JSON.stringify({option:vote})
	})

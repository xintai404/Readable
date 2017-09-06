const  getUID = function(){
	const str= '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return function() {
		let id = ''
		for(let i = 0; i < 20; i++){
			let pos = Math.floor(Math.random()*62)
			id += str[pos]
		}
		return id
	}
}()

export {getUID}
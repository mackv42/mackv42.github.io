let sockData = {
	
}

sockData.socket = io.connect(endpoint);
function register(token){
	sockData.socket.emit('register', signInData.token);
	sockData.token = signInData.token;
	sockData.socket.on('makemove', function(){
		console.log("emit");
		axios.get(endpoint+"/requireauth/getGame?token="+sockData.token).then( function(response){
			if(response.data.success){
				currentBoard = response.data.board;
				currentBoard.playerColor = response.data.playerColor;
				Clear();
				RenderBoard(response.data.board);
			}
		});
	});
}

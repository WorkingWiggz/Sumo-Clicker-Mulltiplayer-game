class OnlineGameLobby extends Phaser.Scene{
	constructor(){
		super({key:'OnlineGameLobby'});
	}

	init(){

	}

	preload(){
		this.load.image('OnlineLobbyBack',"assets/Backgrounds/OnlineLobbyBack-placeholder.png");
		this.load.image('OnlineLobbyPlate',"assets/Backgrounds/OnlineLobbyPlate.png");
		this.load.image('OnlineQuitButt',"assets/Backgrounds/OnlineQuitButt.png");
		this.load.image('OnlineSearchButt',"assets/Backgrounds/OnlineSearchButt.png");
		this.load.image('OnlineHostButt',"assets/Backgrounds/OnlineHostButt.png");
	}	

	create(){
		
	}

	update(){

	}

}


class OnlineGame extends Phaser.Scene(){
	constructor(){
		super({key:'OnlineGame'});
	}

	init(){

	}

	preload(){

	}

	create(){

	}

	update(){

	}
}

class OnlineGameUI extends Phaser.Scene(){
	constructor(){
		super({key:'OnlineGameUI'});
	}

	init(){

	}

	preload(){

	}

	create(){

	}

	update(){

	}
}
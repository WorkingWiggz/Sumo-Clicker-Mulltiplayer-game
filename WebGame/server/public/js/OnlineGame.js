class OnlineGame extends baseclass{
	constructor(){
		super({key:'OnlineGame'});
	}

	init(data){
		try{
			if(data.HostPlayer != null && data.Opponent != null && data.Difficulty != null && data.Lobby !=null && data.AmHost !=null){
				this.HostPlayer = data.HostPlayer;
				this.Opponent = data.Opponent;
				this.Difficulty = data.Difficulty;
				this.Lobby = data.Lobby;
				this.AmHost = data.AmHost;
				this.HostStats = data.HostStats;
				this.OppStats = data.OppStats;
				this.socket = data.socket;
			} else {
				throw new exception;
			}
		} catch(error){
			this.OnlineErrorHandle(error);
		}
	}

	preload(){
		this.load.image('HostPlayer',"assets/Images/HostPlayer.png");
		this.load.image('OpponentPlayer',"assets/Images/OpponentPlayer.png");
		this.load.image('GameBackground',"assets/Backgrounds/GameBackground.jpeg");
		this.load.image('ArenaFloor',"assets/Images/Arena.png");
	}

	create(){
		try{
			this.emitter = new Phaser.Events.EventEmitter();
			this.input.mouse.disableContextMenu();
				if(this.Difficulty == "Easy"){
					this.cameras.main.setBounds(-1600, 0, 3900,650);
					this.physics.world.setBounds(-1800, 250, 4500,650);
					this.GameBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'GameBackground');
					this.GameBack.setScale(2);
					this.ArenaFloor = this.physics.add.staticImage(this.GetWidthOrigin(),this.GetHeightOrigin()+240,'ArenaFloor').setScale(-35,0.7).refreshBody();
					this.ArenaFloor.originX = 0.5;
					this.physics.add.existing(this.ArenaFloor);
					this.ArenaFloor.body.allowGravity = false;
					this.ArenaFloor.body.allowRotation = false;
					this.ArenaFloor.body.allowDrag = false;

					this.RightBuffer = this.add.rectangle(2200,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.RightBuffer);
					this.RightBuffer.body.allowGravity = false;
					this.RightBuffer.body.allowRotation = false;
					this.RightBuffer.body.allowDrag = false;
					this.RightBuffer.body.setImmovable(true);
					this.RightBuffer.setVisible(false);

					this.LeftBuffer = this.add.rectangle(-1400,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.LeftBuffer);
					this.LeftBuffer.body.allowGravity = false;
					this.LeftBuffer.body.allowRotation = false;
					this.LeftBuffer.body.allowDrag = false;
					this.LeftBuffer.body.setImmovable(true);
					this.LeftBuffer.setVisible(false);



					this.LeftOpponent = this.CreateOnlineHost();
					this.RightOpponent = this.CreateOnlineOppo();
					if(this.AmHost){
						this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.05);
					} else {
						this.cameras.main.startFollow(this.RightOpponent , true, 0.05, 0.05);
					}
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);



					

					this.inGame = true;
				} else if (this.Difficulty == "Medium"){
					this.cameras.main.setBounds(-600, 0, 1900,650);
					this.physics.world.setBounds(-800, 250, 2500,650);
					this.GameBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'GameBackground');
					this.ArenaFloor = this.physics.add.staticImage(this.GetWidthOrigin(),this.GetHeightOrigin()+240,'ArenaFloor').setScale(-15,0.7).refreshBody();
					this.ArenaFloor.originX = 0.5;
					this.physics.add.existing(this.ArenaFloor);
					this.ArenaFloor.body.allowGravity = false;
					this.ArenaFloor.body.allowRotation = false;
					this.ArenaFloor.body.allowDrag = false;

					this.RightBuffer = this.add.rectangle(1200,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.RightBuffer);
					this.RightBuffer.body.allowGravity = false;
					this.RightBuffer.body.allowRotation = false;
					this.RightBuffer.body.allowDrag = false;
					this.RightBuffer.body.setImmovable(true);
					this.RightBuffer.setVisible(false);

					this.LeftBuffer = this.add.rectangle(-400,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.LeftBuffer);
					this.LeftBuffer.body.allowGravity = false;
					this.LeftBuffer.body.allowRotation = false;
					this.LeftBuffer.body.allowDrag = false;
					this.LeftBuffer.body.setImmovable(true);
					this.LeftBuffer.setVisible(false);



					this.LeftOpponent = this.CreateOnlineHost();
					this.RightOpponent = this.CreateOnlineOppo();
					if(this.AmHost){
						this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.25);
					} else {
						this.cameras.main.startFollow(this.RightOpponent , true, 0.05, 0.25);
					}
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);



					this.inGame = true;
				} else if (this.Difficulty == "Hard"){
					this.cameras.main.setBounds(-200, 0, 1300,650);
					this.physics.world.setBounds(-300, 250, 1900,650);
					this.GameBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'GameBackground');
					this.ArenaFloor = this.physics.add.staticImage(this.GetWidthOrigin(),this.GetHeightOrigin()+240,'ArenaFloor').setScale(-10,0.7).refreshBody();
					this.ArenaFloor.originX = 0.5;
					this.physics.add.existing(this.ArenaFloor);
					this.ArenaFloor.body.allowGravity = false;
					this.ArenaFloor.body.allowRotation = false;
					this.ArenaFloor.body.allowDrag = false;

					this.RightBuffer = this.add.rectangle(1000,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.RightBuffer);
					this.RightBuffer.body.allowGravity = false;
					this.RightBuffer.body.allowRotation = false;
					this.RightBuffer.body.allowDrag = false;
					this.RightBuffer.body.setImmovable(true);
					this.RightBuffer.setVisible(false);

					this.LeftBuffer = this.add.rectangle(-150,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.LeftBuffer);
					this.LeftBuffer.body.allowGravity = false;
					this.LeftBuffer.body.allowRotation = false;
					this.LeftBuffer.body.allowDrag = false;
					this.LeftBuffer.body.setImmovable(true);
					this.LeftBuffer.setVisible(false);



					this.LeftOpponent = this.CreateOnlineHost();
					this.RightOpponent = this.CreateOnlineOppo();
					if(this.AmHost){
						this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.05);
					} else {
						this.cameras.main.startFollow(this.RightOpponent , true, 0.05, 0.05);
					}
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);


				
					this.inGame = true;
				} else if(this.Difficulty == "Extreme"){
					this.cameras.main.setBounds(-200, 0, 1600,650);
					this.physics.world.setBounds(-400, 250, 1800,650);
					this.GameBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'GameBackground');
					this.ArenaFloor = this.physics.add.staticImage(this.GetWidthOrigin(),this.GetHeightOrigin()+240,'ArenaFloor').setScale(-8,0.7).refreshBody();
					this.ArenaFloor.originX = 0.5;
					this.physics.add.existing(this.ArenaFloor);
					this.ArenaFloor.body.allowGravity = false;
					this.ArenaFloor.body.allowRotation = false;
					this.ArenaFloor.body.allowDrag = false;

					this.RightBuffer = this.add.rectangle(850,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.RightBuffer);
					this.RightBuffer.body.allowGravity = false;
					this.RightBuffer.body.allowRotation = false;
					this.RightBuffer.body.allowDrag = false;
					this.RightBuffer.body.setImmovable(true);
					this.RightBuffer.setVisible(false);

					this.LeftBuffer = this.add.rectangle(-50,this.GetHeightOrigin(),50,2000,0x080f26);
					this.physics.add.existing(this.LeftBuffer);
					this.LeftBuffer.body.allowGravity = false;
					this.LeftBuffer.body.allowRotation = false;
					this.LeftBuffer.body.allowDrag = false;
					this.LeftBuffer.body.setImmovable(true);
					this.LeftBuffer.setVisible(false);



					this.LeftOpponent = this.CreateOnlineHost();
					this.RightOpponent = this.CreateOnlineOppo();
					if(this.AmHost){
						this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.05);
					} else {
						this.cameras.main.startFollow(this.RightOpponent , true, 0.05, 0.05);
					}

					
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);

			
					this.inGame = true;
				} else {
					throw new exception;	
				}
				this.emitter.on('GameOver',function(Winner){this.LoserToDie = false;this.GameOver(Winner)},this);
				this.emitter.on('PlayerDeath',function(Winner){this.LoserToDie = true;this.GameOver(Winner);},this);
					this.UiData = {LeftOpponent: this.LeftOpponent, RightOpponent: this.RightOpponent,Context: this,socket:this.socket};
					this.scene.launch('OnlineGameUI',this.UiData);
		}catch(error){
			this.ErrorHandle(error);
		}
	}

	update(){
		if(this.inGame){
			this.CheckForGameOver(this.Difficulty);
		}
	}


	CheckForGameOver(Diff){
		switch(Diff){
			case "Easy":
				if(this.LeftOpponent.body.x <= -1700 || this.LeftOpponent.body.y >= 700){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 2400|| this.RightOpponent.body.y >= 700){
					this.emitter.emit('GameOver',"Left");
				}
			break;
			case "Medium":
				if(this.LeftOpponent.body.x <= -700 || this.LeftOpponent.body.y >= 700){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 1300 || this.RightOpponent.body.y >= 700){
					this.emitter.emit('GameOver',"Left");
				}
			break;
			case "Hard":
				if(this.LeftOpponent.body.x <= 300 || this.LeftOpponent.body.y <= -700){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 1110 || this.RightOpponent.body.y >= 700){
					this.emitter.emit('GameOver',"Left");
				}
			break;
			case "Extreme":
				if(this.LeftOpponent.body.x <= -300 || this.LeftOpponent.body.y >= 700){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 1200 || this.RightOpponent.body.y >= 700){
					this.emitter.emit('GameOver',"Left");
				}
			break;
		}

		if(this.LeftOpponent.Health <=0){
			this.emitter.emit('PlayerDeath',"Left");
		}
		else if(this.RightOpponent.Health <=0){
			this.emitter.emit('PlayerDeath',"Right");
		}	
	}


	GameOver(Winner){
		this.Winner = Winner;
		this.inGame = false;
		this.LeftOpponent.body.setVelocityX(0);
		this.RightOpponent.body.setVelocityX(0);
		if(Winner == "Left"){
			console.log("Left Wins.");
			this.physics.add.collider(this.RightOpponent, this.RightBuffer);
			this.physics.add.collider(this.LeftOpponent, this.LeftBuffer);

		} else if(Winner == "Right"){
			console.log("Right Wins.");
			this.physics.add.collider(this.LeftOpponent, this.LeftBuffer);
			this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
		}
	}



	DifficultyEffects(){
		if(this.Difficulty == "Easy"){
			this.RightOpponent.SetMaxHealth(this.RightOpponent.GetMaxHealth()*2);
			this.RightOpponent.SetHealth(this.RightOpponent.GetMaxHealth());
			this.RightOpponent.SetVelGain(this.RightOpponent.GetVelGain()*2);
			this.RightOpponent.SetStaminaRegen(this.RightOpponent.GetStamina()*2);
			this.LeftOpponent.SetMaxHealth(this.LeftOpponent.GetMaxHealth()*2);
			this.LeftOpponent.SetHealth(this.LeftOpponent.GetMaxHealth());
			this.LeftOpponent.SetVelGain(this.LeftOpponent.GetVelGain()*2);
			this.LeftOpponent.SetStaminaRegen(this.LeftOpponent.GetStamina()*2);
		} else if(this.Difficulty == "Medium") {
			this.RightOpponent.SetStaminaRegen(this.RightOpponent.GetStamina()*1.5);
			this.LeftOpponent.SetStaminaRegen(this.LeftOpponent.GetStamina()*1.5);
		} else if(this.Difficulty == "Hard"){
			this.RightOpponent.SetMaxHealth(this.RightOpponent.GetMaxHealth()*0.5);
			this.RightOpponent.SetHealth(this.RightOpponent.GetMaxHealth());
			this.LeftOpponent.SetMaxHealth(this.LeftOpponent.GetMaxHealth()*0.5);
			this.LeftOpponent.SetHealth(this.LeftOpponent.GetMaxHealth());
		} else if(this.Difficulty == "Extreme"){
			this.RightOpponent.SetVelGain(this.RightOpponent.GetVelGain()*2);
			this.RightOpponent.SetStaminaRegen(this.RightOpponent.GetStaminaRegen()*0);
			this.RightOpponent.SetMaxStamina(0);
			this.LeftOpponent.SetVelGain(this.LeftOpponent.GetVelGain()*2);
			this.LeftOpponent.SetStaminaRegen(this.LeftOpponent.GetStaminaRegen()*0);
			this.LeftOpponent.SetMaxStamina(0);
		}
	}

	CreateOnlineOppo(){
		var char;
		var Stamina = this.OppStats[0];
		var MSpeed =	this.OppStats[1];
		var VGain = this.OppStats[2];
		var Health = this.OppStats[3];
		var StamRegen = this.OppStats[4];
		char = this.add.existing(new DebugChar(this,this.GetWidthOrigin()+200,this.GetHeightOrigin()+100,'OpponentPlayer',Stamina,Health,MSpeed,VGain,StamRegen));
		this.physics.add.existing(char);
		char.body.setBounce(.1,0);
		char.body.setCollideWorldBounds(true);
		char.Type ="Right";
		return char;
	}

	CreateOnlineHost(){
		var char;
		var Stamina = this.HostStats[0];
		var MSpeed =	this.HostStats[1];
		var VGain = this.HostStats[2];
		var Health = this.HostStats[3];
		var StamRegen = this.HostStats[4];
		char = this.add.existing(new DebugChar(this,this.GetWidthOrigin()-200,this.GetHeightOrigin()+100,'HostPlayer',Stamina,Health,MSpeed,VGain,StamRegen));
		this.physics.add.existing(char);
		char.body.setBounce(.1,0);
		char.body.setCollideWorldBounds(true);
		char.Type ="Left";
		return char;
	}

	OnlineErrorHandle(error){
		if(this.socket != null){
			this.socket.emit('error',Lobby);
		}
		
	}
}
class SoloGame extends baseclass {

	constructor(){
		super({key:'Sologame'});
	}

	init(data){
		console.log('Initializing Game',data);
		if(data.GM !=null && data.Diff !=null&&data.Char != null){
			this.Difficulty = data.Diff;
			this.GameMode = data.GM;
		    this.SelectedChar= data.Char;
		} else {
			this.Difficulty = "Medium";
			this.GameMode = "Debug";
		}
	}

	preload(){
		this.load.image('GameBackground',"assets/Backgrounds/GameBackground.jpeg");
		this.load.image('DebugPlayer',"assets/Images/Debug.png");
		this.load.image('ArenaFloor',"assets/Images/Arena.png");
		this.load.image('Beatrix',"assets/Images/Beatrix.png");
		this.load.image('Lukas',"assets/Images/Lukas.png");
		this.load.image('Kasey',"assets/Images/Kasey.png");
		this.load.image('Zaynab',"assets/Images/Zaynab.png");
		this.load.image('Yousif',"assets/Images/Yousif.png");
		this.load.image('Janae',"assets/Images/Janae.png");
		this.load.image('Gurdeep',"assets/Images/Gurdeep.png");
		this.load.image('Ayva',"assets/Images/Ayva.png");
		this.load.image('Ubaid',"assets/Images/Ubaid.png");
		this.load.image('Georga',"assets/Images/Georga.png");
		this.load.image('Debug',"assets/Images/Slots.png");

	}

	create(){
		try{
			this.emitter = new Phaser.Events.EventEmitter();
			this.input.mouse.disableContextMenu();
			if(this.GameMode == "Duel"){
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



					this.LeftOpponent = this.GetPlayer();
					this.RightOpponent = this.GetOpponent();
					this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.05);
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);



					this.emitter.on('GameOver',function(Winner){this.GameOver(Winner)},this);
					
					this.UiData = {LeftOpponent: this.LeftOpponent, RightOpponent: this.RightOpponent,Context: this};
					this.GameUI = this.scene.get('gameUI');
					this.scene.launch('gameUI',this.UiData);
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



					this.LeftOpponent = this.GetPlayer();
					this.RightOpponent = this.GetOpponent();
					this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.05);
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);


					this.emitter.on('GameOver',function(Winner){this.GameOver(Winner)},this);
					this.UiData = {LeftOpponent: this.LeftOpponent, RightOpponent: this.RightOpponent,Context: this};
					this.GameUI = this.scene.get('gameUI');
					this.scene.launch('gameUI',this.UiData);
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



					this.LeftOpponent = this.GetPlayer();
					this.RightOpponent = this.GetOpponent();
					this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.05);
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);


					this.emitter.on('GameOver',function(Winner){this.GameOver(Winner)},this);
					this.UiData = {LeftOpponent: this.LeftOpponent, RightOpponent: this.RightOpponent,Context: this};
					this.GameUI = this.scene.get('gameUI');
					this.scene.launch('gameUI',this.UiData);
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



					this.LeftOpponent = this.GetPlayer();
					this.RightOpponent = this.GetOpponent();
					this.cameras.main.startFollow(this.LeftOpponent , true, 0.05, 0.05);
					this.DifficultyEffects();



					this.physics.add.collider(this.LeftOpponent, this.ArenaFloor);
					this.physics.add.collider(this.RightOpponent, this.ArenaFloor);
					this.physics.add.collider(this.LeftOpponent, this.RightBuffer);
					this.physics.add.collider(this.RightOpponent, this.LeftBuffer);
					this.physics.add.collider(this.LeftOpponent,this.RightOpponent);

					this.emitter.on('GameOver',function(Winner){this.GameOver(Winner)},this);
					this.UiData = {LeftOpponent: this.LeftOpponent, RightOpponent: this.RightOpponent,Context: this};
					this.GameUI = this.scene.get('gameUI');
					this.scene.launch('gameUI',this.UiData);
					this.inGame = true;
				}
			}
		}catch(error){
			this.ErrorHandle(error);
		}
	}

	update(){
		if(this.inGame){
			this.CheckForGameOver(this.Difficulty);
		}
		this.emitter.emit('GameUpdate');
	}


	CheckForGameOver(Diff){
		switch(Diff){
			case "Easy":
				if(this.LeftOpponent.body.x <= -1700 || this.LeftOpponent.body.y >= 700 || this.LeftOpponent.Health <=0){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 2400|| this.RightOpponent.body.y >= 700 ||this.RightOpponent.Health <=0){
					this.emitter.emit('GameOver',"Left");
				}
			break;
			case "Medium":
				if(this.LeftOpponent.body.x <= -700 || this.LeftOpponent.body.y >= 700 || this.LeftOpponent.Health <=0){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 1300 || this.RightOpponent.body.y >= 700 ||this.RightOpponent.Health <=0){
					this.emitter.emit('GameOver',"Left");
				}
			break;
			case "Hard":
				if(this.LeftOpponent.body.x <= 300 || this.LeftOpponent.body.y <= -700 || this.LeftOpponent.Health <=0){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 1110 || this.RightOpponent.body.y >= 700 ||this.RightOpponent.Health <=0){
					this.emitter.emit('GameOver',"Left");
				}
			break;
			case "Extreme":
				if(this.LeftOpponent.body.x <= -300 || this.LeftOpponent.body.y >= 700 || this.LeftOpponent.Health <=0){
					this.emitter.emit('GameOver',"Right");}
				else if (this.RightOpponent.body.x >= 1200 || this.RightOpponent.body.y >= 700 ||this.RightOpponent.Health <=0){
					this.emitter.emit('GameOver',"Left");
				}
			break;
		}
	}


	GameOver(Winner){
		this.Winner = Winner;
		this.inGame = false;
		this.LeftOpponent.body.setVelocityX(0);
		this.RightOpponent.body.setVelocityX(0);
		this.scene.pause()
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


	GetPlayer(){
		var Player;
		if(this.SelectedChar ==null){
			var Health = 100;
			var Stamina = 100;
			var MSpeed = 2000;
			var VGain = 100;
			var StamRegen = 3.5;
			Player = this.add.existing(new DebugChar(this,this.GetWidthOrigin()-200,this.GetHeightOrigin()+100,'DebugPlayer',Health,Stamina,MSpeed,VGain,StamRegen));

		} else {
			Player = this.add.existing(new NamedChar(this,this.GetWidthOrigin()-200,this.GetHeightOrigin()+100,this.SelectedChar,this.SelectedChar));
		}
			this.physics.add.existing(Player);
			Player.body.setBounce(.25, 0);
			Player.body.setCollideWorldBounds(true);
			Player.Type ="Left";
		return Player;
	}



	GetOpponent(){
		var Opponent;
		if(this.GameMode == "Debug"){
			var Health = 100;
			var Stamina = 100;
			var MSpeed = 2000;
			var VGain = 100;
			var StamRegen = 3.5;
			Opponent = this.add.existing(new DebugChar(this,this.GetWidthOrigin()+200,this.GetHeightOrigin()+100,'DebugPlayer',Health,Stamina,MSpeed,StamRegen));
		} else if (this.GameMode == "Duel") {
			var Selection = Math.round(Math.random() * (11 - 1) + 1);
			var CharName;
			var x = this.GetWidthOrigin()+200;
			var y = this.GetHeightOrigin()+100;
			switch(Selection){
				case 1:
					CharName = "Beatrix";
				break;
				case 2:
					CharName = "Lukas";
				break;
				case 3:
					CharName = "Kasey";
				break;
				case 4:
					CharName = "Zaynab";
				break;
				case 5:
					CharName = "Yousif";
				break;
				case 6:
					CharName = "Janae";
				break;
				case 7:
					CharName = "Gurdeep";
				break;
				case 8:
					CharName = "Ayva";
				break;
				case 9:
					CharName = "Ubaid";
				break;
				case 10:
					CharName = "Georga";
				break;
			}
			Opponent = this.add.existing(new NamedChar(this,x,y,CharName,CharName));

		}
			this.physics.add.existing(Opponent);
			Opponent.body.setBounce(.25, 0);
			Opponent.body.setCollideWorldBounds(true);
			Opponent.Type ="Right";
			Opponent.SetAI(true);
			console.log(Opponent.Name);
		return Opponent;
	}

}

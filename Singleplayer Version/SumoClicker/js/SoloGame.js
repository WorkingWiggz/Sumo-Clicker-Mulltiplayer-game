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
			else if(this.GameMode == "Debug"){

				
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

class SoloGameUI extends baseclass {

	constructor(){
		super({key:'gameUI'});
	}

	preload(){
		this.load.image('PauseButt',"assets/Buttons/Pause.png");
		this.load.image('PausePlate',"assets/Images/MenuPlate.png");
		this.load.image('WinPlate',"assets/Images/WinPlate.png");
		this.load.image('LosePlate',"assets/Images/LosePlate.png");
		this.load.image('WinText',"assets/Images/WinTitle.png");
		this.load.image('LoseText',"assets/Images/LoseTitle.png");
		this.load.image('LoseLobbyButt',"assets/Buttons/LobbyBackButt.png");
		this.load.image('LoseMenuButt',"assets/Buttons/MenuBackButt.png");
		this.load.image('WinMenuButt',"assets/Buttons/WinMenuBackButt.png");
		this.load.image('WinLobbyButt',"assets/Buttons/WinLobbyBackButt.png");
		this.load.image('PauseLobbyBackButt',"assets/Buttons/PauseLobbyBackButt.png");
		this.load.image('PauseMenuBackButt',"assets/Buttons/PauseMenuBackButt.png");
		this.load.image('ResumeButt',"assets/Buttons/Resume.png");
	}

	init(data){
		console.log('Initializing UI',data);
		if(data.LeftOpponent !=null && data.RightOpponent !=null && data.Context !=null){
			this.LeftOpponent = data.LeftOpponent;
			this.RightOpponent = data.RightOpponent;
			this.AttachedScene = data.Context;
		}
	}

	create(){
		this.input.mouse.disableContextMenu();
		this.add.text(this.GetWidthOrigin()-340,this.GetHeightOrigin()-290,'Player');
		this.LeftStamina = this.add.text(this.GetWidthOrigin()-340,this.GetHeightOrigin()-270,'Stamina:');
		this.LeftHP = this.add.text(this.GetWidthOrigin()-340,this.GetHeightOrigin()-245,'Health:');
		
		this.add.text(this.GetWidthOrigin()+100,this.GetHeightOrigin()-290, 'CPU');
		this.RightStamina = this.add.text(this.GetWidthOrigin()+100,this.GetHeightOrigin()-270,'Stamina:');
		this.RightHP = this.add.text(this.GetWidthOrigin()+100,this.GetHeightOrigin()-245,'Health:');
		this.PauseButt = this.add.image(this.GetWidthOrigin()+350,this.GetHeightOrigin()-250,'PauseButt').setInteractive();
		this.PauseButt.on('pointerdown',function(){this.Pause();},this);

		this.PauseGroup = this.add.group();
		this.PausePlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'PausePlate');
		this.ResumeButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()-120,'ResumeButt').setInteractive();
		this.PauseMenuBackButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()+120,'PauseMenuBackButt').setInteractive();
		this.PauseLobbyBackButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'PauseLobbyBackButt').setInteractive();

		this.ResumeButt.on('pointerdown',function(){this.Unpause()},this);
		this.PauseMenuBackButt.on('pointerdown',function(){this.BackToMenu()},this);
		this.PauseLobbyBackButt.on('pointerdown',function(){this.BackToLobby()},this);

		this.PauseGroup.add(this.PausePlate);
		this.PauseGroup.add(this.ResumeButt);
		this.PauseGroup.add(this.PauseMenuBackButt);
		this.PauseGroup.add(this.PauseLobbyBackButt);

		for(var i =0;i<this.PauseGroup.getLength();i++){
			this.PauseGroup.children.entries[i].visible=false;
		}



		this.WinGroup = this.add.group();
		this.WinPlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'WinPlate');
		this.WinText = this.add.image(this.GetWidthOrigin()+5,this.GetHeightOrigin()-100,'WinText');
		this.WinMenuButt = this.add.image(this.GetWidthOrigin()+130,this.GetHeightOrigin()+100,'WinMenuButt').setInteractive();
		this.WinLobbyButt = this.add.image(this.GetWidthOrigin()-130,this.GetHeightOrigin()+100,'WinLobbyButt').setInteractive();
		
		this.WinMenuButt.on('pointerdown',function(){this.BackToMenu();},this);
		this.WinLobbyButt.on('pointerdown',function(){this.BackToLobby();},this);


		this.WinGroup.add(this.WinPlate);
		this.WinGroup.add(this.WinText);
		this.WinGroup.add(this.WinMenuButt);
		this.WinGroup.add(this.WinLobbyButt);
		for(var i =0;i<this.WinGroup.getLength();i++){
			this.WinGroup.children.entries[i].visible=false;
		}



		this.LoseGroup = this.add.group();
		this.LosePlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'LosePlate');
		this.LoseText = this.add.image(this.GetWidthOrigin()+5,this.GetHeightOrigin()-100,'LoseText');
		this.LoseMenuButt = this.add.image(this.GetWidthOrigin()+130,this.GetHeightOrigin()+100,'LoseMenuButt').setInteractive();
		this.LoseLobbyButt = this.add.image(this.GetWidthOrigin()-130,this.GetHeightOrigin()+100,'LoseLobbyButt').setInteractive();

		this.LoseMenuButt.on('pointerdown',function(){this.BackToMenu();},this);
		this.LoseLobbyButt.on('pointerdown',function(){this.BackToLobby();},this);


		this.LoseGroup.add(this.LosePlate);
		this.LoseGroup.add(this.LoseText);
		this.LoseGroup.add(this.LoseMenuButt);
		this.LoseGroup.add(this.LoseLobbyButt);

		for(var i =0;i<this.LoseGroup.getLength();i++){
			this.LoseGroup.children.entries[i].visible=false;
		}








		this.input.on('pointerdown', function(pointer){
			if(pointer.leftButtonDown() && pointer.rightButtonDown()){

			} else if(pointer.leftButtonDown()){
					this.Move();
			} else if(pointer.rightButtonDown()){
					this.Block();
					//this.DecreaseVel();
			}
		},this.LeftOpponent);

		this.input.on('pointerup',function(pointer){
			if(pointer.rightButtonDown() == false){
				this.Unblock();
			}
		},this.LeftOpponent);
		this.input.topOnly = true;


	}

	update(){
		this.LeftStamina.setText('Stamina: '+ Math.floor(this.LeftOpponent.Stamina));
		this.LeftHP.setText('Health: '+ Math.floor(this.LeftOpponent.Health));
		this.RightStamina.setText('Stamina: '+ Math.floor(this.RightOpponent.Stamina));
		this.RightHP.setText('Health: '+ Math.floor(this.RightOpponent.Health));
		if(!this.AttachedScene.inGame){
			if(this.AttachedScene.Winner != null){
				if(this.AttachedScene.Winner == "Left"){
					this.PlayerWin();
				} else if(this.AttachedScene.Winner == "Right"){
					this.PlayerLose();
				}
			}
		}

	}

	PlayerWin(){
		for(var i =0;i<this.WinGroup.getLength();i++){
			this.WinGroup.children.entries[i].visible=true;
		}

	}

	PlayerLose(){
		for(var i =0;i<this.LoseGroup.getLength();i++){
			this.LoseGroup.children.entries[i].visible=true;
		}
	}

	Pause(){
		this.AttachedScene.scene.pause();
		for(var i =0;i<this.PauseGroup.getLength();i++){
			this.PauseGroup.children.entries[i].visible=true;
		}
	}

	Unpause(){
		for(var i =0;i<this.PauseGroup.getLength();i++){
			this.PauseGroup.children.entries[i].visible=false;
		}
		this.AttachedScene.scene.resume()
	}

	BackToMenu(){
		this.AttachedScene.scene.stop();
		this.scene.start('mainMenu');
		console.log("Going Back to Menu.");
	}

	BackToLobby(){
		this.AttachedScene.scene.stop();
		this.scene.start('SologameLobby');
		console.log("Going Back to Lobby,")
	}

} 

class SoloGameLobby extends baseclass {

	constructor(){
		super({key:'SologameLobby'});
	}

	preload(){
		this.load.image('SoloLobbyBack',"assets/Backgrounds/GameLobbyBackground-placeholder.jpg");
		this.load.image('QuitButt',"assets/Buttons/QuitButt.png");
		this.load.image('PlayButt',"assets/Buttons/PlayButt.png");
		this.load.image('LobbyBasePlate',"assets/Images/LobbyBasePlate.png");
		this.load.image('CharSlot',"assets/Images/Slots.png");
		this.load.image('DebugButt',"assets/Buttons/DebugButt.png");
		this.load.image('FightButt',"assets/Buttons/FightButt.png");
		
		this.load.image('EasyButt',"assets/Buttons/EasyButt.png");
		this.load.image('MediumButt',"assets/Buttons/MedumButt.png");
		this.load.image('HardButt',"assets/Buttons/HardButt.png");
		this.load.image('ExtremeButt',"assets/Buttons/ExtremeButt.png");

		this.load.image('DuelsButt',"assets/Buttons/DuelButt.png");
		this.load.image('ArenaBattleButt',"assets/Buttons/ArenaBattleButt.png");

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
	}

	create(){
		this.input.mouse.disableContextMenu();
		var TitleStyling = {fontSize:32 ,align: 'center',fill: '#000000'};
		var TextStyling = {fontSize: 72 ,align: 'center',fill: '#000000'};
		this.LobbyBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'SoloLobbyBack');
		var BasePlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()-60,'LobbyBasePlate');
		BasePlate.scaleY =0.9

		this.QuitButt = this.add.image(this.GetWidthOrigin()-275,this.GetHeightOrigin()+225,'QuitButt').setInteractive();
		this.QuitButt.on('pointerdown',function(){this.BacktoMenu();},this);
		this.PlayButt = this.add.image(this.GetWidthOrigin()+275,this.GetHeightOrigin()+225,'PlayButt').setInteractive();
		this.PlayButt.on('pointerdown',function(){this.PlayGame();},this);
		this.PlayButt.visible = false;
		this.TitleText = this.add.text(this.GetWidthOrigin()-180,this.GetHeightOrigin()-255,'Singleplayer Lobby',TitleStyling);

		this.StaminaLabel = this.add.text(this.GetWidthOrigin()-290,this.GetHeightOrigin()+65,'0',TextStyling);
		this.RegenLabel = this.add.text(this.GetWidthOrigin()-155,this.GetHeightOrigin()+65,'0',TextStyling);
		this.HealthLabel = this.add.text(this.GetWidthOrigin()-20,this.GetHeightOrigin()+65,'0',TextStyling);
		this.MaxSpeedLabel = this.add.text(this.GetWidthOrigin()+120,this.GetHeightOrigin()+65,'0',TextStyling);
		this.WeightLabel = this.add.text(this.GetWidthOrigin()+255,this.GetHeightOrigin()+65,'0',TextStyling);
		;
		this.CharacterSlots = this.add.group();
		for(var i =0;i<10;i++){
			var test = this.add.image(this.GetWidthOrigin()-280 + (i*62.5),this.GetHeightOrigin()-140,'CharSlot');
			this.CharacterSlots.add(test); 
		}


		this.Difficulty = "Easy";
		this.GameMode = "Duel";
		this.FightButt = this.add.image(this.GetWidthOrigin()+280,this.GetHeightOrigin()+225,'FightButt').setInteractive();
		this.FightButt.on('pointerdown',function(){if(this.SelectedChar != ""){this.PlayGame(this.Difficulty);}else {alert("Please Select a Character!");}},this);

		var x1 = 0.5;
		var y1= 0.5;

		var x2 = 0.30;
		var y2= 0.30;


		this.EasyButt = this.add.image(this.GetWidthOrigin()-265,this.GetHeightOrigin()-30,'EasyButt').setScale(x1,y1).setInteractive()
		this.MediumButt = this.add.image(this.GetWidthOrigin()-160,this.GetHeightOrigin()-30,'MediumButt').setScale(x1,y1).setInteractive()
		this.HardButt = this.add.image(this.GetWidthOrigin()-55,this.GetHeightOrigin()-30,'HardButt').setScale(x1,y1).setInteractive()
		this.ExtremeButt = this.add.image(this.GetWidthOrigin()+50,this.GetHeightOrigin()-30,'ExtremeButt').setScale(x1,y1).setInteractive();

		this.EasyButt.on('pointerdown',function(){this.ChangeDifficulty("Easy");},this);
		this.MediumButt.on('pointerdown',function(){this.ChangeDifficulty("Medium");},this);
		this.HardButt.on('pointerdown',function(){this.ChangeDifficulty("Hard");},this);
		this.ExtremeButt.on('pointerdown',function(){this.ChangeDifficulty("Extreme");},this);

		this.GameModeText = this.add.text(this.GetWidthOrigin()-100,this.GetHeightOrigin()+225,'GameMode: ');
		this.DifficultyText = this.add.text(this.GetWidthOrigin()-100,this.GetHeightOrigin()+200,'Difficulty: ');
		this.SelectedCharText = this.add.text(this.GetWidthOrigin()-100,this.GetHeightOrigin()+250,'Selected Character: ');

		this.SelectedChar = "";
		this.CharList = [
					"Beatrix",
						"Lukas",
						"Kasey",
						"Zaynab",
						"Yousif",
						"Janae",
						"Gurdeep",
						"Ayva",
						"Ubaid",
						"Georga"];

		this.Characters = this.add.group();
		for(var i = 0;i<this.CharList.length;i++){
			var CharName = this.CharList[i];
			var char = this.add.existing(new NamedChar(this,this.CharacterSlots.children.entries[i].x,this.CharacterSlots.children.entries[i].y,CharName,CharName)).setInteractive();
			char.setScale(0.5);
			this.Characters.add(char);
		}

		this.Characters.children.entries[0].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[0].name;this.Char = this.Characters.children.entries[0]},this);

		this.Characters.children.entries[1].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[1].name;this.Char = this.Characters.children.entries[1]},this);

		this.Characters.children.entries[2].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[2].name;this.Char = this.Characters.children.entries[2]},this);

		this.Characters.children.entries[3].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[3].name;this.Char = this.Characters.children.entries[3]},this);

		this.Characters.children.entries[4].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[4].name;this.Char = this.Characters.children.entries[4]},this);

		this.Characters.children.entries[5].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[5].name;this.Char = this.Characters.children.entries[5]},this);

		this.Characters.children.entries[6].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[6].name;this.Char = this.Characters.children.entries[6]},this);

		this.Characters.children.entries[7].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[7].name;this.Char = this.Characters.children.entries[7]},this);

		this.Characters.children.entries[8].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[8].name;this.Char = this.Characters.children.entries[8]},this);

		this.Characters.children.entries[9].on('pointerdown',function(){this.SelectedChar = this.Characters.children.entries[9].name;this.Char = this.Characters.children.entries[9]},this);
	}

	update(){
		
		this.updateLables(this.Char);
	}

	BacktoMenu(){
		this.Save();
		this.scene.start('mainMenu');
	}

	updateLables(Char){
		if (Char == null){
			this.StaminaLabel.setText(0);
			this.RegenLabel.setText(0);
			this.HealthLabel.setText(0);
			this.MaxSpeedLabel.setText(0);
			this.WeightLabel.setText(0);

			this.StaminaLabel.x = this.GetWidthOrigin()-290;
			this.RegenLabel.x =  this.GetWidthOrigin()-155;
			this.HealthLabel.x = this.GetWidthOrigin()-20;
			this.MaxSpeedLabel.x = this.GetWidthOrigin()+120;
			this.WeightLabel.x = this.GetWidthOrigin()+255;
			this.StaminaLabel.setScale(1);
			this.RegenLabel.setScale(1);
			this.HealthLabel.setScale(1);
			this.MaxSpeedLabel.setScale(1);
			this.WeightLabel.setScale(1);

		} else {
			this.StaminaLabel.setText(Char.GetMaxStamina());
			this.RegenLabel.setText(Char.GetStaminaRegen());
			this.HealthLabel.setText(Char.GetMaxHealth());
			this.MaxSpeedLabel.setText(Char.GetMaxSpeed());
			this.WeightLabel.setText(Char.GetVelGain());
			this.SelectedChar = this.Char.Name;
			this.SelectedCharText.setText('Selected Character: ' +this.Char.Name);

			this.StaminaLabel.x = this.GetWidthOrigin()-320;
			this.RegenLabel.x =  this.GetWidthOrigin()-165;
			this.HealthLabel.x = this.GetWidthOrigin()-50;
			this.MaxSpeedLabel.x = this.GetWidthOrigin()+90;
			this.WeightLabel.x = this.GetWidthOrigin()+235;
			this.StaminaLabel.setScale(0.8);
			this.RegenLabel.setScale(0.8);
			this.HealthLabel.setScale(0.8);
			this.MaxSpeedLabel.setScale(0.8);
			this.WeightLabel.setScale(0.8);
		}
		this.GameModeText.setText('GameMode: ' + this.GameMode);
		this.DifficultyText.setText('Difficulty: '+this.Difficulty);
		
	}

	Save(){
		console.log("Saving...");

	}

	ChangeDifficulty(Diff){
		this.Difficulty = Diff;
		console.log(this.Difficulty);
	}

	PlayGame(Difficulty){
		console.log("Staring Game...");
		console.log("Game Difficulty: " +this.Difficulty);
		console.log("Game Mode: "+this.GameMode);
		var Passeddata = {Diff: this.Difficulty,GM: this.GameMode,Char:this.SelectedChar};
		this.scene.start('Sologame',Passeddata);

	}
} 
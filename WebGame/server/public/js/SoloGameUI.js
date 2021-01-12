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

			} else if(pointer.leftButtonDown()||pointer.getDuration() <500){
					this.Move();
			} else if(pointer.rightButtonDown()||pointer.getDuration() >500){
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
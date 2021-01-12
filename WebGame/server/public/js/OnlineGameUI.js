var classself;
class OnlineGameUI extends baseclass{
	constructor(){
		super({key:'OnlineGameUI'});
	}
	preload(){
		this.load.image('DeathPlate',"assets/Images/DeathPlate.png");
		this.load.image('DeathImage',"assets/Images/DeathText.png");
		this.load.image('DeathButt',"assets/Buttons/DeathButt.png");
		this.load.image('WinPlate',"assets/Images/WinPlate.png");
		this.load.image('LosePlate',"assets/Images/LosePlate.png");
		this.load.image('WinText',"assets/Images/WinTitle.png");
		this.load.image('LoseText',"assets/Images/LoseTitle.png");
		this.load.image('LoseLobbyButt',"assets/Buttons/LobbyBackButt.png");
		this.load.image('WinLobbyButt',"assets/Buttons/WinLobbyBackButt.png");
	}

	init(data){
		console.log('Initializing UI',data);
		if(data.LeftOpponent !=null && data.RightOpponent !=null && data.Context !=null){
			this.LeftOpponent = data.LeftOpponent;
			this.RightOpponent = data.RightOpponent;
			this.AttachedScene = data.Context;
			this.socket = data.socket;
		}
	}

	create(){
		classself = this;
		this.input.mouse.disableContextMenu();
		this.HostText = this.add.text(this.GetWidthOrigin()-340,this.GetHeightOrigin()-290,'Host');
		this.LeftStamina = this.add.text(this.GetWidthOrigin()-340,this.GetHeightOrigin()-270,'Stamina:');
		this.LeftHP = this.add.text(this.GetWidthOrigin()-340,this.GetHeightOrigin()-245,'Health:');
		
		this.OppText = this.add.text(this.GetWidthOrigin()+100,this.GetHeightOrigin()-290, 'Opponent');
		this.RightStamina = this.add.text(this.GetWidthOrigin()+100,this.GetHeightOrigin()-270,'Stamina:');
		this.RightHP = this.add.text(this.GetWidthOrigin()+100,this.GetHeightOrigin()-245,'Health:');

		this.HostText.setText('Host: '+this.LeftOpponent.name);
		this.OppText.setText('Opponent: '+this.RightOpponent.name);

		this.DeathGroup = this.add.group();
		this.DeathPlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'DeathPlate');
		this.DeathImage = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'DeathImage');
		this.DeathButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'DeathButt').setInteractive();

		this.DeathButt.on('pointerdown',function(){this.BackToLobby();},this);

		this.DeathGroup.add(this.DeathPlate);
		this.DeathGroup.add(this.DeathImage);
		this.DeathGroup.add(this.DeathButt);

		for(var i =0;i<this.DeathGroup.getLength();i++){
			this.DeathGroup.children.entries[i].visible=false;
		}


		this.WinGroup = this.add.group();
		this.WinPlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'WinPlate');
		this.WinText = this.add.image(this.GetWidthOrigin()+5,this.GetHeightOrigin()-100,'WinText');
		this.WinLobbyButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()+100,'WinLobbyButt').setInteractive();
		
		this.WinLobbyButt.on('pointerdown',function(){this.BackToLobby();},this);


		this.WinGroup.add(this.WinPlate);
		this.WinGroup.add(this.WinText);
		this.WinGroup.add(this.WinLobbyButt);
		for(var i =0;i<this.WinGroup.getLength();i++){
			this.WinGroup.children.entries[i].visible=false;
		}



		this.LoseGroup = this.add.group();
		this.LosePlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'LosePlate');
		this.LoseText = this.add.image(this.GetWidthOrigin()+5,this.GetHeightOrigin()-100,'LoseText');
		this.LoseLobbyButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()+100,'LoseLobbyButt').setInteractive();
		this.LoseLobbyButt.on('pointerdown',function(){this.BackToLobby();},this);


		this.LoseGroup.add(this.LosePlate);
		this.LoseGroup.add(this.LoseText);
		this.LoseGroup.add(this.LoseLobbyButt);

		for(var i =0;i<this.LoseGroup.getLength();i++){
			this.LoseGroup.children.entries[i].visible=false;
		}


			this.StopInput = false;
			this.input.on('pointerdown', function(pointer){
				if(!this.StopInput){
					if(pointer.leftButtonDown() && pointer.rightButtonDown()){

						} else if(pointer.leftButtonDown()||pointer.getDuration() <500){
							this.socket.emit('Move',this.AttachedScene.AmHost,this.AttachedScene.Lobby);
						} else if(pointer.rightButtonDown()||pointer.getDuration() >500){
							this.socket.emit('Block',this.AttachedScene.AmHost,this.AttachedScene.Lobby);
						}
					}},this);

				this.input.on('pointerup',function(pointer){
					if(pointer.rightButtonDown() == false){
						this.socket.emit('UnBlock',this.AttachedScene.AmHost,this.AttachedScene.Lobby);
					}
				},this);

					

			




			this.socket.on('OpponentMove',function(){
				classself.RightOpponent.Move();
			});		
			this.socket.on('OpponentBlock',function(){
				classself.RightOpponent.Block();
			});
			this.socket.on('OpponentUnBlock',function(){
				classself.RightOpponent.Unblock();
			});
	

			this.socket.on('HostMove',function(){
				classself.LeftOpponent.Move();
			});		
			this.socket.on('HostBlock',function(){
				classself.LeftOpponent.Block();
			});
			this.socket.on('HostUnBlock',function(){
				classself.LeftOpponent.Unblock();
			});		
	
		

			this.socket.on('HostLeft',function(){
				console.log('Host Disconnected');
				classself.PlayerWin();
			});
			this.socket.on('PlayerLeft',function(){
				console.log('Opponent Disconnected');
				classself.PlayerWin();
			});





		this.socket.on('GameLoss',function(){
			classself.MatchResult = "Lose";
			classself.PlayerLose();
		});

		this.socket.on('GameWin',function(){
			classself.MatchResult = "Win";
			classself.PlayerWin();
		});

		this.socket.on('GameDeath',function(){
			classself.MatchResult = "Death";
			classself.PlayerDeath();
		});
		this.Gamelatchkey = true;
	}

	update(){
		this.LeftStamina.setText('Stamina: '+ Math.floor(this.LeftOpponent.Stamina));
		this.LeftHP.setText('Health: '+ Math.floor(this.LeftOpponent.Health));
		this.RightStamina.setText('Stamina: '+ Math.floor(this.RightOpponent.Stamina));
		this.RightHP.setText('Health: '+ Math.floor(this.RightOpponent.Health));
		if(!this.AttachedScene.inGame){
			this.StopInput = true;	
			if(this.Gamelatchkey){
				this.Gamelatchkey = false;
				if(this.AttachedScene.Winner != null){
					if(this.AttachedScene.LoserToDie == true){
						this.socket.emit('MatchOverDeath',this.AttachedScene.Winner,this.AttachedScene.Lobby);
					} else {
						this.socket.emit('MatchOver',this.AttachedScene.Winner,this.AttachedScene.Lobby);
					}
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

	PlayerDeath(){
		for(var i =0;i<this.DeathGroup.getLength();i++){
			this.DeathGroup.children.entries[i].visible=true;
		}
	}

	BackToLobby(){
		this.AttachedScene.scene.stop();
		var MatchData = {MatchResult:this.MatchResult,MatchDiff:this.AttachedScene.Difficulty,socket:this.socket}
		this.scene.start('OnlineGameLobby',MatchData);
		console.log("Going Back to Lobby.")
	}
}
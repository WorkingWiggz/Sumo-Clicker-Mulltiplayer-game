var self;

class OnlineGameLobby extends baseclass{
	constructor(){
		super({key:'OnlineGameLobby'});
	}

	init(data){
		if(data.MatchResult != null && data.MatchDiff != null){
			this.PastMatchResult = data.MatchResult;
			this.PastMatchDiff = data.MatchDiff;
		}
		if(data.socket != null){
			this.socket = data.socket;
			this.socketSet = true;
		} else {
			this.socketSet=false;
		}



	}

	preload(){
		this.load.image('OnlineLobbyBack',"assets/Backgrounds/OnlineLobbyBack-Placeholder.jpg");
		this.load.image('OnlineLobbyPlate',"assets/Images/OnlineLobbyPlate.png");
		this.load.image('OnlineQuitButt',"assets/Buttons/OnlineQuitButt.png");
		this.load.image('OnlineSearchButt',"assets/Buttons/OnlineSearchButt.png");
		this.load.image('OnlineHostButt',"assets/Buttons/OnlineHostButt.png");
		this.load.image('OnlineFightButt',"assets/Buttons/OnlineFightButt.png");
		this.load.image('UpgradeSkill1',"assets/Buttons/UpgradeSkill.png");
		this.load.image('UpgradeSkill2',"assets/Buttons/UpgradeSkill1.png");
		this.load.image('UpgradeSkill3',"assets/Buttons/UpgradeSkill2.png");
		this.load.image('UpgradeSkill4',"assets/Buttons/UpgradeSkill4.png");
		this.load.image('UpgradeSkill5',"assets/Buttons/UpgradeSkill5.png");
		this.load.image('Online',"assets/Images/OnlineChar.png");
		this.load.image('OnlineEasyButt',"assets/Buttons/OnlineEasyButt.png");
		this.load.image('OnlineMediumButt',"assets/Buttons/OnlineMediumButt.png");
		this.load.image('OnlineHardButt',"assets/Buttons/OnlineHardButt.png");
		this.load.image('OnlineExtremeButt',"assets/Buttons/OnlineExtremeButt.png");
		this.load.image("LeaveLobbyButt","assets/Buttons/LeaveLobbyButt.png");
	}	

	create(){
		self = this;
		if(!this.socketSet){
			this.socket = io.connect();
			
		}

		this.OnlineChar = this.LoadChar();
			if(this.PastMatchResult == "Win"){
				this.MatchWon(this.PastMatchDiff);
			} else if(this.PastMatchResult == "Lose"){
				this.MatchLost();
			} else if(this.PastMatchResult == "Death") {
				this.ResetChar();
			}
		this.HostPlayer = null
		this.Opponent = null;
		this.Lobby= null;
		this.OnlineChar.false;
		var TextStyiling = {};
		var TitleStyling = {};
		var StatsStyling = {};
		var HeadingStyling ={};

		this.OnlineBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'OnlineLobbyBack');
		this.OnlinePlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()-80,'OnlineLobbyPlate');

		this.OnlineQuitButt = this.add.image(this.GetWidthOrigin()-280,this.GetHeightOrigin()+200,'OnlineQuitButt').setInteractive();
		this.OnlineSearchButt = this.add.image(this.GetWidthOrigin()+20,this.GetHeightOrigin()+165,'OnlineSearchButt').setScale(1,0.8).setInteractive();
		this.OnlineHostButt = this.add.image(this.GetWidthOrigin()+20,this.GetHeightOrigin()+250,'OnlineHostButt').setScale(1,0.8).setInteractive();
		this.OnlineFightButt = this.add.image(this.GetWidthOrigin()+280,this.GetHeightOrigin()+200,'OnlineFightButt').setInteractive().setVisible(false);

		this.OnlineQuitButt.on('pointerdown',function(){this.QuitToMenu();},this);
		this.OnlineHostButt.on('pointerdown',function(){this.HostGame();},this);
		this.OnlineSearchButt.on('pointerdown',function(){this.SearchForGame();},this);
		this.OnlineFightButt.on('pointerdown',function(){this.StartGame();},this);

		this.LobbyTitle = this.add.text(this.GetWidthOrigin()-40,this.GetHeightOrigin()-250,'Online Lobby',TitleStyling);
		

		var Stamina = this.add.text(this.GetWidthOrigin()-215,this.GetHeightOrigin()-160,'  Max\nStamina',HeadingStyling);
		var StaminaRegen = this.add.text(this.GetWidthOrigin()-280,this.GetHeightOrigin()-160,'Stamina\n Regen',HeadingStyling);
		var SpeedGain = this.add.text(this.GetWidthOrigin()-80,this.GetHeightOrigin()-160,'Speed\nGain',HeadingStyling);
		var MaxHealth = this.add.text(this.GetWidthOrigin()-145,this.GetHeightOrigin()-160,' Max\nHealth',HeadingStyling);
		var MaxSpeed = this.add.text(this.GetWidthOrigin()-35,this.GetHeightOrigin()-160,' Max\nSpeed',HeadingStyling);

		this.MyCharName = this.add.text(this.GetWidthOrigin()-270,this.GetHeightOrigin()-220,'Player Name');
		this.MyGoldText = this.add.text(this.GetWidthOrigin()-270,this.GetHeightOrigin()-190,'Gold: ');		


		this.MyCharStaminaRegen = this.add.text(this.GetWidthOrigin()-260,this.GetHeightOrigin()-110,'0',StatsStyling);
		this.MyCharMaxStamina = this.add.text(this.GetWidthOrigin()-200,this.GetHeightOrigin()-110,'0',StatsStyling);
		this.MyCharMaxHealth = this.add.text(this.GetWidthOrigin()-135,this.GetHeightOrigin()-110,'0',StatsStyling);
		this.MyCharVelGain = this.add.text(this.GetWidthOrigin()-70,this.GetHeightOrigin()-110,'0',StatsStyling);
		this.MyCharMaxSpeed = this.add.text(this.GetWidthOrigin()-20,this.GetHeightOrigin()-110,'0',StatsStyling);


		this.MySpeedUps = this.add.text(this.GetWidthOrigin()-25,this.GetHeightOrigin()-20,'',StatsStyling);
		this.MyVelUps = this.add.text(this.GetWidthOrigin()-85,this.GetHeightOrigin()-20,'',StatsStyling);
		this.MyHealthUps = this.add.text(this.GetWidthOrigin()-145,this.GetHeightOrigin()-20,'',StatsStyling);
		this.MyStamUps = this.add.text(this.GetWidthOrigin()-215,this.GetHeightOrigin()-20,'',StatsStyling);
		this.MyRegenUps = this.add.text(this.GetWidthOrigin()-275,this.GetHeightOrigin()-20,'',StatsStyling);

		this.socket.on('UpdateCount',function(NumPlayers){self.OnlinePlayersText.setText('Online Players: ' + NumPlayers);})

		this.UpgradeRegen = this.add.image(this.GetWidthOrigin()-250,this.GetHeightOrigin()-60,'UpgradeSkill2').setInteractive();
		this.UpgradeStamina = this.add.image(this.GetWidthOrigin()-190,this.GetHeightOrigin()-60,'UpgradeSkill1').setInteractive();
		this.UpgradeHealth = this.add.image(this.GetWidthOrigin()-120,this.GetHeightOrigin()-60,'UpgradeSkill3').setInteractive();
		this.UpgradeVelGain = this.add.image(this.GetWidthOrigin()-60,this.GetHeightOrigin()-60,'UpgradeSkill4').setInteractive();
		this.UpgradeMaxSpeed = this.add.image(this.GetWidthOrigin()-10,this.GetHeightOrigin()-60,'UpgradeSkill5').setInteractive();

		this.UpgradeStamina.on('pointerdown',function(){this.UpgradeStat("Stamina");},this);
		this.UpgradeRegen.on('pointerdown',function(){this.UpgradeStat("Regen");},this);
		this.UpgradeHealth.on('pointerdown',function(){this.UpgradeStat("MaxHealth");},this);
		this.UpgradeVelGain.on('pointerdown',function(){this.UpgradeStat("VelGain");},this);
		this.UpgradeMaxSpeed.on('pointerdown',function(){this.UpgradeStat("MaxSpeed");},this);

		var Difficulty = this.add.text(this.GetWidthOrigin()-280,this.GetHeightOrigin()+10,'Choose Match Difficulty:',{});

		this.EasyButt = this.add.image(this.GetWidthOrigin()-250,this.GetHeightOrigin()+60,'OnlineEasyButt').setInteractive().setScale(0.4,0.5);
		this.MediumButt = this.add.image(this.GetWidthOrigin()-165,this.GetHeightOrigin()+60,'OnlineMediumButt').setInteractive().setScale(0.4,0.5);
		this.HardButt = this.add.image(this.GetWidthOrigin()-80,this.GetHeightOrigin()+60,'OnlineHardButt').setInteractive().setScale(0.4,0.5);
		this.ExtremeButt = this.add.image(this.GetWidthOrigin()+5,this.GetHeightOrigin()+60,'OnlineExtremeButt').setInteractive().setScale(0.4,0.5);

		this.EasyButt.on('pointerdown',function(){this.GameMode = "Easy"; this.MatchDiffText.setText("Easy");},this);
		this.MediumButt.on('pointerdown',function(){this.GameMode = "Medium";this.MatchDiffText.setText("Medium");},this);
		this.HardButt.on('pointerdown',function(){this.GameMode = "Hard";this.MatchDiffText.setText("Hard");},this);
		this.ExtremeButt.on('pointerdown',function(){this.GameMode = "Extreme";this.MatchDiffText.setText("Extreme");},this);


		this.OnlinePlayersText = this.add.text(this.GetWidthOrigin()+30,this.GetHeightOrigin()-160,'Online Players: ',TextStyiling);
		this.ConnectedPlayersText = this.add.text(this.GetWidthOrigin()+30,this.GetHeightOrigin()-160+20,'Lobby: ');
		
		
		

		this.HostName = this.add.text(this.GetWidthOrigin()+30,this.GetHeightOrigin()-120,'1)');
		this.HostReadyState = this.add.text(this.GetWidthOrigin()+50,this.GetHeightOrigin()-100,'Unready');


		this.OpponentName = this.add.text(this.GetWidthOrigin()+30,this.GetHeightOrigin()-80,'2)');
		this.OpponentReadyState = this.add.text(this.GetWidthOrigin()+50,this.GetHeightOrigin()-60,'Unready');

		var GameState = this.add.text(this.GetWidthOrigin()+60,this.GetHeightOrigin()+40,'GameState:');
		this.GameStateText = this.add.text(this.GetWidthOrigin()+60,this.GetHeightOrigin()+60,'Standing By.');

		var MatchDiff = this.add.text(this.GetWidthOrigin()+60,this.GetHeightOrigin(),'Match Difficulty:');
		this.MatchDiffText = this.add.text(this.GetWidthOrigin()+60,this.GetHeightOrigin()+20,'');

		this.LeaveLobbyButt = this.add.image(this.GetWidthOrigin()+220,this.GetHeightOrigin()-25,'LeaveLobbyButt').setInteractive().setScale(0.5,0.4).setVisible(false);
		this.LeaveLobbyButt.on('pointerdown',function(){this.LeaveLobby();},this);

		this.socket.on('LobbyJoined',function(LobbyData,HostData){
			console.log('Lobby Joined.');
			self.LeaveLobbyButt.setVisible(true);
			self.Lobby = LobbyData;
			self.OnlineFightButt.setVisible(true);
			self.HostPlayer = HostData;
			self.HostPlayer.ready = true;
			self.HostName.text = "1) " + self.HostPlayer.name;
			self.GameStateText.setText("Lobby Joined.\nPlease ready...");
		});
		this.socket.on('OpponentReady',function(){
			self.Opponent.ready = true;
			self.GameStateText.setText("Opponent Ready\nBegin Match When ready.")

		});

		this.socket.on('PlayerJoined',function(LobbyData,OppData){
			console.log('Player Joined');
			self.Lobby = LobbyData;
			self.Opponent = OppData;
			self.OpponentName.text = "2) "+ self.Opponent.name;
			self.OnlineFightButt.setVisible(true);
			self.GameStateText.setText("Player Joined.\nPlease Wait...");
		});

		this.socket.on('PlayerLeft',function(NewLobbyData){
			self.GameStateText.setText("Player Left\nPlease wait some more.");
			self.OpponentName.text = "2)";
			self.Lobby = NewLobbyData;
			self.Opponent.ready = false;
		});
		this.socket.on('HostLeft',function(){
			self.GameStateText.setText("Host Left.\n Please Search again.");
			self.HostName.text = "1)";
			self.Lobby = null;
			self.LeaveLobbyButt.setVisible(false);
			self.Opponent.ready = false;
			self.HostPlayer.ready = false;
		});
		this.socket.on('LobbyCreated',function(LobbyCreated){
			self.Lobby = LobbyCreated;
		});

		this.socket.on('GameNotFound',function(){
			self.GameStateText.setText('Game Not Found.\nPlease Search again.');
			self.Searching = false; 
		});

		this.socket.on('StartingMatch',function(GameData){
			GameData.socket =this;
			GameData.AmHost = self.Hosting;
			self.scene.start('OnlineGame',GameData);
		})	
	}

	update(){
		this.UpdateData();
		this.socket.emit('UpdateChar',this.OnlineChar,this.OnlineChar.GetMaxStamina(),this.OnlineChar.GetVelGain(),this.OnlineChar.GetMaxSpeed(),this.OnlineChar.GetRegen(),this.OnlineChar.GetMaxHealth(),this.PlayerName);
	}

	UpgradeStat(Stat){
		if(this.HasEnoughMoney(Stat)){
			switch(Stat){
				case"Stamina":
					console.log("Upgrading Stamina...");
					this.gold = this.gold -(this.StamUps*10)*1.137;
					this.OnlineChar.SetMaxStamina(this.OnlineChar.GetMaxStamina() + (this.StamUps*2.5));
					this.StamUps++;
				break;
				case"Regen":
					console.log("Upgrading Regen...");
					this.gold = this.gold -(this.RegenUps*10)*1.137;
					this.OnlineChar.SetRegen(this.OnlineChar.GetRegen() + (this.RegenUps*0.5));
					this.RegenUps++;
				break;
				case"VelGain":
					console.log("Upgrading VelGain...");
					this.gold = this.gold -(this.VelUps*10)*1.137;
					this.OnlineChar.SetVelGain(this.OnlineChar.GetVelGain() + (this.VelUps*0.7));
					this.VelUps++;
				break;
				case"MaxSpeed":
					console.log("Upgrading MaxSpeed...");
					this.gold = this.gold -(this.SpeedUps*10)*1.137;
					this.OnlineChar.SetMaxSpeed(this.OnlineChar.GetMaxSpeed() + (this.SpeedUps*10));
					this.SpeedUps++;
				break;
				case"MaxHealth":
					console.log("Upgrading MaxHealth...");
					this.gold = this.gold -(this.HealthUps*10)*1.137;
					this.OnlineChar.SetMaxHealth(this.OnlineChar.GetMaxHealth() + (this.HealthUps*0.7));
					this.HealthUps++;
				break;
			}
			this.OnlineChar.RefreshChar();
			this.SaveChar();
		}
	}


	UpdateData(){
		this.Stamina = this.OnlineChar.GetMaxStamina();
		this.Regen = this.OnlineChar.GetRegen();
		this.VelGain = this.OnlineChar.GetVelGain();
		this.MaxHealth = this.OnlineChar.GetMaxHealth();
		this.MaxSpeed = this.OnlineChar.GetMaxSpeed();
		this.OnlineChar.setName(this.PlayerName);
		this.UpdateLables();
	}

	UpdateLables(){
		this.MyCharName.setText(this.PlayerName);
		this.MyCharMaxStamina.setText(Math.floor(this.Stamina));
		this.MyCharMaxSpeed.setText(Math.floor(this.MaxSpeed));
		this.MyCharVelGain.setText(Math.floor(this.VelGain));
		this.MyCharStaminaRegen.setText(Math.floor(this.Regen));
		this.MyCharMaxHealth.setText(Math.floor(this.MaxHealth));
		this.MyGoldText.setText("Gold: " + Math.round(this.gold));
		this.MyStamUps.setText("Lv. " + this.StamUps);
		this.MyRegenUps.setText("Lv. " + this.RegenUps);
		this.MyVelUps.setText("Lv. " + this.VelUps);
		this.MyHealthUps.setText("Lv. " + this.HealthUps);
		this.MySpeedUps.setText("Lv. " + this.SpeedUps);
	
		if(this.Opponent !=null){
			if(this.Opponent.ready){
				this.OpponentReadyState.setText("Ready");
			} else {
				this.OpponentReadyState.setText("Unready");
			}
		}

		if(this.HostPlayer  !=null){
			if(this.HostPlayer.ready){
				this.HostReadyState.setText("Ready");
			} else {
				this.HostReadyState.setText("Unready");
			}
		}	
	}


	LoadChar(){
		var testcheck = this.GetCookie("PlayerName");
		if(testcheck == ""){
			this.Stamina = 100;
			this.Regen = 20;
			this.VelGain = 10;
			this.MaxHealth = 100;
			this.MaxSpeed =50;
			this.gold = 500;
			this.WinStreak=0;
			this.Wins = 0;
			this.Losses =0;
			this.StamUps = 1;
			this.RegenUps = 1;
			this.VelUps = 1;
			this.HealthUps = 1;
			this.SpeedUps = 1;
			this.PlayerName = this.GetPlayerName();
			this.SaveChar();
		} else {
			this.PlayerName = testcheck;
			this.Stamina = parseInt(this.GetCookie("Stamina"),10);
			this.Regen = parseInt(this.GetCookie("Regen"),10);
			this.VelGain = parseInt(this.GetCookie("VelGain"),10);
			this.MaxHealth = parseInt(this.GetCookie("MaxHealth"),10);
			this.MaxSpeed = parseInt(this.GetCookie("MaxSpeed"),10);
			this.gold = parseInt(this.GetCookie("gold"),10);
			this.WinStreak = parseInt(this.GetCookie("WinStreak"),10);
			this.Wins = parseInt(this.GetCookie("Wins"),10);
			this.Losses = parseInt(this.GetCookie("Losses"));
			this.StamUps = parseInt(this.GetCookie("StamUps"),10);
			this.RegenUps =parseInt(this.GetCookie("RegenUps"),10);
			this.VelUps = parseInt(this.GetCookie("VelUps"),10);
			this.HealthUps = parseInt(this.GetCookie("HealthUps"),10);
			this.SpeedUps = parseInt(this.GetCookie("SpeedUps"),10);

		}
		var hold = this.add.existing(new OnlineChar(this,this.GetWidthOrigin(),this.GetHeightOrigin(),'Online',this.Stamina,this.MaxHealth,this.MaxSpeed,this.VelGain,this.Regen)).setVisible();
			return hold ; 
	}

	SaveChar(){
		this.setCookie("PlayerName",this.PlayerName,30);
		this.setCookie("Stamina",this.Stamina,30);
		this.setCookie("Regen",this.Regen,30);
		this.setCookie("VelGain",this.VelGain,30);
		this.setCookie("MaxHealth",this.MaxHealth,30);
		this.setCookie("MaxSpeed",this.MaxSpeed,30);
		this.setCookie("gold",this.gold,30);
		this.setCookie("Wins",this.Wins,30);
		this.setCookie("StamUps",this.StamUps,30);
		this.setCookie("RegenUps",this.RegenUps,30);
		this.setCookie("VelUps",this.VelUps,30);
		this.setCookie("HealthUps",this.HealthUps,30);
		this.setCookie("SpeedUps",this.SpeedUps,30);
	}

	GetPlayerName(){
		var hold = prompt("Enter your Player Name: ","TestyBoi");
		if(hold != null){
			return hold;
		} else {
			return this.GetPlayerName();
		}
	}

	HasEnoughMoney(Stat){
		var hold = false;
		if(Stat == "Stamina"){
			if(this.gold >=(this.StamUps*10)*1.137){
				return true;
			}
		} else if(Stat == "Regen"){
			if(this.gold >=(this.RegenUps*10)*1.137){
				return true;
			}
		} else if(Stat == "VelGain"){
			if(this.gold >=(this.VelUps*10)*1.137){
				return true;
			}
		} else if(Stat == "MaxSpeed"){
			if(this.gold >=(this.SpeedUps*10)*1.137){
				return true;
			}
		} else if(Stat == "MaxHealth"){
			if(this.gold >=(this.HealthUps*10)*1.137){
				return true;
			}
		}
		return hold;
	}

	QuitToMenu(){	
		if(confirm("Are you sure you want to go back to menu. Your character will be saved.")){
			console.log("Back to Menu...");
			
			if(this.lobby!=null){
				this.LeaveLobby();
			}
			this.SaveChar();
			this.socket.disconnect();
			this.scene.start('mainMenu');
		}
	}

	SearchForGame(){
		if(this.preGameChecks()){
			console.log("Sarching for Game...");
			this.Hosting = false;
			this.Opponent = this.OnlineChar;
			this.OpponentName.text = "2) "+this.PlayerName + " (You)";
			this.HostName.text = "1)";
			this.GameStateText.setText('Searching for host...');
			this.socket.emit('SearchingForGame',this.GameMode);
		}
	}	

	HostGame(){
		if(this.preGameChecks()){
			console.log("Hosting Game...");
			this.Hosting = true;
			this.HostName.text = "1) "+this.PlayerName + " (You)";
			this.OpponentName.text = "2)";
			this.LeaveLobbyButt.setVisible(true);
			this.HostPlayer = this.OnlineChar;
			this.HostPlayer.ready = true;
			this.GameStateText.setText('Hosting Game.\nWaiting for Opponent\nto join.');
			this.socket.emit('HostingGame',this.GameMode);
		}
	}

	LeaveLobby(){
		console.log("Leaving Lobby....");
		this.LeaveLobbyButt.setVisible(false);
		this.Hosting = false;
		this.GameStateText.setText('Standing By');
		this.HostName.text = "1)";
		this.OpponentName.text = "2)";
		this.OnlineFightButt.setVisible(false);
		this.socket.emit('LeaveLobby',this.Lobby,this.GameMode);

		if(this.Opponent != null){
			this.Opponent.ready = false;
		}

		if(this.HostPlayer != null){
			this.HostPlayer.ready = false;
		}

		
		this.Lobby = null;
	}



	preGameChecks(){
		if(this.GameMode == null){
			alert("Please Pick a Match Difficulty.");
			return false;
		} else if(this.Lobby !=null){
			if(confirm("Do you want to leave this lobby?")){
				this.LeaveLobby();
				return true;
			} else {
				alert("Already In a lobby, please leave to make a new one.");
				return false;
			}
			
			return true;
		}else if(this.Searching){
			alert("Already Searching for a match please wait.");
			return false;
		}else {
			return true;
		}
	}

	GameChecks(){
		if(this.Hosting){
			if(this.Opponent == null){
				// if no player has joined.
				alert("Cannot start, no Player has joined room yet.");
				return false;
			} else if(this.Opponent.ready ==false || this.Opponent.ready ==null){
				//if player is not  ready
				alert("Cannot start, Opponent has not readied yet.");
				return false;
			} else {
				return true;
			} 
		}else {
			this.ReadyUp();
			return false;
		}

	}

	StartGame(){
		if(this.GameChecks()){
			console.log("Starting Match...");
			var GameData = {HostPlayer: this.HostPlayer ,Opponent:this.Opponent  , Difficulty: this.GameMode,Lobby:this.Lobby,AmHost:this.Hosting,HostStats:[],OppStats:[]};
			this.socket.emit('StartMatch',GameData);
		}
	}

	ReadyUp(){
		this.Opponent.ready = true;
		this.socket.emit('PlayerReady');
		this.GameStateText.setText("Waiting for Host...");
	}
	ResetChar(){
			this.Stamina = 100;
			this.Regen = 20;
			this.VelGain = 10;
			this.MaxHealth = 100;
			this.MaxSpeed =50;
			this.gold = 500;
			this.WinStreak=0;
			this.Wins = 0;
			this.Losses =0;
			this.StamUps = 1;
			this.RegenUps = 1;
			this.VelUps = 1;
			this.HealthUps = 1;
			this.SpeedUps = 1;
			this.SaveChar();
	}

	MatchWon(matchdiff){
		switch(matchdiff){
			case "Easy":
				this.gold = this.gold + 50;
			break;
			case "Medium":
				if(this.WinStreak >3){
					var maxWinstreak = 3;
					this.gold = this.gold + (100 + (maxWinstreak*15))*1;
				} else {
					this.gold = this.gold  + (100 + (this.Winstreak*15))*1;
				}
			break;
			case "Hard":
				if(this.WinStreak >10){
					var maxWinstreak = 10;
				}
				else{
					this.gold = this.gold + (100 + (this.Winstreak*15))*1.5;
				}
			break;
			case "Extreme":
				this.gold = this.gold  + (100 + (this.Winstreak*15))*2;
			break;
		}
		this.WinStreak++;
		this.Wins++;
	}

	MatchLost(){
		this.WinStreak =0;
		this.gold= this.gold +25;
		this.Losses++;
	}

}
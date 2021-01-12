
 

class SoloGameLobby extends baseclass {

	constructor(){
		super({key:'SologameLobby'});
	}

	preload(){
		this.load.image('SoloLobbyBack',"assets/Backgrounds/GameLobbyBackground.jpg");
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
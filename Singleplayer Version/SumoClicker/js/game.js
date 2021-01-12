var game;
class GameSys extends Phaser.Game {

	constructor(Config){
		super(Config);
		this.scene.add('mainMenu',MainMenu,true);
		this.scene.add('Sologame',SoloGame,false);
		this.scene.add('SologameLobby',SoloGameLobby,false);
		this.scene.add('SologameUI',SoloGameUI,false);
		this.scene.add('SettingsPage',Settings,false);
		this.scene.add('tutorialPages',Tutorial,false);
		this.scene.add('ErrorPage',ErrorPage,false);
		this.scene.add('OnlineGameLobby',OnlineGameLobby,false);
		this.scene.add('OnlineGame',OnlineGame,false);
		this.scene.add('OnlineGameUI',OnlineGameUI,false);
	}

}
class baseclass extends Phaser.Scene {
	constructor(key){
		super(key);
	}


	GetWidthOrigin(){
		this.GameBoxWidth = this.scale.width;
		return this.GameBoxWidth/2;
	}

	GetHeightOrigin(){	
		this.GameBoxHeight = this.scale.height;
		return this.GameBoxHeight/2;
	}

	ErrorHandle(error){
		console.log(error);
		//this.scene.start('ErrorPage');
	}
}


class Tutorial extends baseclass {

	constructor(){
		super({key:'tutorialPages'});
	}


	preload(){
		this.load.image('TutorialBack',"assets/Backgrounds/TutorialBackground-placeholder.jpg");
		this.load.image('RightButt',"assets/Buttons/RightButt.png");
		this.load.image('LeftButt',"assets/Buttons/LeftButt.png");
		this.load.image('BackButt',"assets/Buttons/BackMenu.png");

		this.TitleTexts = ["Welcome",
							"Controls",
							"Single Player - Game Lobby",
							"Single Player - Difficulty",
							"Single Player - Duels",
							"Difficulty - Easy (Push Over)",
							"Difficulty - Medium (Pusher)",
							"Difficulty - Hard (Powerful Pusher)",
							"Difficulty - Extreme (Pure Powerful Pusher)",
							"Single Player - Arena Battles",
							"Online - Game Lobby",
							"Online - Difficulty",
							"Online - Duels",
							"Online - Arena Battles"							
							];

		this.DescTexts = ["Welcome to Sumo Clicker, a game focused on overpowering your enemies, winning the tournament, and becoming the greatest power pusher of them all.\nHere we will be teaching you the basics of the game for both single player and the online multi player aspects of the game.",
			"Mobile:\nTap one side to increase your speed, Another to Slowdown but make yourself harder to push.\nPC:\nLeft Click to increase your speed, Right Click to slowdown but make yourself harder to push.\nIncreasing speed costs stamina, if your stamina reaches zero it will cost health instead, but health DOES NOT REGENERATE. If your health reaches zero you will lose the match.",
			 "The Game starts by making you choose both the character you want to play as, the difficulty you want fight on and the game mode you want to play. The Two Game Mode Options are:\no\tDuels\no\tArena Battles",
			 "In this game there are varying difficulties with increased rewards for the more advanced difficulties. Each difficulty has each own bonuses and changes to how the game works which we will be covering further.",
			 "In this mode, the game has bonuses that it makes pushing incredibly easier such as:\no\tBiggest Arena\no\tDouble Health \no\tDouble Stamina Regen\no\tIncreased speed",
			 "In this mode, the game has bonuses to enhance your pushing prowess such as:\no\tStandard Arena\no\tStandard Health\no\tBonus Stamina Regen\no\tStandard Speed",
			 "In this mode, the game is harder now taking away bonuses and shrinking the arena:\no\tSmaller Arena\no\tHealth Halved\no\tHalved Stamina Regen\no\tStandard Speed",
			 "In this mode, the game is extremely difficult, no bonuses, a tiny arena and no stamina Regen fights are short and sweet.\no\tSmallest Arena\no\tNormal Health\no\tNO STAMINA REGEN\no\tTriple Speed gain",
			 "Duels take place with you trying to push your opponent off the arena before they can push you off to win. Winning gets you money to level up your character and losing gets you nothing but dishonour.",
			 "In this mode all players fight on a flat arena and every 2 minutes the players in the arena will need to be halved, surviving gets you a split of a bonus amongst the players on the arena remaining. This goes on until one remains and they get a money bonus all for themselves.\nIn this mode, you do not have health but get pushed twice as hard if you are out of stamina. Losing in this mode does not have any consequences but you can win lots for your character.",
			 "In the online mode, the game is different as instead of picking a character you have your own that will be focusing on upgrading their own stats with the money you earn from online matches.",
			 "Difficulty here has the same rules as the single player but with different bonuses:\t\nEasy\no\tWinnings * 0.5\no\tNo Win Streak\nMedium\no\tWinnings * 1\no\tWin Streak adds 0.1 to multiplier (max 3)\nHard\no\tWinnings * 1\no\tWin Streak adds 0.3 to multiplier (max 10)\nExtreme\no\tWinnings * 2\no\tWin Streak adds 0.45 to multiplier (No Max)",
			  "Duels in online work much like previously but with an added factor of risk. If your players health reaches 0 you will not only lose but halve your characters stats and current money. Be sure not to overdo it!",
			  "Arena battles work the same as before but with a rolling prize instead. Every 30 seconds the money is split by everyone in the arena the prize is reduced by how many players are still in the arena. Now you will have to choose risk pushing off players for the bigger prize or focus on surviving for the guaranteed money."
			];
	}

	create(){
		this.input.mouse.disableContextMenu();
		var TitleStyle = ﻿{ 
            fontSize: 72,
            fontFamily: 'Arial',
            fill: '#212742',
            align: "left",
            wordWrap: { width: 750, useAdvancedWrap: true }};
        var DescStyle = ﻿{ 
            fontSize: 24,
            fontFamily: 'Arial',
            fill: '#212742',
            align: "left",
            wordWrap: { width: 750, useAdvancedWrap: true }}

		this.TutPageCount =0;
		this.TutBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'TutorialBack');
		this.titleText = this.add.text(this.GetWidthOrigin()-375,this.GetHeightOrigin()-200,'TestTitle',TitleStyle);
		this.DescText = this.add.text(this.GetWidthOrigin()-375,this.GetHeightOrigin()-50,'TestDesc',DescStyle);
		this.RightButt = this.add.image(this.GetWidthOrigin()+250,this.GetHeightOrigin()+200,'RightButt').setInteractive();
		this.LeftButt = this.add.image(this.GetWidthOrigin()+100,this.GetHeightOrigin()+200,'LeftButt').setInteractive();
		this.BackMenu = this.add.image(this.GetWidthOrigin()-275,this.GetHeightOrigin()+200,'BackButt').setInteractive();
		this.RightButt.on('pointerdown',function(){this.RightPage();},this);
		this.LeftButt.on('pointerdown',function(){this.LeftPage();},this);
		this.BackMenu.on('pointerdown',function(){this.BackToMenu();},this);
	}

	update(){
		this.UpdateTutPage(this.TutPageCount);
	}

	LeftPage(){
		if(this.TutPageCount>0){
			this.TutPageCount--;
		}
	}

	RightPage(){
		if(this.TutPageCount<this.DescTexts.length-1){
			this.TutPageCount++;
		}
		
	}

	BackToMenu(){
		this.scene.start('mainMenu');
	}

	UpdateTutPage(pageNum){
		this.titleText.setText(this.TitleTexts[pageNum]);
		this.DescText.setText(this.DescTexts[pageNum]);

		if(pageNum == 0){
			this.RightButt.visible = true;
			this.LeftButt.visible = false;
			this.RightButt.input.enable = true;
			this.LeftButt.input.enable = false;
		} else if(pageNum ==this.TitleTexts.length-1){
			this.RightButt.visible = false;
			this.LeftButt.visible = true;
			this.RightButt.input.enable = false;
			this.LeftButt.input.enable = true;
		} else {
			this.RightButt.visible = true;
			this.LeftButt.visible = true;
			this.RightButt.input.enable = true;
			this.LeftButt.input.enable = true;
		}
	}

} 
class MainMenu extends baseclass {

	constructor(){
		super({key:'mainMenu'});
	}

	preload(){
		this.load.image('Background',"assets/Backgrounds/MenuBackground-placeholder.jpg");
		this.load.image('TutorialButtonImage',"assets/Buttons/TutorialButt-placeholder.png");
		this.load.image('SinglePlayerButtonImage',"assets/Buttons/SingleplayerButton-placeholder.png");
		this.load.image('MultiplayerButtonImage',"assets/Buttons/OnlineButt-placeholder.png");
		this.load.image('SettingsIcon',"assets/Buttons/SettingsIcon-placeholder.png");
		this.load.image('TitleCardImage',"assets/Images/Title-placeholder.png");
	}

	create(){
		this.input.mouse.disableContextMenu();
		this.MenuBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'Background');
		this.SingleButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()+150,'SinglePlayerButtonImage').setInteractive();
		this.OnlineButt = this.add.image(this.GetWidthOrigin()-250,this.GetHeightOrigin()+150,'MultiplayerButtonImage').setInteractive();
		this.SettingButt = this.add.image(this.GetWidthOrigin()+330,this.GetHeightOrigin()-230,'SettingsIcon').setInteractive();
		this.TutorialButt = this.add.image(this.GetWidthOrigin()+250,this.GetHeightOrigin()+150,'TutorialButtonImage').setInteractive();
		this.TitleCard = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()-50,'TitleCardImage').setInteractive();

		this.SingleButt.on('pointerdown',function(){this.StartSinglePlayer();},this);
		this.OnlineButt.on('pointerdown',function(){this.StartOnlinePlayer()},this);
		this.SettingButt.on('pointerdown',function(){this.StartSettings()},this);
		this.TutorialButt.on('pointerdown',function(){this.StartTutorial();},this);

	}

	update(){
		
	}


	StartSinglePlayer(){
		console.log("Starting Singleplayer...");
		this.scene.start('SologameLobby');
	}

	StartOnlinePlayer(){
		console.log("Starting Multiplayer...");
		this.scene.start('OnlineGameLobby');
	}

	StartSettings(){
		console.log("Starting Settings...");
		this.scene.start('SettingsPage');
	}

	StartTutorial(){
		console.log("Starting Tutorial...");
		this.scene.start('tutorialPages');
	}

}




class Settings extends baseclass {

	constructor(){
		super({key:'SettingsPage'});
	}

	preload(){

	}

	create(){
		this.input.mouse.disableContextMenu();
	}

	update(){
		
	}
} 

class ErrorPage extends baseclass {

	constructor(){
		super({key:'ErrorPage'});
	}

	preload(){

	}

	create(){
		this.input.mouse.disableContextMenu();
	}

	update(){
		
	}
} 

window.addEventListener('load',function(){
	var config = {
		"title" : "Multiplayer Game",
		"width" : 800,
		"height" : 600,
		"type" : Phaser.AUTO,
		"backgroundColor" : "#ffdd00",
		"parent" : GameZone,
		physics:{
			default:'arcade',
			arcade:{
				debug: true,
				gravity: {
					y: 250
				}
			}
		},
		scale: {
        mode: Phaser.Scale.FIT,
        autoCenter : Phaser.Scale.CENTER_BOTH
    }
	};
	window.document.title = config.title;
	game = new GameSys(config);
});


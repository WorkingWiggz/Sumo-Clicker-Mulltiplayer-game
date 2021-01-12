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
		this.scene.start('ErrorPage');
	}

	setCookie(CookieName,CookVal,ExpireDays){
		var date = new Date();
		date.setTime(date.getTime()+(ExpireDays*24*60*60*1000));
		var expires = "expires="+ date.toUTCString();
		document.cookie = CookieName + "=" + CookVal +";" + ExpireDays +";"; 
	}

	GetCookie(SearchVal){
		var decodedCookie = decodeURIComponent(document.cookie);
		var name = SearchVal+"=";
		var hold = decodedCookie.split(';');
		for(var i =0;i<hold.length;i++){
			var tmp = hold[i];
			while(tmp.charAt(0) == ' '){
				tmp = tmp.substring(1);
			}
			if(tmp.indexOf(name) == 0){
				return tmp.substring(name.length,tmp.length);
			}
		}
		return "";
	}

	// Code learnt from:
	// https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
	DeleteCookies(){
		var cook = document.cookie.split(";");
		for (var i = 0; i < cook.length; i++) {
		    var c = cook[i];
		    var eqPos = c.indexOf("=");
		    var name = eqPos > -1 ? c.substr(0, eqPos) : c;
		    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	}
}


class Tutorial extends baseclass {

	constructor(){
		super({key:'tutorialPages'});
	}


	preload(){
		this.load.image('TutorialBack',"assets/Backgrounds/TutorialBackground.jpg");
		this.load.image('RightButt',"assets/Buttons/RightButt.png");
		this.load.image('LeftButt',"assets/Buttons/LeftButt.png");
		this.load.image('BackButt',"assets/Buttons/BackMenu.png");
		this.load.image('MenuPlate',"assets/Images/MenuPlate.png");

		this.TitleTexts = ["Welcome",
							"Controls",

							"Single Player - Game Lobby",
							"Single Player - Duels",
							"Single Player - Arena Battles",
							"Single Player - Difficulty",
							
							"Difficulty - Easy (Push Over)",
							"Difficulty - Medium (Pusher)",
							"Difficulty - Hard (Powerful Pusher)",
							"Difficulty - Extreme (Pure Powerful Pusher)",
							
							"Online - Game Lobby",
							"Online - Difficulty",
							"Online - Duels",
							"Online - Arena Battles"
							];

		this.DescTexts = ["Welcome to Sumo Clicker, a game focused on overpowering your enemies, winning the tournament, and becoming the greatest power pusher of them all.\n\n\nHere we will be teaching you the basics of the game for both single player and the online multiplayer aspects of the game.",
			"Mobile:\nTap one side to increase your speed, Another to Slowdown but make yourself harder to push.\n\n\nPC:\nLeft Click to increase your speed, Right Click to slowdown but make yourself harder to push.\n\n\nIncreasing speed costs stamina, if your stamina reaches zero it will cost health instead, but health DOES NOT REGENERATE. If your health reaches zero you will lose the match.",

			 "The Game starts by making you choose both the character you want to play as, the difficulty you want fight on and the game mode you want to play. \n\n\n The Two Game Mode Options are:\no\tDuels\no\tArena Battles",
			 "Duels take place with you trying to push your opponent off the arena before they can push you off to win. Winning gets you money to level up your character and losing gets you nothing but dishonour.",
			 "In this mode all players fight on a flat arena and every 2 minutes the players in the arena will need to be halved, surviving gets you a split of a bonus amongst the players on the arena remaining.\n This goes on until one remains and they get a money bonus all for themselves.\n\n\nIn this mode, you do not have health but get pushed twice as hard if you are out of stamina. Losing in this mode does not have any consequences but you can win lots for your character.",
			 "In this game there are varying difficulties with increased rewards for the more advanced difficulties. Each difficulty has each own bonuses and changes to how the game works which we will be covering further.",
			 "In this mode, the game has bonuses that it makes pushing incredibly easier such as:\n\no\tBiggest Arena\no\tDouble Health \no\tDouble Stamina Regen\no\tIncreased speed",
			 "In this mode, the game has bonuses to enhance your pushing prowess such as:\n\no\tStandard Arena\no\tStandard Health\no\tBonus Stamina Regen\no\tStandard Speed",
			 "In this mode, the game is harder now taking away bonuses and shrinking to its smallest size arena:\n\no\tSmaller Arena\no\tHealth Halved\no\tHalved Stamina Regen\no\tStandard Speed",
			 "In this mode, the game is extremely difficult, no bonuses, a tiny arena and no stamina regen, fights are short and sweet:\n\n\no\tSmallest Arena\no\tNormal Health\no\tNO STAMINA REGEN\no\tTriple Speed gain",

			 "In the online mode, the game is different as instead of picking a character you have your own that will be focusing on upgrading their own stats with the money you earn from online matches.",
			 "Difficulty here has the same rules as the single player but with different bonuses for winnings:\t\n\n    Easy:\n\t\to\tWinnings halved 	\t\to\tNo Win Streak\n    Medium:\n\t\to\tWinnings * 1 	     \t\to\tWin Streak adds 0.1 to multiplier (max 3)\n    Hard:\n\t\to\tWinnings * 1 	o\tWin Streak adds 0.3 to multiplier (max 10)\n     Extreme:\n\t\to\tWinnings * 2    \to\tWin Streak adds 0.45 to multiplier (No Max)",
			  "Duels in online work much like previously but with an added factor of risk. If your players health reaches 0 you will not only lose but reset your characters stats and current money. Be sure not to overdo it!",
			  "Arena battles work the same as before but with a rolling prize instead. Every 30 seconds the money is split by everyone in the arena the prize is reduced by how many players are still in the arena. Now you will have to choose risk pushing off players for the bigger prize or focus on surviving for the guaranteed money."
			];
	}

	create(){
		this.input.mouse.disableContextMenu();
		var TitleStyle = ﻿{ 
            fontSize: 35,
            fontFamily: 'Arial',
            fill: '#ffffff',
            align: "left",
            wordWrap: { width: 700, useAdvancedWrap: true }};
        var DescStyle = ﻿{ 
            fontSize: 24,
            fontFamily: 'Arial',
            fill: '#ffffff',
            align: "left",
            wordWrap: { width: 700, useAdvancedWrap: true }}

		this.TutPageCount =0;
		this.TutBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'TutorialBack');
		this.TutPlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()-75,'MenuPlate').setScale(1.55,1);
		this.titleText = this.add.text(this.GetWidthOrigin()-365,this.GetHeightOrigin()-250,'TestTitle',TitleStyle);
		this.DescText = this.add.text(this.GetWidthOrigin()-365,this.GetHeightOrigin()-200,'TestDesc',DescStyle);
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
		this.load.image('Background',"assets/Backgrounds/MenuBackground.jpg");
		this.load.image('TutorialButtonImage',"assets/Buttons/TutorialButt-placeholder.png");
		this.load.image('SinglePlayerButtonImage',"assets/Buttons/SingleplayerButton-placeholder.png");
		this.load.image('MultiplayerButtonImage',"assets/Buttons/OnlineButt-placeholder.png");
		this.load.image('SettingsIcon',"assets/Buttons/SettingsIcon-placeholder.png");
		this.load.image('TitleCardImage',"assets/Images/Title-placeholder.png");
	}

	create(){
		this.CheckForKey();
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

	CheckForKey(){
		var check = this.GetCookie("UniqueKey");
		if(check==""){
			this.GenerateKey();
		}
	}

	GenerateKey(){
		var hold = '';
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for(var i =0;i<32;i++){
			hold += chars.charAt(Math.floor(Math.random()*chars.length));
		}
		this.setCookie("UniqueKey",hold,100);
	}
}




class Settings extends baseclass {

	constructor(){
		super({key:'SettingsPage'});
	}

	preload(){
		this.load.image('SettingsBack',"assets/Backgrounds/SettingsBackground.png");
		this.load.image('ResetButt',"assets/Buttons/ResetButt.png");
		this.load.image('SettingsPlate',"assets/Images/SettingsPlate.png");
		this.load.image('QuitToMenu',"assets/Buttons/QuitToMenuButt.png");
	}

	create(){
		this.input.mouse.disableContextMenu();
		this.SettingsBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'SettingsBack').setScale(1,2);
		this.SettingsPlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'SettingsPlate');
		this.ResetButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'ResetButt').setInteractive();
		this.QuitToMenu = this.add.image(this.GetWidthOrigin()-150,this.GetHeightOrigin()+120,'QuitToMenu').setInteractive();

		this.ResetButt.on('pointerdown',function(){this.ResetCheck();},this);
		this.QuitToMenu.on('pointerdown',function(){this.BackToMenu();},this);
	}

	update(){
		
	}

	ResetCheck(){
		if(confirm("Are you sure you want to erase all data? THIS CANNOT BE UNDONE.")){
			console.log("Deleting Data...");
			this.DeleteCookies();
		}
	}

	BackToMenu(){
		this.scene.start('mainMenu');
	}

} 

class ErrorPage extends baseclass {

	constructor(){
		super({key:'ErrorPage'});
	}

	preload(){
		this.load.image('BackToMenuButt',"assets/Buttons/BackToMenuButt.png");
		this.load.image('ErrorPlate',"assets/Images/ErrorPlate.png");
		this.load.image('ErrorBackground',"assets/Backgrounds/ErrorBackground.png");
	}

	create(){
		var TextStyle = {};
		this.input.mouse.disableContextMenu();
		this.ErrorBack = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'ErrorBackground');
		this.ErroPlate = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin(),'ErrorPlate');
		this.BackToMenuButt = this.add.image(this.GetWidthOrigin(),this.GetHeightOrigin()+100,'BackToMenuButt').setInteractive();
		this.CrashText = this.add.text(this.GetWidthOrigin()-150,this.GetHeightOrigin()-50,'           Apologies\nThe game has been pushed too hard \nPlease go back to the menu.',TextStyle);

		this.BackToMenuButt.on('pointerdown',function(){this.BackToMenu();},this);
	}

	update(){
		
	}

	BackToMenu(){
		this.scene.start('mainMenu');
	}
} 

window.addEventListener('load',function(){
	var config = {
		"title" : "Sumo Clicker",
		"width" : 800,
		"height" : 600,
		"type" : Phaser.AUTO,
		"backgroundColor" : "#ffdd00",
		"parent" : GameZone,
		physics:{
			default:'arcade',
			arcade:{
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


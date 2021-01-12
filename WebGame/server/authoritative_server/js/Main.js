var Classself;
const players = {};
var OnlineCount = 0;


class GameSys extends Phaser.Game {
	
	constructor(Config){
		super(Config);
		this.scene.add("Lobby",Lobby,true);
	}
}

class Lobby extends Phaser.Scene {

	constructor(){
		super({key:'Lobby'});
	}

	init(data){

	}


	create(){
		
Classself = this;
this.Lobbies = {
Easy: [],
Medium: [],
Hard: [],
Extreme: []
};

io.on('connection',function(socket){
	try{
		if(players[socket.id]==null){
			OnlineCount++;
			console.log("A User Connected.");
			players[socket.id] = {
				PlayerId: socket.Id,
				socket:socket,
				PlayerName: null,
				PlayChar:null,
				PlayStats: {
					Stam:null , Speed:null, VelGain:null, Health:null , Regen:null
				},
				input: {
					LeftClick:false,
					RightClick:false
				},
				Lobby: null
			};
			socket.on('PlayerReady',function(){
				console.log(socket.id +" Is Ready to fight.");
				io.sockets.connected[players[socket.id].Lobby.Host].emit('OpponentReady');
			});

			socket.on('Move',function(amHost,LobbyData){
				if(amHost){
					console.log("Host Moves");
					io.sockets.connected[LobbyData.Host].emit('HostMove');
					io.sockets.connected[LobbyData.Opp].emit('HostMove');
				} else {
					console.log("Opponent Moves");	
					io.sockets.connected[LobbyData.Host].emit('OpponentMove');
					io.sockets.connected[LobbyData.Opp].emit('OpponentMove');
				}
			});

			socket.on('Block',function(amHost,LobbyData){
				if(amHost){
					console.log("Host Blocks");
					io.sockets.connected[LobbyData.Host].emit('HostBlock');
					io.sockets.connected[LobbyData.Opp].emit('HostBlock');
				} else {
					console.log("Opponent Blocks");
					io.sockets.connected[LobbyData.Opp].emit('OpponentBlock');
					io.sockets.connected[LobbyData.Host].emit('OpponentBlock');
				}
			});

			socket.on('UnBlock',function(amHost,LobbyData){
				if(amHost){
					console.log("Host UnBlocks");
					io.sockets.connected[LobbyData.Host].emit('HostUnBlock');
					io.sockets.connected[LobbyData.Opp].emit('HostUnBlock');
				} else {
					console.log("Opponent UnBlocks");
					io.sockets.connected[LobbyData.Opp].emit('OpponentUnBlock');
					io.sockets.connected[LobbyData.Host].emit('OpponentUnBlock');
				}
			});

			socket.on('MatchOverDeath',function(Winner,LobbyData){
				console.log("A Match is over and someone died...");
				if(Winner == "Left"){
					io.sockets.connected[LobbyData.Host].emit('GameWin');
					io.sockets.connected[LobbyData.Opp].emit('GameDeath');
				} else if(Winner == "Right"){
					io.sockets.connected[LobbyData.Opp].emit('GameWin');
					io.sockets.connected[LobbyData.Host].emit('GameDeath');
				}
				Classself.removeLobby(LobbyData);
			});

			socket.on('MatchOver',function(Winner,LobbyData){
				console.log("A Match is over.");
				if(Winner == "Left"){
					io.sockets.connected[LobbyData.Host].emit('GameWin');
					io.sockets.connected[LobbyData.Opp].emit('GameLoss');
				} else if(Winner == "Right"){
					io.sockets.connected[LobbyData.Opp].emit('GameWin');
					io.sockets.connected[LobbyData.Host].emit('GameLoss');
				}
				Classself.removeLobby(LobbyData);
			});

			socket.on('StartMatch',function(GameData){
				console.log("Starting match between: "+players[GameData.Lobby.Host].PlayChar.name+ " & "+players[GameData.Lobby.Opp].PlayChar.name);
				
				GameData.HostStats.push(players[GameData.Lobby.Host].PlayStats.Stam);
				GameData.HostStats.push(players[GameData.Lobby.Host].PlayStats.Speed);
				GameData.HostStats.push(players[GameData.Lobby.Host].PlayStats.VelGain);
				GameData.HostStats.push(players[GameData.Lobby.Host].PlayStats.Health);
				GameData.HostStats.push(players[GameData.Lobby.Host].PlayStats.Regen);

				GameData.OppStats.push(players[GameData.Lobby.Opp].PlayStats.Stam);
				GameData.OppStats.push(players[GameData.Lobby.Opp].PlayStats.Speed);
				GameData.OppStats.push(players[GameData.Lobby.Opp].PlayStats.VelGain);
				GameData.OppStats.push(players[GameData.Lobby.Opp].PlayStats.Health);
				GameData.OppStats.push(players[GameData.Lobby.Opp].PlayStats.Regen);
				io.sockets.connected[GameData.Lobby.Host].emit('StartingMatch',GameData);
				io.sockets.connected[GameData.Lobby.Opp].emit('StartingMatch',GameData);
			})
			socket.on('error',function(LobbyData){
				io.sockets.connected[LobbyData.Opp].emit('error');
				io.sockets.connected[LobbyData.Opp].emit('error');
			});

			socket.on('UpdateChar',function(PlayerData,Stam,Vel,Speed,Regen,Health,PlayerName){
				players[socket.id].PlayChar = PlayerData;
				players[socket.id].PlayStats.Stam = Stam;
				players[socket.id].PlayStats.Speed = Speed;
				players[socket.id].PlayStats.VelGain = Vel;
				players[socket.id].PlayStats.Health = Health;
				players[socket.id].PlayStats.Regen = Regen;
				players[socket.id].PlayerName = PlayerName;
			});

			socket.on('SearchingForGame',function(Diff){
				console.log("Finding Game for player");
				var test = Classself.SearchingForGame(Diff);
				if(test !=null){
					console.log("Lobby Found");
					socket.emit('LobbyFound');
					if(io.sockets.connected[test.Host] != null){
						io.sockets.connected[test.Host].emit('PlayerFound');
						test.Opp = socket.id;
						players[test.Opp].Lobby = test;
						players[test.Host].Lobby = test;
						socket.emit('LobbyJoined',test,players[test.Host].PlayChar);
						io.sockets.connected[test.Host].emit('PlayerJoined',test,players[test.Opp].PlayChar);
					} else {
						console.log("Game Not Found. Pinging player.");
					socket.emit('GameNotFound');
					}
				} else {
					console.log("Game Not Found. Pinging player.");
					socket.emit('GameNotFound');
				}

			});
			socket.on('HostingGame',function(LobbyDiff){
				console.log("Creating Lobby of "+ LobbyDiff +" Difficulty.");
				var Lobby = Classself.CreateLobby(LobbyDiff,socket.id);
				players[socket.id].Lobby = Lobby;
				socket.emit('LobbyCreated',Lobby);
			});
			socket.on('disconnect',function(){
				OnlineCount--;
				Classself.removeAllLobby(socket.id);
				delete players[socket.id];
				console.log('A User Disconnected.');
			});

			socket.on('LeaveLobby',function(Lobby,diff){
				console.log(players[socket.id].PlayerName+" has left lobby.");
				if(Lobby.Host == socket.id){
					if(Lobby.Opp !=null){
						io.sockets.connected[Lobby.Opp].emit('HostLeft');
					}
					Classself.removeLobby(Lobby);
				} else {
					for(var i =0;i<Classself.Lobbies[diff].length;i++){
						var tmplobby = Classself.Lobbies[diff][i];
						if(tmplobby != null){
							if(tmplobby.Opp == socket.id){
								Classself.Lobbies[diff][i].Opp = null;
							}
						}
					}
					Lobby.Opp = null;
					io.sockets.connected[Lobby.Host].emit('PlayerLeft',Lobby);
				}
			});
		}
	} catch (exception){
		console.log(exception);
	}
	});
}	


	update(){
		io.emit('UpdateCount',OnlineCount);
	}

	// Check if null after function returns.
	SearchForLobby(id){
		var lobby = null;
		for(var key in this.Lobbies){
			for(var i=0;i<this.Lobbies[key].length;i++){
				if(this.Lobbies[key][i].Opp == id ||this.Lobbies[key][i].Host == id) {
					lobby = this.Lobbies[key][i];
				}
			}
		}
		return lobby
	}

	CreateLobby(Diff,PlayerId){
		var group = {Host: PlayerId,Opp:null};
		switch(Diff){
			case"Easy":
				this.Lobbies.Easy.push(group);
				console.log("Created Easy Lobby.",group);
			break;
			case"Medium":
				this.Lobbies.Medium.push(group);
				console.log("Created Medium Lobby.",group);
			break;
			case"Hard":
				this.Lobbies.Hard.push(group);
				console.log("Created Hard Lobby.",group);
			break;
			case"Extreme":
				this.Lobbies.Extreme.push(group);
				console.log("Created Extreme Lobby.",group);
			break;
		}
		return group;
	}

	SearchingForGame(Diff){
		var GameFound = null;
		switch(Diff){
			case"Easy":
			GameFound=	this.SearchEasy();
			break;
			case"Medium":
			GameFound=	this.SearchMedium();
			break;
			case"Hard":
			GameFound=	this.SearchHard();
			break;
			case"Extreme":
			GameFound=	this.SearchExtreme();
			break;
		}
		if(GameFound != null){
			return GameFound;
		} 
		return null;
	}



	SearchExtreme(){
		for(var i =0; i<this.Lobbies.Extreme.length;i++){
			var tmp = this.Lobbies.Extreme[i];
			if(tmp != null){
				if(tmp.Opp == null && tmp.Host != null){
					return tmp;
				}
			}
		}
	}

	SearchHard(){
		for(var i =0; i<this.Lobbies.Hard.length;i++){
			var tmp = this.Lobbies.Hard[i];
			if(tmp != null){
				if(tmp.Opp == null && tmp.Host != null){
					return tmp;
				}
			}
		}
	}

	SearchMedium(){
		for(var i =0; i<this.Lobbies.Medium.length;i++){
			var tmp = this.Lobbies.Medium[i];
			if(tmp != null){
				if(tmp.Opp == null && tmp.Host != null){
					return tmp;
				}
			}
		}
	}

	SearchEasy(){
		for(var i =0; i<this.Lobbies.Easy.length;i++){
			var tmp = this.Lobbies.Easy[i];
			if(tmp != null){
				if(tmp.Opp == null && tmp.Host != null){
					return tmp;
				}
			}
		}
	}


	removeAllLobby(id){
		console.log("removing lobbies assocaited with: " + id);
		for(var LobbyKey in this.Lobbies){
			for(var j =0;j<this.Lobbies[LobbyKey].length;j++){
				var test = this.Lobbies[LobbyKey][j];
				if(test !=null){
					if(test.Host != null){
						if(test.Host == id){
							if(test.Opp != null){
								if(io.sockets.connected[test.Opp] != null){
									io.sockets.connected[test.Opp].emit('HostLeft');
									delete this.Lobbies[LobbyKey][j];
								}
							}
						}
					} else
						if(test.Opp!=null){
							if(test.Opp == id) {
								if(test.Host != null){
									io.sockets.connected[test.Host].emit('PlayerLeft');	
								}
							}
						}
					}
				}

				
		}
	}

	removeLobby(LobbyData){
		console.log("removing lobby from server");
		for(var LobbyKey in this.Lobbies){
			for(var j =0;j<this.Lobbies[LobbyKey].length;j++){
				var test = this.Lobbies[LobbyKey][j];
				delete this.Lobbies[LobbyKey][j];
			}
		}
	}

}			

		


	var config = {
		"title" : "Sumo Clicker",
		"width" : 800,
		"height" : 600,
		"type" : Phaser.HEADLESS,
		"autoFocus": false,
		"backgroundColor" : "#ffdd00",
		"parent" : GameZone,
		physics:{
			default:'arcade',
				gravity: {
					y: 250
				}
		}
	};

	window.document.title = config.title;
	var game = new GameSys(config);	
	window.gameLoaded();




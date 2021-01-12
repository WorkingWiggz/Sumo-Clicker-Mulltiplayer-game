class BaseCharacter extends Phaser.Physics.Arcade.Sprite{

	constructor(scene, x, y, Texture,MaxStamina,MaxHealth,MaxSpeed,VelGain,StaminaRegen){
		super(scene,x,y,Texture);
		this.setTexture(Texture);
		this.setPosition(x,y);
		this.MaxStamina = MaxStamina;
		this.MaxSpeed = MaxSpeed;
		this.VelGain = VelGain;
		this.Speed = 0;
		this.Health = MaxHealth;
		this.MaxHealth = MaxHealth;
		this.Stamina = MaxStamina;
		this.MaxStamina = MaxStamina;
		this.StaminaRegen = StaminaRegen;
		this.Charging = false;
		this.AIisRunning = false;
		if(this.scene.emitter !=null){
			this.scene.emitter.on('GameUpdate',function(){this.loop()},this);
		}
		
		if(this.scene.Difficulty != null){
			switch(this.scene.Difficulty){
				case "Easy":
					this.AITickSpeed = 180;
				break;
				case "Medium":
					this.AITickSpeed = 170;
				break;
				case "Hard":
					this.AITickSpeed = 260;
				break;
				case "Extreme":
					this.AITickSpeed = 150;
				break;
			}
		}

		this.BlockCool = false;
		this.RegenTimer = this.scene.time.addEvent({ delay: 3550, callback: function(){this.RegenerateStam()}, callbackScope: this, loop: true });
	}


	RefreshChar(){
		this.Stamina = this.MaxStamina;
		this.Health = this.MaxHealth;
	}

	GetType(){
		return this.Type;
	}

	SetType(T){
		this.Type = T;
	}


	GetVelGain(){
		return this.VelGain;
	}

	SetVelGain(VL){
		this.VelGain = VL;
	}

	GetMaxStamina(){
		return this.MaxStamina;
	}


	SetMaxStamina(MS){
		this.MaxStamina = MS;
	}
	
	SetStamina(Stamina){
		this.Stamina = Stamina;
	}

	GetStamina(Stamina){
		return this.Stamina;
	}


	GetMaxHealth(){
		return this.MaxHealth;
	}

	SetMaxHealth(MH){
		this.MaxHealth = MH;
	}

	SetStaminaRegen(SR){
		this.StaminaRegen = SR;
	}

	GetStaminaRegen(){
		return this.StaminaRegen;
	}


	SetMaxSpeed(MaxSpeed){
		this.MaxSpeed = MaxSpeed;
	}

	GetMaxSpeed(){
		return this.MaxSpeed;
	}

	SetHealth(Health){
		this.Health = Health;
	}

	GetHealth(){
		return this.MaxHealth;
	}

	SetAITickSpeed(AITS){
		this.AITickSpeed = AITS;
	}

	GetAITickSpeed(){
		return this.AITickSpeed;
	}

	loop(){

		if(this.Blocking){
			if(this.Stamina >0){
				this.Stamina = this.Stamina-1.5;
			} else {
				
				this.Health = this.Health-1;
			}
			
		}

		if(this.body != null){
			this.speed = this.body.velocity.x;
		}
		
		if(this.Stamina >this.MaxStamina){this.Stamina = this.MaxStamina;}
		if(this.Stamina <0){this.Stamina = 0;}

		if(this.AI && !(this.AIisRunning)){
			this.AITick =  this.scene.time.addEvent({ delay: this.AITickSpeed, callback: function(){this.RunAI();}, callbackScope: this, loop: true });
			this.AIisRunning=true;
			this.PickGambit();
		}
	}


	SetRegen(Regen){
		this.StaminaRegen = Regen;
	}

	GetRegen(){
		return this.StaminaRegen;
	}

	IncreaseVel(){
		if(this.Speed < this.MaxSpeed){
			this.setVelocityX(this.body.velocity.x + this.VelGain);
		}
	}

	DecreaseVel(){
		if(this.Speed> -this.MaxSpeed){
			this.setVelocityX(this.body.velocity.x - this.VelGain);
		}
	}

	Move(){
		if(this.Stamina - 10 < 0){
			this.Health = this.Health -10;
		} else if(this.Stamina-10<=0){
			this.Stamina = this.Stamina - 10;
			this.Health = this.Health -10;
		} else {
			this.Stamina = this.Stamina - 10;
		}
		if(this.Type== "Left"){
			this.IncreaseVel();
		} else if(this.Type == "Right"){
			this.DecreaseVel();
		}

	}

	Block(){
		this.body.setImmovable(true);
		this.body.allowGravity = false;
		this.body.setVelocityX(0);
		this.Blocking = true;
	}

	MoveLeft(){
		this.body.velocity.x =- this.MaxSpeed;
	}

	Unblock(){
		this.body.setImmovable(false);
		this.body.allowGravity = true;
		this.Blocking = false;
	}

	GetAI(){
		return this.AI;
	}

	SetAI(bool){
		this.AI = bool; 
	}

	RunAI(){	
		
		if(this.Stamina>10||this.Health>this.MaxHealth/2){
			this.RecklessPlay();
		} else	{
			if(this.Health<this.MaxHealth/2){
				this.CarefulPlay();
			} else if(this.Health<this.MaxHealth/8) {
				if(this.FinalGambit== "Kamikaze"){
					this.Kamikaze();
				} else if(this.FinalGambit == "GiveUp"){
					this.GiveUp();
				}	else if(this.FinalGambit == "FinalStand"){
					this.FinalStand();
				}	else if(this.FinalGambit == "FinalCharge"){
					this.FinalCharge();
				}
			}
		}

	}

	Wait(){
		console.log(this.Name + " Is Waiting.")
	}

	PickGambit(){
		var Select = Math.round(Math.random() * (5 - 1) + 1);
		switch(Select){
			case 1:
				this.FinalGambit = "Kamikaze";
			break;
			case 2:
				this.FinalGambit = "GiveUp";
			break;
			case 3:
				this.FinalGambit = "FinalStand";				
			break;
			case 4:
				this.FinalGambit = "FinalCharge";
			break;
		}
	}


	RecklessPlay(){
		var Random = Math.round(Math.random() * (11 - 1) + 1);
		if(Random>8){
			this.Wait();
		} else {
			this.Move();
		}
		
	}
	

	CarefulPlay(){
		if(this.Type == "Left"){
			if(this.Speed > this.MaxSpeed/2){
				this.Wait();
			} else if(this.Speed<0){
				if(this.Speed<-(this.MaxSpeed/2)){
					this.Block();
				} else {
					this.Move();
				}
			} else{
				this.Move();
			}
		} else if(this.Type == "Right") {
			if(this.Speed < this.MaxSpeed/2){
				this.Wait();
			} else if(this.Speed>0){
				if(this.Speed>(this.MaxSpeed/2)){
					this.Block();
				} else {
					this.Move();
				}
			} else{
				this.Move();
			}
		}
	}

	Kamikaze(){
		this.Move();
		this.Move();
		this.Move();
	}

	GiveUp(){
		console.log(this.Name +" Is Giving up.")
	}

	FinalCharge(){
		if(!(this.Charging) && this.Stamina <this.MaxStamina){
			this.Wait()
		} else {
			this.Charging = true;
		}
		if(this.Charging){
			this.Move();
		}
	}

	FinalStand(){
		this.Block();
	}



	collideHandle(Opp){
		Opp.body.setVelocityX();
	}

	RegenerateStam(){
		if(this.Stamina<this.MaxStamina){this.Stamina = this.Stamina + this.StaminaRegen;}
	}

	SetName(Name){
		this.Name = Name;
	}

	GetName(){
		return this.Name;
	}


}

class DebugChar extends BaseCharacter{
	constructor(scene, x, y, Texture, MaxStamina,MaxHealth,MaxSpeed,VelGain,StaminaRegen){
		super(scene,x,y,Texture, MaxStamina,MaxHealth,MaxSpeed,VelGain,StaminaRegen);
	}


}

class OnlineChar extends BaseCharacter{
	constructor(scene, x, y, Texture, MaxStamina,MaxHealth,MaxSpeed,VelGain,StaminaRegen){
		super(scene,x,y,Texture, MaxStamina,MaxHealth,MaxSpeed,VelGain,StaminaRegen);
	}

}

class NamedChar extends BaseCharacter {
	constructor(scene, x, y, Texture,Name){
		super(scene,x,y,Texture,100,100,100,100,100);
		this.LoadStats(Name);
		this.Name = Name;
	}

	LoadStats(Name){

		switch(Name){
			case "Beatrix":
				this.SetMaxSpeed(173);
				this.SetMaxStamina(201);
				this.SetMaxHealth(123);
				this.SetHealth(this.GetMaxHealth());
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(22);
				this.SetStaminaRegen(83);
			break;
			case "Lukas":
				this.SetMaxSpeed(93);
				this.SetMaxStamina(186);
				this.SetMaxHealth(75);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(94);
				this.SetStaminaRegen(53);
			break;
			case "Kasey":
				this.SetMaxSpeed(88);
				this.SetMaxStamina(240);
				this.SetMaxHealth(91);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(83);
				this.SetStaminaRegen(12);
			break;
			case "Zaynab":
				this.SetMaxSpeed(156);
				this.SetMaxStamina(188);
				this.SetMaxHealth(188);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(78);
				this.SetStaminaRegen(21);
			break;
			case "Yousif":
				this.SetMaxSpeed(174);
				this.SetMaxStamina(136);
				this.SetMaxHealth(119);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(34);
				this.SetStaminaRegen(98);
			break;
			case "Janae":
				this.SetMaxSpeed(123);
				this.SetMaxStamina(110);
				this.SetMaxHealth(175);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(95);
				this.SetStaminaRegen(92);
			break;
			case "Gurdeep":
				this.SetMaxSpeed(159);
				this.SetMaxStamina(172);
				this.SetMaxHealth(131);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(99);
				this.SetStaminaRegen(74);
			break;
			case "Ayva":
				this.SetMaxSpeed(168);
				this.SetMaxStamina(111);
				this.SetMaxHealth(192);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(61);
				this.SetStaminaRegen(94);
			break;
			case "Ubaid":
				this.SetMaxSpeed(214);
				this.SetMaxStamina(160);
				this.SetMaxHealth(109);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(31);
				this.SetStaminaRegen(32);
			break;
			case "Georga":
				this.SetMaxSpeed(140);
				this.SetMaxStamina(52);
				this.SetMaxHealth(168);
				this.SetStamina(this.GetMaxStamina());
				this.SetVelGain(11);
				this.SetStaminaRegen(5);
			break;
		}

	}
}


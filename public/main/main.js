// reference
// JS timer - http://www.w3schools.com/js/js_timing.asp
// JS clicker - http://examples.phaser.io/_site/view_full.html?d=text&f=update+text.js&t=update%20text

var game_height = 600;
var game_width = 800;

//var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');
var game = new Phaser.Game(game_width, game_height, Phaser.AUTO, 'gameDiv');
var text;
var player_health;
var player_health_text;
var player_gold;
var player_gold_text;
var enemy_health;
var enemy_health_text;
var click_text; //POW
var current_level;
var player_level;

var space_bar;
var is_titlescreen;

var mainState = {

    preload: function() {
		this.game.stage.backgroundColor = '#71c5cf';
		this.game.load.image('Guy', 'assets/Guy-small.png');
		this.game.load.image('Other', 'assets/Other-small.png');
		this.game.load.image('TitleScreen', 'assets/titlescreen.png');
		this.game.load.spritesheet('FlashingStart', 'assets/start.png', 350, 50, 4);
		//this.game.load.image('Background', 'assets/background.png'); // does not exist...
		this.game.load.image('Background', 'assets/floor1/world1.png');
		this.game.load.image('healthBar', 'assets/healthbar.png');
    },

    create: function() {
		//title screen
		this.is_titlescreen = true;
		this.titlescreen = this.game.add.sprite(0, 0, 'TitleScreen', {align: "center"});
		this.flashingstart = this.game.add.sprite(350, 50, 'FlashingStart', {align: "center"});
		this.flashingstart.anchor.setTo(0.5, 0.5);
		this.flashingstart.x = game_width/2;
		this.flashingstart.y = game_height-40;
		this.flashingstart.animations.add('flash');
		this.flashingstart.animations.play('flash', 6, true);
		
		this.space_bar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
	
	start_game: function() {
		this.player_level = 1;
		this.current_level = 1;
		this.player_health = this.current_level*15;
		this.enemy_health = this.current_level*10;
		this.player_gold = 0;
		
		this.background1 = this.game.add.sprite(0, 0, 'Background');
    	this.background2 = this.game.add.sprite(1929, 0, 'Background');
		
		this.hero = this.game.add.sprite(100, 0, 'Guy');
		this.hero.y = 550 - this.hero.height;
		this.enemy = this.game.add.sprite(600, 0, 'Other');
		this.enemy.y = 550 - this.enemy.height;
		
		this.player_gold_text = game.add.text(game.world.centerX, game.world.centerY, "Gold:" + this.player_gold, {
			font: "30px Arial",
			fill: "#000000",
			align: "center"
		});

		this.player_gold_text.anchor.setTo(0.5, 0.5);
		this.player_gold_text.x = 50;
		this.player_gold_text.y = 20;

		this.player_health_text = game.add.text(game.world.centerX, game.world.centerY, "Player Health:" + this.player_health, {
			font: "30px Arial",
			fill: "#000000",
			align: "center"
		});

		this.player_health_text.anchor.setTo(0.5, 0.5);
		this.player_health_text.x = 200;
		this.player_health_text.y = 300;
		
		this.enemy_health_text = game.add.text(game.world.centerX, game.world.centerY, "Enemy Health:" + this.enemy_health, {
			font: "30px Arial",
			fill: "#000000",
			align: "center"
		});

		this.enemy_health_text.anchor.setTo(0.5, 0.5);
		this.enemy_health_text.anchor.setTo(0.5, 0.5);
		this.enemy_health_text.x = 600;
		this.enemy_health_text.y = 300;
		
		this.click_text = game.add.text(game.world.centerX, game.world.centerY, "", {
			font: "65px Arial",
			fill: "#ff0000",
			align: "center"
		});

		this.click_text.anchor.setTo(0.5, 0.5);
		
		this.game.time.events.loop(Phaser.Timer.SECOND, this.myTimer, this);
	},
	
	defeat_enemy: function() {
		this.current_level++;
        this.enemy_health = this.current_level*10;
    },
	
    update: function() {
		//console.log(this.is_titlescreen);
		if(this.is_titlescreen == false) {
			console.log("In Game");
			this.game.input.onDown.addOnce(this.updateClickText, this);
			//moveBackground(this.background1);
			//moveBackground(this.background2);
		}
		if(this.space_bar.isDown && this.is_titlescreen == true) {
			this.is_titlescreen = false;
			//console.log("Starting game");
			this.titlescreen.kill();
			this.flashingstart.kill();
			this.start_game();
		}
    },
	
	myTimer: function() {
		this.attackEnemy();
		this.click_text.setText(""); // resets this text every second
	},
	
	updateClickText: function() {
		if(this.is_titlescreen == false){
			this.attackEnemy();
			this.click_text.setText("POW!");
		}
	},
	
	attackEnemy: function() {
		console.log("attacking enemy");
		this.enemy_health = this.enemy_health - (this.player_level * 2);
		if(this.enemy_health <= 0) {
			//enemy is dead
			this.defeat_enemy();
		}
		this.enemy_health_text.setText("Enemy Health: " + this.enemy_health);
	},

};

function moveBackground(background) {
	if (background.x < -1929) {
    	background.x = 1930;
        background.x -= 1;
    } else {
        background.x -=1;
    }
}

game.state.add('main', mainState);  
game.state.start('main'); 

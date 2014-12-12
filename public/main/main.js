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
var player_attack;
var enemy_health;
var enemy_health_text;
var current_level;
var player_level;
var inMenu;

var space_bar;
var is_titlescreen;

var mainState = {

    preload: function() {
		this.game.stage.backgroundColor = '#71c5cf';
		this.game.load.image('Guy', 'assets/Guy-small.png');
		this.game.load.image('Other', 'assets/Other-small.png');
		this.game.load.image('TitleScreen', 'assets/titlescreen.png');
		this.game.load.spritesheet('FlashingStart', 'assets/start.png', 350, 50, 4);
		this.game.load.spritesheet('deathAnimation', 'assets/deathAnimation.png', 128, 128, 40);
		this.game.load.image('scrollingBackground', 'assets/background.png'); // does not exist...
		this.game.load.image('Background', 'assets/floor1/world1.png');
		this.game.load.spritesheet('SaveButton', 'assets/save_button.png', 100, 50, 1);
		this.game.load.image('goldPiece', 'assets/gold.png');
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
		this.inMenu = true;
    },
	
	start_game: function() {
		this.player_level = 1;
		this.current_level = 1;
		this.player_attack = 1;
		this.player_health = this.current_level*15;
		this.enemy_health = this.current_level*10;
		this.player_gold = 0;
		
		this.background1 = this.game.add.sprite(0, 0, 'Background');
		this.scrollingBackground1 = this.game.add.sprite(0, 0, 'scrollingBackground');
		this.scrollingBackground2 = this.game.add.sprite(2144, 0, 'scrollingBackground');
		
		this.hero = this.game.add.sprite(100, 0, 'Guy');
		this.hero.y = 550 - this.hero.height;
		this.enemy = this.game.add.sprite(600, 0, 'Other');
		this.enemy.y = 550 - this.enemy.height;
		this.enemy.inputEnabled = true;
		
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
		
		this.save_button = this.game.add.button(690, 10, 'SaveButton', this.clickSave, this, 0, 0, 0, 0);

		this.game.time.events.loop(Phaser.Timer.SECOND, this.myTimer, this);
		this.enemy.events.onInputDown.add(this.updateClickText, this);
	},
	
	defeat_enemy: function() {
		this.current_level++;
        this.enemy_health = this.current_level*10;
        this.enemy.visible = false;
        this.enemy_health_text.visible = false;
        this.death = this.game.add.sprite(this.enemy.x, this.enemy.y, 'deathAnimation');
		var anim = this.death.animations.add('death');
		anim.onComplete.add(this.add_enemy, this);
		anim.play('death', 60, false);

		var numGold = Math.floor(Math.random() * 6) + 3;
		for(var i=0;i<numGold;i++) {
			var x = Math.floor(Math.random() * 200) + 525;
			var y = Math.floor(Math.random() * 45) + 535;
			var money = this.game.add.sprite(x, y, 'goldPiece');
			money.width = 25;
			money.height = 25;
			money.inputEnabled = true;
			money.events.onInputOver.add(this.remove_money, money, this);
  		}
  	},

	remove_money: function(money, world){
		world.player_gold += 2;
		world.player_gold_text.setText("Gold: " + world.player_gold);
		game.world.remove(money);
	},

	add_enemy: function(game) {
		this.enemy.visible = true;
		this.enemy_health_text.visible = true;
	},
	
    update: function() {
		//console.log(this.is_titlescreen);
		if(this.is_titlescreen == false) {
			//console.log("In Game");
			if(this.inMenu) {

			}
			else {
				moveBackground(this.scrollingBackground1);
				moveBackground(this.scrollingBackground2);
			}
		}
		if(this.space_bar.isDown && this.is_titlescreen == true) {
			this.is_titlescreen = false;
			this.inMenu = false;
			//console.log("Starting game");
			this.titlescreen.kill();
			this.flashingstart.kill();
			this.start_game();
		}
    },
	
	myTimer: function() {
		this.attackEnemy();
	},
	
	updateClickText: function() {
		if(this.is_titlescreen == false){
			this.attackEnemy();
			
			var text = game.add.text(game.input.mousePointer.x - 20, game.input.mousePointer.y - 20, this.player_attack, {
				font: "65px Arial",
				fill: "#ff0000",
			});	
    		this.startBounceTween(text);

		}
	},

	startBounceTween: function(text) {
    	var bounce=game.add.tween(text);

    	bounce.to({ x: [text.x + 100, text.x + 100], y: [text.y - 100, text.y - 100]}, 600);
    	bounce.interpolation(function(v, k){
            return Phaser.Math.bezierInterpolation(v, k);
        });
    	bounce.onComplete.add(function () {
        	text.destroy();
    	});
    	bounce.start();
	},
	
	attackEnemy: function() {
		//console.log("attacking enemy");
		if(this.enemy.visible == true) {
			this.enemy_health = this.enemy_health - (this.player_attack);
			if(this.enemy_health <= 0) {
				//enemy is dead
				this.defeat_enemy();
			}
			this.enemy_health_text.setText("Enemy Health: " + this.enemy_health);
		}
	},

	clickSave: function() {
		console.log("You clicked save");
	},
};

function moveBackground(background) {
	if (background.x < -2144) {
    	background.x = 2130;
        background.x -= 1;
    } else {
        background.x -=1;
    }
}

game.state.add('main', mainState);  
game.state.start('main'); 

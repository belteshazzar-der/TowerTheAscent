// reference
// JS timer - http://www.w3schools.com/js/js_timing.asp
// JS clicker - http://examples.phaser.io/_site/view_full.html?d=text&f=update+text.js&t=update%20text

var game_height = 600;
var game_width = 800;

//var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');
var game = new Phaser.Game(game_width, game_height, Phaser.AUTO, 'gameDiv');
var text;
var click_count;
var farm_count;
var enemyHealth = 100;

var mainState = {

    preload: function() {
		game.stage.backgroundColor = '#71c5cf';
		game.load.image('Guy', 'assets/Guy-small.png');
		game.load.image('Suit', 'assets/other-small.png');
		game.load.image('world1Background', 'assets/floor1/world1.png');
    },

    create: function() { 
		var myVar=setInterval(function () {myTimer()}, 1000);

		this.background1 = this.game.add.sprite(0, 0, 'world1Background');
		
		this.hero = this.game.add.sprite(100, 410, 'Guy');
		this.enemy = this.game.add.sprite(600, 380, 'Suit');
		this.enemyHealthBack = new Phaser.Rectangle(545, 560, 200, 30);
		this.enemyHealth = new Phaser.Rectangle(545, 560, 200, 30);
		game.debug.geom(this.enemyHealth,'#ffffff');
		game.debug.geom(this.enemyHealth,'#ff0000');
		
		click_count = 0;

		click_text = game.add.text(game.world.centerX, game.world.centerY, "- You have clicked -\n0 times !", {
			font: "65px Arial",
			fill: "#ff0044",
			align: "center"
		});

		click_text.anchor.setTo(0.5, 0.5);
		
		farm_count = 0;
		
		timer_text = game.add.text(game.world.centerX, game.world.centerY, "You farmed: 0", {
			font: "50px Arial",
			fill: "#ffffff",
			align: "center"
		});
		
		timer_text.anchor.setTo(0.5, 0.5);
    },
	
    update: function() {
		game.input.onDown.addOnce(updateClickText, this);
		this.enemyHealth.scale.x = enemyHealth / 100;
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

function myTimer() {
	var d = new Date();
	//console.log(d.toLocaleTimeString());
	farm_count++;
	timer_text.setText("You farmed: " + farm_count);
	// do auto-attack or farming increment here?
	enemyHealth--;
    console.log(enemyHealth);
}

function updateClickText() {
    click_count++;
    click_text.setText("- You have clicked -\n" + click_count + " times !");
}

game.state.add('main', mainState);  
game.state.start('main'); 

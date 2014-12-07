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

var mainState = {

    preload: function() {
		game.stage.backgroundColor = '#71c5cf';
		game.load.image('Guy', 'assets/Guy-small.png');
		game.load.image('Suit', 'assets/suit_armor.png');
    },

    create: function() { 
		var myVar=setInterval(function () {myTimer()}, 1000);
		
		this.guy = this.game.add.sprite(100, 245, 'Guy');
        this.guy.anchor.setTo(0.0, -0.5);
		
		this.guy = this.game.add.sprite(100, 245, 'Suit');
        this.guy.anchor.setTo(-4.5, -0.5); 

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
    },
};

function myTimer() {
	var d = new Date();
	//console.log(d.toLocaleTimeString());
	farm_count++;
	timer_text.setText("You farmed: " + farm_count);
	// do auto-attack or farming increment here?
}

function updateClickText() {
    click_count++;
    click_text.setText("- You have clicked -\n" + click_count + " times !");
}

game.state.add('main', mainState);  
game.state.start('main'); 
function initGame(game) {
	game.player_level = 1;
	game.current_level = 1;
	game.player_attack = 1;
	game.player_health = game.current_level*15;
	game.enemy_health = game.current_level*10;
	game.player_gold = 0;
	
	game.background1 = game.game.add.sprite(0, 0, 'Background');
	game.scrollingBackground1 = game.game.add.sprite(0, 0, 'scrollingBackground');
	game.scrollingBackground2 = game.game.add.sprite(2144, 0, 'scrollingBackground');
	
	game.hero = game.game.add.sprite(100, 0, 'Guy');
	game.hero.y = 550 - game.hero.height;
	game.enemy = game.game.add.sprite(600, 0, 'Other');
	game.enemy.y = 550 - game.enemy.height;
	game.enemy.inputEnabled = true;
	
	game.player_gold_text = game.add.text(game.world.centerX, game.world.centerY, "Gold:" + game.player_gold, {
		font: "30px Arial",
		fill: "#000000",
		align: "center"
	});

	game.player_gold_text.anchor.setTo(0.5, 0.5);
	game.player_gold_text.x = 50;
	game.player_gold_text.y = 20;

	game.player_health_text = game.add.text(game.world.centerX, game.world.centerY, "Player Health:" + game.player_health, {
		font: "30px Arial",
		fill: "#000000",
		align: "center"
	});

	game.player_health_text.anchor.setTo(0.5, 0.5);
	game.player_health_text.x = 200;
	game.player_health_text.y = 300;
		
	game.enemy_health_text = game.add.text(game.world.centerX, game.world.centerY, "Enemy Health:" + game.enemy_health, {
		font: "30px Arial",
		fill: "#000000",
		align: "center"
	});

	game.enemy_health_text.anchor.setTo(0.5, 0.5);
	game.enemy_health_text.anchor.setTo(0.5, 0.5);
	game.enemy_health_text.x = 600;
	game.enemy_health_text.y = 300;
	
	game.save_button = game.game.add.button(690, 10, 'SaveButton', game.clickSave, game, 0, 0, 0, 0);
}

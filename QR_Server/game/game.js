var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'cryptomon-stage', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlasJSONHash('player', 'game/assets/sprites/player.png','game/assets/sprites/player.json');
    game.load.spritesheet('cryptomons', 'game/assets/sprites/cryptomons.png', 27, 31,32);
}

var sprite;
var cryptomons;
var cursors;
var lastDirection;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    //  This will check Group vs. Group collision

    cryptomons = game.add.group();
    cryptomons.enableBody = true;
    cryptomons.physicsBodyType = Phaser.Physics.ARCADE;

    var onscreenObjects = game.rnd.integerInRange(0,5);
    for (var i = 0; i < onscreenObjects; i++)
    {
        var c = cryptomons.create(game.world.randomX, Math.random() * 500, 'cryptomons', game.rnd.integerInRange(0, 5));
        c.name = 'veg' + i; //TODO:Change to contract address
        c.body.immovable = true; //TODO:false??
    }

    sprite = game.add.sprite(400, 550, 'player');
    sprite.animations.add('leftrun',[8,9,10,11,12,13,14,15]);
    sprite.animations.add('rightrun',[16,17,18,19,20,21]);
    sprite.animations.add('downrun',[1,2,3,4,5,6,7]);
    sprite.animations.add('uprun',[26,27,28,29,30,31,32]);
    sprite.animations.add('left',[22]);
    sprite.animations.add('right',[23]);
    sprite.animations.add('down',[24]);
    sprite.animations.add('up',[25]);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
	
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

}

function update() {

    //  As we don't need to exchange any velocities or motion we can the 'overlap' check instead of 'collide'
    game.physics.arcade.overlap(cryptomons, sprite, collisionHandler, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -100;
	sprite.animations.play('leftrun',10,true);
	lastDirection = 1;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 100;
	sprite.animations.play('rightrun',10,true);
	lastDirection = 2;
    }
    else if (cursors.up.isDown){
        sprite.body.velocity.y = -100;
	sprite.animations.play('uprun',10,true);
	lastDirection = 3;
    }
    else if (cursors.down.isDown){
        sprite.body.velocity.y = 100;
	sprite.animations.play('downrun',10,true);
	lastDirection = 4;
    }
    else if (cursors.left.isUp && lastDirection == 1){
	sprite.animations.play('left',10,false);
    }
    else if (cursors.right.isUp && lastDirection == 2){
	sprite.animations.play('right',10,false);
    }
    else if (cursors.up.isUp && lastDirection == 3){
	sprite.animations.play('up',10,false);
    }
    else if (cursors.down.isUp && lastDirection == 4){
	sprite.animations.play('down',10,false);
    }


}

function collisionHandler (sprite, cryptomons) {
    //Generate Battle scene

    
    console.log("COLLISION");

}

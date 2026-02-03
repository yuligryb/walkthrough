// ========================================
// GAME CONFIGURATION
// ========================================
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    backgroundColor: '#0a0a1a',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// ========================================
// GAME VARIABLES
// ========================================
let player;
let stars;
let asteroids;
let score = 0;
let scoreText;
let gameOver = false;
let gameWon = false;
let cursors;
let wasd;
let gameWidth;
let gameHeight;

// ========================================
// PRELOAD - Load Images
// ========================================
function preload() {
    // Load images from Phaser Labs CDN
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.image('ship', 'https://labs.phaser.io/assets/sprites/thrust_ship2.png');
    this.load.image('star', 'https://labs.phaser.io/assets/sprites/star.png');
    this.load.image('asteroid', 'https://labs.phaser.io/assets/sprites/purple_ball.png');
}

// ========================================
// CREATE - Setup the Game
// ========================================
function create() {
    // Get game dimensions
    gameWidth = this.scale.width;
    gameHeight = this.scale.height;
    
    // Add background
    this.add.image(gameWidth / 2, gameHeight / 2, 'sky').setDisplaySize(gameWidth, gameHeight);
    
    // Add title
    this.add.text(gameWidth / 2, 50, 'COLLECT THE STARS!', {
        fontSize: '48px',
        fill: '#fff',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 6
    }).setOrigin(0.5);
    
    // Add goal text
    this.add.text(gameWidth / 2, 110, 'Get 100 Points to Win!', {
        fontSize: '28px',
        fill: '#ffeb3b',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4
    }).setOrigin(0.5);

    // Create the player (spaceship)
    player = this.physics.add.sprite(gameWidth / 2, gameHeight - 100, 'ship');
    player.setCollideWorldBounds(true);
    player.setScale(3.5);
    player.setRotation(0); // Point upward
    
    // Score display
    scoreText = this.add.text(20, 20, 'Score: 0 / 100', {
        fontSize: '36px',
        fill: '#fff',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4
    });
    
    // Instructions
    this.add.text(gameWidth / 2, gameHeight - 40, 'Arrow Keys or WASD to Move', {
        fontSize: '24px',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 3
    }).setOrigin(0.5);
    
    // Spawn stars every 1 second
    this.time.addEvent({
        delay: 1000,
        callback: spawnStar,
        callbackScope: this,
        loop: true
    });
    
    // Spawn asteroids more frequently
    this.time.addEvent({
        delay: 800,
        callback: spawnAsteroid,
        callbackScope: this,
        loop: true
    });
}

// ========================================
// SPAWN STAR
// ========================================
function spawnStar() {
    if (gameOver || gameWon) return;
    
    let x = Phaser.Math.Between(80, gameWidth - 80);
    let star = stars.create(x, 0, 'star');
    star.setScale(0.8);
    star.setVelocityY(280);
}

// ========================================
// SPAWN ASTEROID
// ========================================
function spawnAsteroid() {
    if (gameOver || gameWon) return;
    
    let x = Phaser.Math.Between(80, gameWidth - 80);
    let asteroid = asteroids.create(x, 0, 'asteroid');
    asteroid.setScale(1.2);
    asteroid.setVelocityY(220 + score * 2);
    
    // Make asteroids spin
    asteroid.setAngularVelocity(100);
}


// ========================================
// UPDATE - Runs Every Frame
// ========================================
function update() {
    if (gameOver || gameWon) return;
    
    // Move player left
    if (cursors.left.isDown || wasd.left.isDown) {
        player.setVelocityX(-350);
    }
    // Move player right
    else if (cursors.right.isDown || wasd.right.isDown) {
        player.setVelocityX(350);
    }
    // Stop moving
    else {
        player.setVelocityX(0);
    }
    // Clean up stars that fall off screen
    stars.children.entries.forEach(star => {
        if (star.y > gameHeight + 20) star.destroy();
    });
    
    // Clean up asteroids that fall off screen
    asteroids.children.entries.forEach(asteroid => {
        if (asteroid.y > gameHeight + 20) asteroid.destroy();
    });
}

// ========================================
// START THE GAME
// ========================================
const game = new Phaser.Game(config);

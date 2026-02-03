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
}

// ========================================
// UPDATE - Runs Every Frame
// ========================================
function update() {
    // We'll add movement here in Step 3!
}

// ========================================
// START THE GAME
// ========================================
const game = new Phaser.Game(config);

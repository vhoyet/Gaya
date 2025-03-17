import game_scene from "./controllers/gameController.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,  
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: [game_scene], 
};

const game = new Phaser.Game(config);

import game_scene from "./controllers/gameController.js";

const config = {
  type: Phaser.AUTO,
  width: 2000,
  height: 1600,
  pixelArt: true,  
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: [game_scene], 
};

const game = new Phaser.Game(config);

import PlayerModel from "../models/playerModel.js";
import PlayerView from "../views/playerView.js";
import EnemyModel from "../models/enemyModel.js";
import EnemyView from "../views/enemyView.js";
import HealthView from "../views/healthView.js";
import EnemyCcontroller from "./enemyController.js";
import PlayerController from "./playerController.js";

export default class GameController extends Phaser.Scene {
  constructor() {
    super("GameController");
  }

  preload() {
    this.load.spritesheet("player", "assets/player/player.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    
    this.load.spritesheet("player_attack_up", "assets/player/player_attack_up.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("player_attack_right", "assets/player/player_attack_right.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("player_attack_left", "assets/player/player_attack_left.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("player_attack_down", "assets/player/player_attack_down.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("orc", "assets/enemies/orc.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("orc_attack_up", "assets/enemies/orc_attack_up.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("orc_attack_right", "assets/enemies/orc_attack_right.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("orc_attack_left", "assets/enemies/orc_attack_left.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("orc_attack_down", "assets/enemies/orc_attack_down.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    // Create Player (MVC Pattern)
    this.playerModel = new PlayerModel(300, 300);
    this.playerView = new PlayerView(this, this.playerModel);
    this.playerController = new PlayerController(this, this.playerModel);
    this.playerHealthView = new HealthView(this, this.playerModel.health, "player");

    // Create Enemy (MVC Pattern)
    this.enemyModel = new EnemyModel(600, 600);
    this.enemyView = new EnemyView(this, this.enemyModel);
    this.enemyModel.setPlayer(this.playerModel); // Set player reference in the model
    this.enemyController = new EnemyCcontroller(this, this.enemyModel);
  }

  update(time, delta) {
    if (this.playerModel.canAttack(this.enemyModel, time)) {
      this.playerModel.attack(this.enemyModel, time);
    }
  
    if (this.enemyModel.canAttack(this.playerModel, time)) {
      this.enemyModel.attack(this.playerModel, time);
    }

    this.playerController.update(); // Moves the player
    this.enemyController.update(delta, time);  // Updates enemy movement
  }
}

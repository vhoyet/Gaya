import PlayerModel from "../models/playerModel.js";
import EnemyModel from "../models/enemyModel.js";
import InventoryModel from "../models/inventoryModel.js";
import EnemyView from "../views/enemyView.js";
import PlayerView from "../views/playerView.js";
import HealthView from "../views/healthView.js";
import InventoryView from "../views/inventoryView.js"
import EnemyController from "./enemyController.js";
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

     // Charge la carte JSON
    this.load.image('water', 'assets/landscape/water.png');
    this.load.image('sand', 'assets/landscape/sand.png');
    this.load.image('grass', 'assets/landscape/grass.png');
    this.load.image('big_house', 'assets/landscape/big_house.png');
    this.load.image('small_house', 'assets/landscape/small_house.png');
    this.load.image('townhall', 'assets/landscape/townhall.png');
    this.load.image('tree', 'assets/landscape/tree.png');
    this.load.tilemapTiledJSON('map', 'maps/carte1.json');    
  }

  create() {
    // Create Player (MVC Pattern)
    var map = this.make.tilemap({ key: 'map' }); // Charge la carte
    var sand = map.addTilesetImage('sand', 'sand'); // Associe le tileset
    var grass = map.addTilesetImage('grass', 'grass'); // Associe le tileset
    var water = map.addTilesetImage('water', 'water'); // Associe le tileset
    var tilesLayer = map.createLayer('tiles', [sand, grass, water], 0, 0); // Crée le calque
    tilesLayer.setScale(1); // Ajuste si besoin

    var tree = map.addTilesetImage('tree', 'tree'); // Associe le tileset
    var big_house = map.addTilesetImage('big_house', 'big_house'); // Associe le tileset
    var small_house = map.addTilesetImage('small_house', 'small_house'); // Associe le tileset
    var townhall = map.addTilesetImage('townhall', 'townhall'); // Associe le tileset
    //var landscapeLayer = map.createLayer('landscape', [tree, big_house, small_house, townhall], 0, 0); // Crée le calque

    const landscapeLayer = map.getObjectLayer("landscape");
    landscapeLayer.objects.forEach(obj => {
      console.log(obj)
      let sprite = this.add.sprite(obj.x, obj.y, obj.name);
      
      // Adjust origin if needed (Tiled uses bottom-left, Phaser uses top-left by default)
      sprite.setOrigin(0, 1); 
  
      // Optional: Enable physics if needed
      this.physics.add.existing(sprite);
    });
    //landscapeLayer.setScale(1); // Ajuste si besoin

    this.inventoryModel = new InventoryModel();
    this.inventoryView = new InventoryView(this, this.inventoryModel);

    this.playerModel = new PlayerModel(500, 500, this.inventoryModel);
    this.playerView = new PlayerView(this, this.playerModel);
    this.playerController = new PlayerController(this, this.playerModel);
    this.playerHealthView = new HealthView(this, this.playerModel.health, "player");

    // Create Enemy (MVC Pattern)
    this.enemyModel = new EnemyModel(1000, 600);
    this.enemyView = new EnemyView(this, this.enemyModel);
    this.enemyModel.setPlayer(this.playerModel); // Set player reference in the model
    this.enemyController = new EnemyController(this, this.enemyModel);

    this.cameras.main.startFollow(this.playerView.sprite, true);
    this.cameras.main.setBounds(0, 0, 4000, 4000); // Adjust based on your map size
    this.physics.world.setBounds(0, 0, 4000, 4000);

    var objectsLayer = map.getObjectLayer('collision'); // Remplacer par le nom de ton calque d'objets
    var collisionRects = this.physics.add.staticGroup();
    objectsLayer.objects.forEach(obj => {
        if (obj.properties && obj.properties[0].value) {  // Si l'objet a la propriété 'collides' à 'true'
          // Créer un rectangle en utilisant la position et la taille de l'objet
          let rect = this.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height);
          this.physics.add.existing(rect, true); // Convert the rectangle into a static physics body
          collisionRects.add(rect);
        }
    });

    console.log(collisionRects)
    this.physics.add.collider(this.playerView.sprite, collisionRects);
    this.physics.add.collider(this.playerView.sprite, collisionRects, () => {
      console.log("Collision detected!");
  });
    var graphics = this.physics.world.createDebugGraphic();
    this.physics.world.drawDebug = true;
    this.physics.world.debugGraphic = graphics;
  }

  update(time, delta) {
    this.playerController.update(time, delta); // Moves the player
    this.enemyController.update(time, delta);  // Updates enemy movement
  }
}

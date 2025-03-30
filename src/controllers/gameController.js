import PlayerModel from "../models/playerModel.js";
import EnemyModel from "../models/enemyModel.js";
import InventoryModel from "../models/inventoryModel.js";
import InteractiveLandscapeModel from "../models/interactiveLandscapeModel.js";
import NpcModel from "../models/npcModel.js";
import MinimapModel from "../models/minimapModel.js";

import EnemyView from "../views/enemyView.js";
import PlayerView from "../views/playerView.js";
import HealthView from "../views/healthView.js";
import InteractiveLandscapeView from "../views/interactiveLandscapeView.js";
import NpcView from "../views/npcView.js";
import MinimapView from "../views/minimapView.js";
import InventoryView from "../views/inventoryView.js"
import QuestView from "../views/questView.js";

import EnemyController from "./enemyController.js";
import PlayerController from "./playerController.js";
import NpcController from "./npcControllers.js";
import QuestsController from "./questController.js";


export default class GameController extends Phaser.Scene {
  constructor() {
    super("GameController");
  }

  preload() {
    this.load.spritesheet('joanna', 'assets/npc/joanna.png', { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet("blacksmith", "assets/npc/blacksmith.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("mayor", "assets/npc/mayor.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

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
    this.load.image('small_tree', 'assets/landscape/small_tree.png');
    this.load.image('iron_ore', 'assets/landscape/iron_ore.png');

    this.load.tilemapTiledJSON('map', 'maps/carte1.json');    
    
  }

  create() {
    // Create Player (MVC Pattern)
    var map = this.make.tilemap({ key: 'map' }); // Charge la carte
    this.map = map;
    var sand = map.addTilesetImage('sand', 'sand'); // Associe le tileset
    var grass = map.addTilesetImage('grass', 'grass'); // Associe le tileset
    var water = map.addTilesetImage('water', 'water'); // Associe le tileset    
    var tilesLayer = map.createLayer('tiles', [sand, grass, water], 0, 0); // Crée le calque
    this.tilesLayer = tilesLayer;
    tilesLayer.setScale(1); // Ajuste si besoin

    var tree = map.addTilesetImage('tree', 'tree'); // Associe le tileset
    var small_tree = map.addTilesetImage('small_tree', 'small_tree'); // Associe le tileset
    var small_tree = map.addTilesetImage('iron_ore', 'iron_ore'); // Associe le tileset
    var big_house = map.addTilesetImage('big_house', 'big_house'); // Associe le tileset
    var small_house = map.addTilesetImage('small_house', 'small_house'); // Associe le tileset
    var townhall = map.addTilesetImage('townhall', 'townhall'); // Associe le tileset
    //var landscapeLayer = map.createLayer('landscape', [tree, big_house, small_house, townhall], 0, 0); // Crée le calque


    // Create NPC
    const npcModel = new NpcModel('joanna', 400, 500, [{ text: "Hello, traveler! What do you seek?", choices: ["Level up", "View stats", "Exit"] }]);
    this.npcView = new NpcView(this, npcModel, 0);
    this.npcController = new NpcController(this, npcModel )
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    const npcModel2 = new NpcModel('blacksmith', 896, 384, [{text: 'Hello!', choices: []}, {text:'Nice day, huh?', choices: []}]);
    this.npcView2 = new NpcView(this, npcModel2, 130);
    this.npcController2 = new NpcController(this, npcModel2)
    this.spaceKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    const npcModel3 = new NpcModel('mayor', 1184, 640, [{text: 'Hello, traveler ! We have been invaded !\nCould you help us kill some orcs to make us safe ?', choices: ["Yes", "Exit"]}, {text:'Nice day, huh?', choices: []}]);
    this.npcView3 = new NpcView(this, npcModel3, 130);
    this.npcController3 = new NpcController(this, npcModel3)
    this.spaceKey3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.npcModels = [npcModel, npcModel2, npcModel3];


    this.inventoryModel = new InventoryModel();
    this.inventoryView = new InventoryView(this, this.inventoryModel);

    this.players = [];
    this.playerModel = new PlayerModel(400, 600, this.inventoryModel);
    this.playerView = new PlayerView(this, this.playerModel);
    this.playerController = new PlayerController(this, this.playerModel);
    this.playerHealthView = new HealthView(this, this.playerModel.health, "player");
    this.players.push(this.playerController);

    // Create Enemy (MVC Pattern)
    this.enemies = this.physics.add.group();
    this.enemyModel = new EnemyModel(1800, 600);
    this.enemyView = new EnemyView(this, this.enemyModel);
    this.enemyModel.setPlayer(this.playerModel); // Set player reference in the model
    this.enemyController = new EnemyController(this, this.enemyModel);

    this.enemyModel2 = new EnemyModel(1800, 600);
    this.enemyView2 = new EnemyView(this, this.enemyModel2);
    this.enemyModel2.setPlayer(this.playerModel); // Set player reference in the model
    this.enemyController2 = new EnemyController(this, this.enemyModel2);

    this.enemyModel3 = new EnemyModel(1800, 600);
    this.enemyView3 = new EnemyView(this, this.enemyModel3);
    this.enemyModel3.setPlayer(this.playerModel); // Set player reference in the model
    this.enemyController3 = new EnemyController(this, this.enemyModel3);

    this.enemies.add(this.enemyView3)
    this.enemies.add(this.enemyView2)
    this.enemies.add(this.enemyView)

    this.cameras.main.startFollow(this.playerView, true);
    this.cameras.main.setBounds(0, 0, 4000, 4000); // Adjust based on your map size
    this.physics.world.setBounds(0, 0, 4000, 4000);

    const landscapeLayer = map.getObjectLayer("landscape");
    landscapeLayer.objects.forEach(obj => {
      let sprite = this.add.sprite(obj.x, obj.y, obj.name);
      sprite.setOrigin(0, 1); 
      this.physics.add.existing(sprite);
    });

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

    this.physics.add.collider(this.playerView, collisionRects);

    this.interactive_objects = this.physics.add.group();
    const objectLayer = map.getObjectLayer("interactive_landscape");
    objectLayer.objects.forEach(obj => {
      const interactive_model = new InteractiveLandscapeModel(obj.x, obj.y, obj.name)
      const interactive_view = new InteractiveLandscapeView(this, interactive_model, obj.name);
      this.interactive_objects.add(interactive_view);
    });

    this.minimapModel = new MinimapModel(this.cameras.main, this.map, this.tilesLayer);
    this.minimapView = new MinimapView(this, this.minimapModel);

    this.questsController = new QuestsController(this);
    this.questView = new QuestView(this, this.questsController);
  }

  update(time, delta) {
    this.playerController.update(time, delta); // Moves the player
    this.enemyController.update(time, delta);  // Updates enemy movement
    this.enemyController2.update(time, delta);
    this.enemyController3.update(time, delta);
    this.npcController.update(time, delta);
    this.npcController2.update(time, delta);
    this.npcController3.update(time, delta);

    this.minimapView.updateMinimap()
    this.questView.update()
  }

  // Per level :
      // Choose a stat point
      // STR, DEX, END, INT ?

  // 1 archetype : 1 special stat
      // Berserk : 1% omnivamp
        // 1 % atq per 5% missing hp -- unic class tree
      // Slayer : 1% auto efficiency
        // 1% crit chance -- 1% atq speed
      // Soldier : 1% hit point
        // Fortress: 1% block chance -- Paladin : 1% protection
      // Bard : 1% spell efficiency
        // 1% mana recovery -- 

  // Then choose a class
      // unlock the class tree :
      // stat1 -- stat2 -- stat3
      // stat1 -- stat2 -- stat3
      // stat1 -- stat2 -- stat3
      // stat1 -- stat2 -- stat3
      // spell1 -- spell2 -- spell3

}



export default class PlayerView {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;

    // Create the player sprite
    this.sprite = scene.physics.add.sprite(this.model.x, this.model.x, "player");
    this.model.setView(this);
    this.sprite.setCollideWorldBounds(true);

    // Define animations
    this.scene.anims.create({
      key: "player-walk-down",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 260, end: 268 }), // Adjust for your sprite
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-walk-left",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 234, end: 242 }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-walk-right",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 286, end: 294 }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-walk-up",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 208, end: 216 }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-idle-down",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 260, end: 260 }), // Adjust for your sprite
      frameRate: 8,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "player-idle-left",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 234, end: 234 }),
      frameRate: 8,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "player-idle-right",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 286, end: 286 }),
      frameRate: 8,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "player-idle-up",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 208, end: 208 }),
      frameRate: 8,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "player-attack-up",
      frames: [
        { key: "player_attack_up", frame: 0 },
        { key: "player_attack_up", frame: 2 },
        { key: "player_attack_up", frame: 4 },
        { key: "player_attack_up", frame: 6 },
        { key: "player_attack_up", frame: 8 },
        { key: "player_attack_up", frame: 10 }
      ],
      frameRate: 12,
      repeat: 0,
    })

    this.scene.anims.create({
      key: "player-attack-down",
      frames: [
        { key: "player_attack_down", frame: 0 },
        { key: "player_attack_down", frame: 2 },
        { key: "player_attack_down", frame: 4 },
        { key: "player_attack_down", frame: 6 },
        { key: "player_attack_down", frame: 8 },
        { key: "player_attack_down", frame: 10 }
      ],
      frameRate: 12,
      repeat: 0,
    })

    this.scene.anims.create({
      key: "player-attack-right",
      frames: [
        { key: "player_attack_right", frame: 0 },
        { key: "player_attack_right", frame: 2 },
        { key: "player_attack_right", frame: 4 },
        { key: "player_attack_right", frame: 6 },
        { key: "player_attack_right", frame: 8 },
        { key: "player_attack_right", frame: 10 }
      ],
      frameRate: 12,
      repeat: 0,
    })

    this.scene.anims.create({
      key: "player-attack-left",
      frames: [
        { key: "player_attack_left", frame: 0 },
        { key: "player_attack_left", frame: 2 },
        { key: "player_attack_left", frame: 4 },
        { key: "player_attack_left", frame: 6 },
        { key: "player_attack_left", frame: 8 },
        { key: "player_attack_left", frame: 10 }
      ],
      frameRate: 12,
      repeat: 0,
    })
  }

  updatePosition() {
    this.sprite.setX(this.model.x);
    this.sprite.setY(this.model.y);
  }

  playMoveAnimation(direction) {
    if (this.sprite.anims.currentAnim?.key !== `walk-${direction}`) {
      this.sprite.play(`player-walk-${direction}`, true);
    }
  }

  playIdleAnimation(direction) {
    this.sprite.play(`player-idle-${direction}`, true);
  }

  playAttackAnimation(direction) {
    this.sprite.play(`player-attack-${direction}`, true);
    this.sprite.once("animationcomplete", (animation) => {
      this.playIdleAnimation(direction)
  });
  }
}
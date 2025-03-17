export default class PlayerView {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;
    this.model.setView(this);

    // ✅ Create the player sprite with physics
    this.sprite = scene.physics.add.sprite(this.model.x, this.model.y, "player");
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setImmovable(false);
    this.sprite.body.setVelocity(0, 0); // Start stationary

    // ✅ Define all animations (kept from your original)
    this.createAnimations();
  }

  createAnimations() {
    const anims = this.scene.anims;

    anims.create({
      key: "player-walk-down",
      frames: anims.generateFrameNumbers("player", { start: 260, end: 268 }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "player-walk-left",
      frames: anims.generateFrameNumbers("player", { start: 234, end: 242 }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "player-walk-right",
      frames: anims.generateFrameNumbers("player", { start: 286, end: 294 }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "player-walk-up",
      frames: anims.generateFrameNumbers("player", { start: 208, end: 216 }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "player-idle-down",
      frames: anims.generateFrameNumbers("player", { start: 260, end: 260 }),
      frameRate: 8,
      repeat: 0,
    });

    anims.create({
      key: "player-idle-left",
      frames: anims.generateFrameNumbers("player", { start: 234, end: 234 }),
      frameRate: 8,
      repeat: 0,
    });

    anims.create({
      key: "player-idle-right",
      frames: anims.generateFrameNumbers("player", { start: 286, end: 286 }),
      frameRate: 8,
      repeat: 0,
    });

    anims.create({
      key: "player-idle-up",
      frames: anims.generateFrameNumbers("player", { start: 208, end: 208 }),
      frameRate: 8,
      repeat: 0,
    });

    // ✅ Attack animations (kept from your original)
    anims.create({
      key: "player-attack-up",
      frames: this.scene.anims.generateFrameNumbers("player_attack_up", { frames: [0, 2, 4, 6, 8, 10] }),
      frameRate: 12,
      repeat: 0,
    });

    anims.create({
      key: "player-attack-down",
      frames: this.scene.anims.generateFrameNumbers("player_attack_down", { frames: [0, 2, 4, 6, 8, 10] }),
      frameRate: 12,
      repeat: 0,
    });

    anims.create({
      key: "player-attack-right",
      frames: this.scene.anims.generateFrameNumbers("player_attack_right", { frames: [0, 2, 4, 6, 8, 10] }),
      frameRate: 12,
      repeat: 0,
    });

    anims.create({
      key: "player-attack-left",
      frames: this.scene.anims.generateFrameNumbers("player_attack_left", { frames: [0, 2, 4, 6, 8, 10] }),
      frameRate: 12,
      repeat: 0,
    });
  }

  /** ✅ Proper physics-based movement */
  setVelocity(x, y) {
    this.sprite.setVelocity(x, y);
  }

  /** ✅ Ensure sprite matches model position */
  updatePosition() {
    this.sprite.setX(this.model.x);
    this.sprite.setY(this.model.y);
  }

  /** ✅ Play correct movement animation */
  playMoveAnimation(direction) {
    if (this.sprite.anims.currentAnim?.key !== `player-walk-${direction}`) {
      this.sprite.play(`player-walk-${direction}`, true);
    }
  }

  /** ✅ Play correct idle animation */
  playIdleAnimation(direction) {
    this.sprite.play(`player-idle-${direction}`, true);
  }

  /** ✅ Attack animation handling */
  playAttackAnimation(direction) {
    this.sprite.play(`player-attack-${direction}`, true);
    this.sprite.once("animationcomplete", () => {
      this.playIdleAnimation(direction);
    });
  }
}

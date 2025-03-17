import HealthView from "./healthView.js";

export default class EnemyView {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;
    this.sprite = scene.physics.add.sprite(this.model.x, this.model.y, "orc");
    this.healthView = new HealthView(scene, this.model.health, "entity");
    this.model.setView(this);
    this.sprite.setCollideWorldBounds(true);

        this.scene.anims.create({
          key: "orc-walk-up",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 104, end: 112 }),
          frameRate: 8,
          repeat: -1,
        });

        this.scene.anims.create({
          key: "orc-walk-left",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 117, end: 125 }),
          frameRate: 8,
          repeat: -1,
        });

        this.scene.anims.create({
          key: "orc-walk-down",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 130, end: 138 }), // Adjust for your sprite
          frameRate: 8,
          repeat: -1,
        });
    
        this.scene.anims.create({
          key: "orc-walk-right",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 143, end: 151 }),
          frameRate: 8,
          repeat: -1,
        });

        this.scene.anims.create({
          key: "orc-idle-up",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 104, end: 104 }),
          frameRate: 8,
          repeat: -1,
        });

        this.scene.anims.create({
          key: "orc-idle-left",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 117, end: 117 }),
          frameRate: 8,
          repeat: -1,
        });

        this.scene.anims.create({
          key: "orc-idle-down",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 130, end: 130 }), // Adjust for your sprite
          frameRate: 8,
          repeat: -1,
        });
    
        this.scene.anims.create({
          key: "orc-idle-right",
          frames: this.scene.anims.generateFrameNumbers("orc", { start: 143, end: 143 }),
          frameRate: 8,
          repeat: -1,
        });

        this.scene.anims.create({
          key: "orc-attack-up",
          frames: [
            { key: "orc_attack_up", frame: 1 },
            { key: "orc_attack_up", frame: 3 },
            { key: "orc_attack_up", frame: 5 },
            { key: "orc_attack_up", frame: 7 },
            { key: "orc_attack_up", frame: 9 },
            { key: "orc_attack_up", frame: 11 }
          ],
          frameRate: 8,
          repeat: 0,
        })

        this.scene.anims.create({
          key: "orc-attack-down",
          frames: [
            { key: "orc_attack_down", frame: 1 },
            { key: "orc_attack_down", frame: 3 },
            { key: "orc_attack_down", frame: 5 },
            { key: "orc_attack_down", frame: 7 },
            { key: "orc_attack_down", frame: 9 },
            { key: "orc_attack_down", frame: 11 }
          ],
          frameRate: 8,
          repeat: 0,
        })

        this.scene.anims.create({
          key: "orc-attack-right",
          frames: [
            { key: "orc_attack_right", frame: 1 },
            { key: "orc_attack_right", frame: 3 },
            { key: "orc_attack_right", frame: 5 },
            { key: "orc_attack_right", frame: 7 },
            { key: "orc_attack_right", frame: 9 },
            { key: "orc_attack_right", frame: 11 }
          ],
          frameRate: 8,
          repeat: 0,
        })

        this.scene.anims.create({
          key: "orc-attack-left",
          frames: [
            { key: "orc_attack_left", frame: 1 },
            { key: "orc_attack_left", frame: 3 },
            { key: "orc_attack_left", frame: 5 },
            { key: "orc_attack_left", frame: 7 },
            { key: "orc_attack_left", frame: 9 },
            { key: "orc_attack_left", frame: 11 }
          ],
          frameRate: 8,
          repeat: 0,
        })

  }

  startMoving(direction) {
    this.sprite.play(`orc-walk-${direction}`, true);
  }

  playIdleAnimation(direction) {
    this.sprite.play(`orc-idle-${direction}`, true);
  }

  playAttackAnimation(direction) {
    this.sprite.play(`orc-attack-${direction}`, true);
  }

  playDeathAnimation() {
    return;
}

  hide() {
      this.sprite.setVisible(false); // Hide sprite
  }

  show() {
      this.sprite.setVisible(true); // Show sprite
  }

  stopMoving() {
    this.sprite.stop();
  }

  updatePosition() {
    this.sprite.setPosition(this.model.x, this.model.y);
    this.healthView.updatePosition(this.model.x, this.model.y);
  }
}

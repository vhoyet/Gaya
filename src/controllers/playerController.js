export default class PlayerController {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;
    this.collision = false;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update(delta, time) {
    if (this.scene.dialogOpen || this.scene.menuOpen) {
      this.model.stopMoving();
      return; // 🚫 Stop movement when dialogue is active
    }
    
    if (this.collision) {
      this.collision = false;
      return;
    }

    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX = -this.model.speed;
      this.model.setDirection("left");
    } else if (this.cursors.right.isDown) {
      velocityX = this.model.speed;
      this.model.setDirection("right");
    }

    if (this.cursors.up.isDown) {
      velocityY = -this.model.speed;
      this.model.setDirection("up");
    } else if (this.cursors.down.isDown) {
      velocityY = this.model.speed;
      this.model.setDirection("down");
    }

    if (velocityX !== 0 || velocityY !== 0) {
      this.model.startMoving(velocityX, velocityY);
    } else {
      this.model.stopMoving();
    }
    this.tryAutoAttack(delta);
  }

  /** ✅ New function to automatically attack when an enemy is nearby */
  tryAutoAttack(delta) {
    let target = this.findClosestTarget();
    if (target)
      this.model.attack(target.model, delta);
  }

  findClosestTarget() {
    const enemies = this.scene.enemies.getChildren(); // Get all enemies
    const interactive_objects = this.scene.interactive_objects.getChildren(); // Get all trees

    let closestTarget = null;
    let closestDistance = Infinity;

    [...enemies, ...interactive_objects].forEach(target => {
        if (!target.model.isDead) {
            const distance = Phaser.Math.Distance.Between(this.model.x, this.model.y, target.model.x, target.model.y);
            if (distance < closestDistance && distance <= this.model.attackRange) {
                closestTarget = target;
                closestDistance = distance;
            }
        }
    });

    return closestTarget;
}
}

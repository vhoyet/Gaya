export default class PlayerController {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;
    this.collision = false;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update(delta, time) {
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
    const target = this.scene.enemyModel;  // Assuming you have a reference to an enemy model

    this.model.attack(target, delta);
  }
}

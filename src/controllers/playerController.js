export default class PlayerController {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;

    // Capture keyboard input
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    let moving = false;

    if (this.cursors.left.isDown) {
      this.model.move("left");
      moving = true;
    } else if (this.cursors.right.isDown) {
      this.model.move("right");
      moving = true;
    }
    if (this.cursors.up.isDown) {
      this.model.move("up");
      moving = true;
    } else if (this.cursors.down.isDown) {
      this.model.move("down");
      moving = true;
    }

    if (!moving) {
      this.model.stopMoving();
    }
  }
}

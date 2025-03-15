export default class enemy_controller {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;
  }

  moveToNewPosition() {
    if (!this.model.moving) {
      let newPos = this.model.getRandomPosition();
      this.model.moveTo(newPos.x, newPos.y);
    }
  } 

  update(deltaTime, currentTime) {
    this.model.update(deltaTime, currentTime);
  }
}
  
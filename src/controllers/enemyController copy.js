export default class EnemyController {
  constructor(scene, model) {
    this.scene = scene;
    this.model = model;
  }

  update(time, delta) {
    this.model.update(time, delta);
  }
}
  
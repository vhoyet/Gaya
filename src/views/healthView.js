export default class HealthView {
  constructor(scene, model, type = "entity") {
    this.scene = scene;
    this.model = model;
    this.model.setView(this);

    
    this.type = type; // "player" or "entity"

    if (this.type === "player") {
      // Player health bar (top-left corner)
      this.barWidth = 150;
      this.barHeight = 7;
      this.x = 20;
      this.y = 20;
      this.borderRadius = 3;
    } else {
      // Entity health bar (positioned below entity)
      this.barWidth = 40;
      this.barHeight = 3;
      this.x = this.model.owner.x - 50;
      this.y = this.model.owner.y + 40; // Slightly below sprite
      this.borderRadius = 1;
    } 

    // Create a graphics object for the health bar
    this.graphics = this.scene.add.graphics();

    // Initial draw
    this.drawHealthBar(1);
  }

  drawHealthBar(healthRatio) {
    this.graphics.clear();

    // Background bar (gray)
    this.graphics.fillStyle(0x555555, 1);
    this.graphics.fillRoundedRect(this.x, this.y, this.barWidth, this.barHeight, this.borderRadius);

    // Health bar (dynamic color)
    let color = healthRatio > 0.5 ? 0x00ff00 : healthRatio > 0.2 ? 0xffa500 : 0xff0000;
    this.graphics.fillStyle(color, 1);
    this.graphics.fillRoundedRect(this.x, this.y, this.barWidth * healthRatio, this.barHeight, this.borderRadius);
  }

  updateHealth(current, max) {
    const healthRatio = current / max;
    this.drawHealthBar(healthRatio);
  }

  updatePosition(x, y) {
    if (this.type === "entity") {
      this.x = x - this.barWidth / 2; // Centered below entity
      this.y = y + 40;
    }
    this.drawHealthBar(this.model.currentHealth / this.model.maxHealth);
  }
}

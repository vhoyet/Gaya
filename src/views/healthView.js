export default class HealthView {
  constructor(scene, model, type = "entity") {
    this.scene = scene;
    this.model = model;
    this.model.setView(this);
    this.type = type; // "player" or "entity"

    if (this.type === "player") {
      // ✅ Fixed UI-based Health Bar for Player
      this.barWidth = 150;
      this.barHeight = 7;
      this.x = 20;
      this.y = 20;
      this.borderRadius = 3;

      // Create a separate fixed graphics object for the player
      this.healthBar = this.scene.add.graphics();
      this.drawFixedHealthBar(1); // Initial draw

      this.healthText = this.scene.add.text(
        this.x + this.barWidth / 2,  // Center the text
        this.y + 15,                 // Slightly below the health bar
        `${this.model.currentHealth} / ${this.model.maxHealth} PV`,
        {
          fontSize: "12px",
          fontFamily: "Arial",
          color: "#ffffff",
          align: "center",
        }
      ).setOrigin(0.5);  // Center the text

      // ✅ Make sure the player's health bar stays in place
      this.healthBar.setScrollFactor(0);
      this.healthText.setScrollFactor(0);
    } else {
      // ✅ Entity health bars (move with camera)
      this.barWidth = 40;
      this.barHeight = 3;
      this.x = this.model.owner.x - 20;
      this.y = this.model.owner.y + 40; // Slightly below sprite
      this.borderRadius = 1;

      // Create world-space graphics for entity
      this.graphics = this.scene.add.graphics();
      this.drawEntityHealthBar(1);
    }
  }

  /** ✅ Draws the player's fixed health bar */
  drawFixedHealthBar(healthRatio) {
    this.healthBar.clear();
    this.healthBar.fillStyle(0x555555, 1); // Background (gray)
    this.healthBar.fillRoundedRect(this.x, this.y, this.barWidth, this.barHeight, this.borderRadius);

    let color = healthRatio > 0.5 ? 0x00ff00 : healthRatio > 0.2 ? 0xffa500 : 0xff0000;
    this.healthBar.fillStyle(color, 1);
    this.healthBar.fillRoundedRect(this.x, this.y, this.barWidth * healthRatio, this.barHeight, this.borderRadius);
  }

  /** ✅ Draws health bar for world-space entities */
  drawEntityHealthBar(healthRatio) {
    this.graphics.clear();
    this.graphics.fillStyle(0x555555, 1); // Background (gray)
    this.graphics.fillRoundedRect(this.x, this.y, this.barWidth, this.barHeight, this.borderRadius);

    let color = healthRatio > 0.5 ? 0x00ff00 : healthRatio > 0.2 ? 0xffa500 : 0xff0000;
    this.graphics.fillStyle(color, 1);
    this.graphics.fillRoundedRect(this.x, this.y, this.barWidth * healthRatio, this.barHeight, this.borderRadius);
  }

  /** ✅ Updates health bar (separates player and entity cases) */
  updateHealth(current, max) {
    const healthRatio = current / max;
    if (this.type === "player") {
      this.drawFixedHealthBar(healthRatio);
      this.healthText.setText(`${current} / ${max} PV`);
    } else {
      this.drawEntityHealthBar(healthRatio);
    }
  }

  /** ✅ Only updates position for entities (not the player UI) */
  updatePosition(x, y) {
    if (this.type === "entity") {
      this.x = x - this.barWidth / 2; // Centered below entity
      this.y = y + 40;
      this.drawEntityHealthBar(this.model.currentHealth / this.model.maxHealth);
    }
  }

  hide() {
    if (this.type === "player") {
      this.healthBar.setVisible(false);
      this.healthText.setVisible(false);
    } else {
      this.graphics.setVisible(false);
    }
  }

  show() {
    if (this.type === "player") {
      this.healthBar.setVisible(true);
      this.healthText.setVisible(true);
    } else {
      this.graphics.setVisible(true);
    }
  }
}

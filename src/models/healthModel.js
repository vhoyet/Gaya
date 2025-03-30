export default class HealthModel {
    constructor(owner, maxHealth) {
      this.owner = owner; // Reference to the entity (PlayerModel, EnemyModel)
      this.maxHealth = maxHealth;
      this.currentHealth = maxHealth;
      this.view = null;
    }
  
    setView(view) {
      this.view = view;
    }
  
    takeDamage(amount) {
      this.currentHealth = Math.max(0, this.currentHealth - amount);
      if (this.view) this.view.updateHealth(this.currentHealth, this.maxHealth);
    }
  
    heal(amount) {
      this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
      if (this.view) this.view.updateHealth(this.currentHealth, this.maxHealth);
    }

    updateHealth(maxHealth) {
      this.maxHealth = maxHealth;
      this.currentHealth = maxHealth;
      if (this.view) this.view.updateHealth(this.currentHealth, this.maxHealth);
    }
  }
  
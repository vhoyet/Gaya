import HealthModel from "./healthModel.js";

export default class PlayerModel {
  constructor(x, y, inventory) {
    this.name = 'Guairden';
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.level = 1;
    this.stats = {Power: 0, Stamina: 0, Will: 0}
    this.speed = 160;
    this.direction = "down"; 
    this.inventory = inventory;
    this.inventory.addItem("Soul", 150);
    this.health = new HealthModel(this, 100);
    this.baseArmor = 0;
    this.armor = 0;
    this.attackDamageBase = 10;
    this.attackDamage = 10;
    this.attackRange = 50;
    this.baseAttackCooldown = 1000;
    this.attackCooldown = 1000; // in ms
    this.lastAttackTime = 0;
    this.state = "idle";
    this.statPoints = 0;
    this.isAttacking = false;
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  startMoving(velocityX, velocityY) {
    this.state = "moving";
    this.view.setVelocity(velocityX, velocityY);
    if (!this.isAttacking) {
      this.view.playMoveAnimation(this.direction);
    }

    this.x = this.view.x
    this.y = this.view.y
  }

  stopMoving() {
    if (this.state === "moving") {
      this.state = "idle";
      this.view.setVelocity(0, 0);
      if (!this.isAttacking) {
        this.view.playIdleAnimation(this.direction);
      }
    }
  }

  updateStats() {
    this.attackDamage = 10 + this.stats["Power"] * (this.level - 1);
    let maxHealth = 100 + 5 * this.level + this.stats["Stamina"] * 10;
    this.health.updateHealth(maxHealth)
    this.armor = this.stats["Stamina"] * 5 + this.armor;
    this.attackCooldown = this.baseAttackCooldown - 50 * this.stats["Power"];
  }

  takeDamage(amount) {
    this.health.takeDamage(amount);

    if (this.health.currentHealth == 0)
      this.die()
  }

  die() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.health.heal(this.health.maxHealth)
    this.inventory.loseItems();
    this.view.updatePosition()
  }

  canAttack(target, delta) {
    if (delta - this.lastAttackTime < this.attackCooldown) return false;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    return distance <= this.attackRange;
  }
  

  attack(target, delta) {
    if (!target.isDead && this.canAttack(target, delta)) {
      target.takeDamage(this);
      this.lastAttackTime = delta;
      this.state = "attacking";
      this.isAttacking = true;

      this.view.playAttackAnimation(this.direction);
      
      this.view.once("animationcomplete", () => {
        this.isAttacking = false;
        this.stopMoving();
      });

      if (!target.isDead && target.health.currentHealth <= this.attackDamage) {
        this.inventory.addItem("Soul", target.soulsValue);
      }
    }
  }
}
